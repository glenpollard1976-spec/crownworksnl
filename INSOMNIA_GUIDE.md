# 🧪 Using Insomnia to Test CrownWorksNL APIs

## Quick Start

### 1. Test Your Checkout API

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/checkout` (local) or `https://crownworksnl.com/api/checkout` (production)
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "packageName": "Business Growth Package",
    "amount": 1499,
    "isRecurring": false
  }
  ```

**Expected Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

---

### 2. Test Your Contact Form API

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/contact` (local) or `https://crownworksnl.com/api/contact` (production)
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1 (709) 123-4567",
    "message": "This is a test message from Insomnia"
  }
  ```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

---

### 3. Test Your AI Agent API

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/ai-agent` (local) or `https://crownworksnl.com/api/ai-agent` (production)
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "query": "I need help with legal document preparation",
    "context": {}
  }
  ```

**Expected Response:**
```json
{
  "success": true,
  "service": "iLawyer",
  "message": "I can help you with legal matters...",
  "action": "contact",
  "suggestedActions": [...]
}
```

---

### 4. Test Webhook Endpoint (Simulate Stripe)

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/webhook` (local) or `https://crownworksnl.com/api/webhook` (production)
- **Headers:**
  ```
  Content-Type: application/json
  stripe-signature: whsec_test_signature
  ```
- **Body (JSON):** (Simplified - Stripe sends more complex data)
  ```json
  {
    "type": "checkout.session.completed",
    "data": {
      "object": {
        "id": "cs_test_123",
        "payment_status": "paid",
        "amount_total": 149900
      }
    }
  }
  ```

**Note:** Real Stripe webhooks require signature verification. Use Stripe CLI for proper testing.

---

## 🎯 Testing Workflow

### Step 1: Start Your Local Server
```bash
npm run dev
```

### Step 2: Create Requests in Insomnia

1. **Create a new request:**
   - Click "+" button
   - Choose "HTTP Request"
   - Name it (e.g., "Test Checkout API")

2. **Set the URL:**
   - Enter: `http://localhost:3000/api/checkout`

3. **Set the method:**
   - Change to `POST`

4. **Add headers:**
   - Click "Header" tab
   - Add: `Content-Type: application/json`

5. **Add body:**
   - Click "Body" tab
   - Select "JSON"
   - Paste the JSON body from examples above

6. **Send request:**
   - Click "Send" button
   - View response in bottom panel

---

## 📋 Pre-configured Requests (Import These)

You can create these requests in Insomnia:

### Request Collection Structure:
```
CrownWorksNL APIs
├── Checkout
│   ├── Business Growth Package (One-time)
│   └── Business Growth Package (Subscription)
├── Contact Form
│   └── Send Test Message
├── AI Agent
│   ├── Legal Query
│   ├── Veterinary Query
│   └── Business Query
└── Webhook
    └── Test Webhook (Manual)
```

---

## 🔧 Testing Stripe Webhooks Properly

For **real webhook testing**, use **Stripe CLI** instead:

```bash
# Install Stripe CLI (if not installed)
# Then run:
stripe listen --forward-to localhost:3000/api/webhook

# In another terminal, trigger a test event:
stripe trigger checkout.session.completed
```

This will:
1. Forward real Stripe webhook events to your local server
2. Include proper signatures
3. Test the full webhook flow

---

## 🐛 Debugging Tips

### Check Response Status:
- **200 OK** = Success
- **400 Bad Request** = Invalid input
- **429 Too Many Requests** = Rate limited
- **500 Internal Server Error** = Server error

### Check Response Body:
- Look for `error` field for error messages
- Check `success` field for boolean status
- Review `message` field for human-readable info

### Common Issues:

1. **"Stripe is not configured"**
   - Add `STRIPE_SECRET_KEY` to `.env.local` (local) or Vercel (production)

2. **"Too many requests"**
   - Wait 1 minute and try again
   - Rate limiting is working (good!)

3. **"Failed to send message"**
   - Check `RESEND_API_KEY` is set
   - Or check console logs for details

---

## 📝 Example: Full Checkout Flow Test

1. **Test Checkout API:**
   ```
   POST /api/checkout
   → Get checkout URL
   ```

2. **Open checkout URL in browser:**
   - Use test card: `4242 4242 4242 4242`
   - Complete payment

3. **Check webhook fired:**
   - Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook`
   - Or check Stripe dashboard → Events

4. **Verify success page:**
   - Should redirect to `/success?session_id=...`

---

## 🚀 Next Steps

1. **Create all requests** in Insomnia for easy testing
2. **Save as collection** for future use
3. **Test before deploying** to catch errors early
4. **Use environment variables** in Insomnia for different URLs (local vs production)

---

**Happy Testing! 🎉**

