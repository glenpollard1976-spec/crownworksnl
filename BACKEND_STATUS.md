# 🔧 Backend Status & Testing Guide

## 📋 API Endpoints

### ✅ All Endpoints Configured

1. **`/api/contact`** - Contact form submissions
   - ✅ Rate limiting (5 requests/minute)
   - ✅ Input validation
   - ✅ Email sending via Resend (with fallback)
   - ✅ Confirmation emails

2. **`/api/checkout`** - Stripe payment processing
   - ✅ Package validation
   - ✅ Recurring subscriptions support
   - ✅ One-time payments
   - ✅ Presales support
   - ✅ Rate limiting

3. **`/api/ai-agent`** - Unified AI assistant
   - ✅ Service routing (iLawyer, ProVet, Business, Creative)
   - ✅ OpenAI GPT-4 for iLawyer (with fallback)
   - ✅ GPT-3.5-turbo for other services
   - ✅ Health check endpoint

4. **`/api/business-audit-agent`** - Business audit reports
   - ✅ Audit scoring system
   - ✅ AI-powered report generation
   - ✅ Rule-based fallback
   - ✅ Category analysis

5. **`/api/presales`** - Presales tracking
   - ✅ Tier management
   - ✅ Registration handling
   - ✅ Statistics endpoint

6. **`/api/webhook`** - Stripe webhook handler
   - ✅ Payment event processing
   - ✅ Subscription management
   - ✅ Optional (payments work without it)

---

## 🧪 Testing

### Quick Test
```bash
npm run test-backend
```

This will test all API endpoints and show:
- ✅ Working endpoints
- ⚠️  Endpoints with warnings (using fallbacks)
- ❌ Failed endpoints

### Manual Testing

#### 1. Contact API
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

#### 2. AI Agent API
```bash
curl -X POST http://localhost:3000/api/ai-agent \
  -H "Content-Type: application/json" \
  -d '{
    "query": "I need help with a contract",
    "context": {}
  }'
```

#### 3. Checkout API
```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "packageName": "AI Business Audit Report",
    "amount": 99,
    "isRecurring": false
  }'
```

---

## 🔐 Environment Variables

### Required for Full Functionality

| Variable | Purpose | Required? | Fallback |
|----------|---------|-----------|----------|
| `RESEND_API_KEY` | Email sending | No | Console logging |
| `STRIPE_SECRET_KEY` | Payment processing | Yes* | Error message |
| `OPENAI_API_KEY` | AI features | No | Rule-based responses |
| `STRIPE_WEBHOOK_SECRET` | Webhook verification | No | Works without verification |
| `CONTACT_EMAIL` | Contact form recipient | No | Defaults to crownworksnl@gmail.com |

*Required for payment functionality, but API will return helpful error if not set.

---

## ✅ Backend Features

### Security
- ✅ Rate limiting on all endpoints
- ✅ Input validation and sanitization
- ✅ XSS protection
- ✅ Package name validation (checkout)
- ✅ Amount validation (checkout)

### Reliability
- ✅ Graceful fallbacks for optional services
- ✅ Error handling
- ✅ Detailed error messages
- ✅ Health check endpoints

### Functionality
- ✅ Email sending (Resend)
- ✅ Payment processing (Stripe)
- ✅ AI responses (OpenAI)
- ✅ Business audit generation
- ✅ Presales tracking

---

## 🚀 Deployment Checklist

Before deploying, ensure:

- [ ] `RESEND_API_KEY` is set in Vercel (for emails)
- [ ] `STRIPE_SECRET_KEY` is set in Vercel (for payments)
- [ ] `OPENAI_API_KEY` is set in Vercel (for AI features)
- [ ] `STRIPE_WEBHOOK_SECRET` is set in Vercel (optional, for webhooks)
- [ ] Domain is configured in Resend (for email sending)
- [ ] Stripe webhook endpoint is configured (optional)

---

## 📊 Current Status

Run `npm run test-backend` to get current status of all endpoints.

### Expected Results:
- ✅ All endpoints should respond
- ⚠️  Some may show warnings if env vars not set (using fallbacks)
- ❌ None should fail completely

---

## 🔧 Troubleshooting

### Contact API not sending emails
- Check `RESEND_API_KEY` is set
- Check domain is verified in Resend
- Check Vercel logs for errors

### Checkout API failing
- Check `STRIPE_SECRET_KEY` is set
- Verify Stripe account is active
- Check package name matches `ALLOWED_PACKAGES`

### AI Agent not responding
- Check `OPENAI_API_KEY` is set
- Verify API key is valid
- Check rate limits on OpenAI account
- System will fallback to rule-based responses if OpenAI fails

### Webhook not receiving events
- Check `STRIPE_WEBHOOK_SECRET` is set
- Verify webhook URL in Stripe dashboard
- Check Vercel logs for webhook events

---

## 📝 Notes

- All APIs have fallback modes for optional services
- Rate limiting is in-memory (use Redis in production)
- Presales tracking is in-memory (use database in production)
- Webhook is optional - payments work without it

---

**Last Updated:** $(date)
**Status:** ✅ All endpoints configured and tested

