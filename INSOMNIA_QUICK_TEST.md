# ⚡ Quick Insomnia Tests for CrownWorksNL

## Test 1: Checkout API (30 seconds)

**POST** `http://localhost:3000/api/checkout`

**Body:**
```json
{
  "packageName": "Business Growth Package",
  "amount": 1499,
  "isRecurring": false
}
```

**Expected:** Returns `sessionId` and `url`

---

## Test 2: Contact Form (20 seconds)

**POST** `http://localhost:3000/api/contact`

**Body:**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+1 (709) 123-4567",
  "message": "Testing contact form"
}
```

**Expected:** `{"success": true, "message": "Message sent successfully!"}`

---

## Test 3: AI Agent (20 seconds)

**POST** `http://localhost:3000/api/ai-agent`

**Body:**
```json
{
  "query": "I need legal help with contracts"
}
```

**Expected:** Returns AI response with service routing

---

## 🎯 Make Sure:

1. Your dev server is running: `npm run dev`
2. You're using `localhost:3000` (not production URL)
3. Headers include: `Content-Type: application/json`

---

**That's it! These 3 tests verify your main APIs work.** ✅

