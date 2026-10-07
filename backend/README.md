# Portfolio contact API

The FastAPI service sends contact-form submissions to the configured inbox through SMTP.

1. Install the backend requirements with `pip install -r requirements.txt`.
2. Copy `.env.example` to `.env` and fill in the inbox, SMTP host, sender, and credentials supplied by your email provider.
3. Run `uvicorn main:app --reload --port 8000` from this directory.
4. Copy `frontend/.env.example` to `frontend/.env.local` for local development. Set `NEXT_PUBLIC_API_URL` to the deployed API URL in the frontend host environment when deploying.
5. Set `CORS_ORIGINS` to the frontend origin or comma-separated frontend origins in the backend environment.

Never commit `.env` files or SMTP credentials. Use an SMTP app password where the provider requires one.