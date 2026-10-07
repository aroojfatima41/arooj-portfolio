import os
import unittest
from unittest.mock import patch

from fastapi import HTTPException

from main import ContactSubmission, contact, send_contact_email


class ContactEndpointTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.submission = ContactSubmission(
            name="Arooj Fatima",
            email="sender@example.com",
            subject="Portfolio enquiry",
            message="I would like to discuss a frontend opportunity.",
        )

    async def test_honeypot_submission_is_ignored(self):
        spam = self.submission.model_copy(update={"website": "spam.example"})
        with patch.dict(os.environ, {}, clear=True):
            self.assertEqual(await contact(spam), {"status": "ok"})

    async def test_missing_smtp_configuration_returns_503(self):
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaises(HTTPException) as raised:
                await contact(self.submission)
        self.assertEqual(raised.exception.status_code, 503)

    async def test_placeholder_smtp_password_returns_configuration_error(self):
        settings = {
            "SMTP_HOST": "smtp.gmail.com",
            "SMTP_PORT": "587",
            "SMTP_FROM": "owner@gmail.com",
            "CONTACT_EMAIL": "owner@gmail.com",
            "SMTP_USERNAME": "owner@gmail.com",
            "SMTP_PASSWORD": "your-16-character-app-password",
        }
        with patch.dict(os.environ, settings, clear=True):
            with patch("main.smtplib.SMTP") as smtp:
                with self.assertRaises(HTTPException) as raised:
                    await contact(self.submission)
        self.assertEqual(raised.exception.status_code, 503)
        smtp.assert_not_called()

    async def test_invalid_email_returns_422(self):
        invalid = self.submission.model_copy(update={"email": "not-an-email"})
        with self.assertRaises(HTTPException) as raised:
            await contact(invalid)
        self.assertEqual(raised.exception.status_code, 422)

    async def test_valid_submission_is_delivered(self):
        settings = {
            "SMTP_HOST": "smtp.mail.test",
            "SMTP_FROM": "portfolio@mail.test",
            "CONTACT_EMAIL": "owner@mail.test",
            "SMTP_USERNAME": "mailer@mail.test",
            "SMTP_PASSWORD": "test-secret-value",
        }
        with patch.dict(os.environ, settings, clear=True):
            with patch("main.send_contact_email") as send_email:
                self.assertEqual(await contact(self.submission), {"status": "sent"})
                send_email.assert_called_once_with(self.submission)

    def test_smtp_message_uses_sender_as_reply_to(self):
        settings = {
            "SMTP_HOST": "smtp.mail.test",
            "SMTP_FROM": "portfolio@mail.test",
            "CONTACT_EMAIL": "owner@mail.test",
            "SMTP_USERNAME": "mailer@mail.test",
            "SMTP_PASSWORD": "test-secret-value",
        }
        with patch.dict(os.environ, settings, clear=True):
            with patch("main.smtplib.SMTP") as smtp:
                send_contact_email(self.submission)

        server = smtp.return_value.__enter__.return_value
        message = server.send_message.call_args.args[0]
        self.assertEqual(message["To"], "owner@mail.test")
        self.assertEqual(message["Reply-To"], "sender@example.com")
        self.assertEqual(message["From"], "portfolio@mail.test")


if __name__ == "__main__":
    unittest.main()