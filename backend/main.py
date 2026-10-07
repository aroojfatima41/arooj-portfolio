import asyncio
import os
import re
import smtplib
import ssl
from email.message import EmailMessage

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok"}


class ContactSubmission(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: str = Field(min_length=5, max_length=254)
    subject: str = Field(min_length=3, max_length=120)
    message: str = Field(min_length=10, max_length=5000)
    website: str = Field(default="", max_length=200)


def is_placeholder(value: str | None) -> bool:
    if not value:
        return True
    normalized = value.strip().lower()
    return any(token in normalized for token in ("example.com", "your-", "changeme", "replace-me"))


def send_contact_email(submission: ContactSubmission) -> None:
    smtp_host = os.getenv("SMTP_HOST")
    smtp_from = os.getenv("SMTP_FROM")
    contact_email = os.getenv("CONTACT_EMAIL")
    username = os.getenv("SMTP_USERNAME")
    password = os.getenv("SMTP_PASSWORD")
    if any(is_placeholder(value) for value in (smtp_host, smtp_from, contact_email, username, password)):
        raise RuntimeError("Email delivery settings are missing or still contain placeholders")

    message = EmailMessage()
    message["From"] = smtp_from
    message["To"] = contact_email
    message["Reply-To"] = submission.email
    message["Subject"] = f"Portfolio contact: {' '.join(submission.subject.split())}"
    message.set_content(
        f"Name: {' '.join(submission.name.split())}\n"
        f"Email: {submission.email}\n\n"
        f"{submission.message.strip()}"
    )

    host = smtp_host
    port = int(os.getenv("SMTP_PORT", "587"))
    use_ssl = os.getenv("SMTP_USE_SSL", "false").lower() == "true"
    context = ssl.create_default_context()
    if use_ssl:
        server_context = smtplib.SMTP_SSL(host, port, timeout=15, context=context)
    else:
        server_context = smtplib.SMTP(host, port, timeout=15)

    with server_context as server:
        if not use_ssl:
            server.starttls(context=context)
        if username and password:
            server.login(username, password)
        server.send_message(message)


@app.post("/contact")
async def contact(submission: ContactSubmission):
    if submission.website:
        return {"status": "ok"}

    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", submission.email):
        raise HTTPException(status_code=422, detail="Enter a valid email address")

    try:
        await asyncio.to_thread(send_contact_email, submission)
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
    except smtplib.SMTPAuthenticationError:
        raise HTTPException(status_code=503, detail="SMTP rejected the credentials; check the SMTP username and app password") from None
    except (OSError, smtplib.SMTPException):
        raise HTTPException(status_code=502, detail="Email could not be sent") from None

    return {"status": "sent"}