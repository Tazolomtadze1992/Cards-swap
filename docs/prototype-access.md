# Protected full prototype

The public cards playground remains available at `/` and `/prototypes/cards`. The full homepage and its connected FAQ, glossary, and resources pages require HTTP Basic authentication in production.

Set these private environment variables in the Vercel project settings for Production, Preview, and Development as needed:

```text
PROTOTYPE_USERNAME=developer
PROTOTYPE_PASSWORD=<a long private password>
```

Redeploy after saving the variables. Opening any protected URL then shows the browser's username and password prompt. Successful credentials work across the protected routes for the browser session.

Local development remains open when `PROTOTYPE_PASSWORD` is absent. A production deployment without the password stays locked and returns an authentication challenge, preventing an accidental public release of the full prototype.
