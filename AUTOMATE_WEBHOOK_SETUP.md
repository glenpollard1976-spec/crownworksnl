# 🤖 Automate Stripe Webhook Setup

## Option 1: Stripe CLI (Recommended)

Stripe CLI can create webhook endpoints automatically!

### Install Stripe CLI

**Windows (via Scoop - already installed!):**
```powershell
scoop install stripe-cli
```

**Or download manually:**
- Go to: https://stripe.com/docs/stripe-cli
- Download Windows installer
- Run installer

### Login to Stripe CLI

```powershell
stripe login
```

This will:
1. Open browser
2. Ask you to authorize
3. Save credentials locally

### Create Webhook Endpoint (Automated!)

```powershell
stripe webhook-endpoints create \
  --url https://crownworksnl.com/api/webhook \
  --enabled-events checkout.session.completed \
  --enabled-events payment_intent.succeeded \
  --enabled-events customer.subscription.created \
  --enabled-events customer.subscription.updated \
  --enabled-events customer.subscription.deleted
```

**Or create with all events:**
```powershell
stripe webhook-endpoints create \
  --url https://crownworksnl.com/api/webhook \
  --enabled-events "*"
```

### Get Webhook Secret (Automated!)

After creating, the CLI will output the webhook secret!

Or list all webhooks:
```powershell
stripe webhook-endpoints list
```

Get secret for specific webhook:
```powershell
stripe webhook-endpoints retrieve we_xxx
```

---

## Option 2: PowerShell Script (Automated)

I'll create a script that uses Stripe CLI to automate everything.

---

## Option 3: Stripe API (Programmatic)

Use Stripe API directly via curl or PowerShell.

---

## Quick Test

After installing Stripe CLI, test it:
```powershell
stripe --version
```

If it works, you're ready to automate!


