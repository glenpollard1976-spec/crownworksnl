# 📮 Using Postman to Test CrownWorksNL APIs

## Quick Start

### 1. Test Your Checkout API

**Create New Request:**
1. Click **"New"** → **"HTTP Request"**
2. Name it: `Test Checkout API`

**Configure Request:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/checkout` (local) or `https://crownworksnl.com/api/checkout` (production)
- **Headers Tab:**
  - Key: `Content-Type`
  - Value: `application/json`
- **Body Tab:**
  - Select **"raw"**
  - Select **"JSON"** from dropdown
  - Paste:
  ```json
  {
    "packageName": "Business Growth Package",
    "amount": 1499,
    "isRecurring": false
  }
  ```

**Click "Send"**

**Expected Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

---

### 2. Test Your Contact Form API

**New Request:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/contact`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1 (709) 123-4567",
    "message": "This is a test message from Postman"
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

**New Request:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/ai-agent`
- **Headers:** `Content-Type: application/json`
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

### 4. Test Webhook Endpoint (Manual Test)

**New Request:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/webhook`
- **Headers:**
  - `Content-Type: application/json`
  - `stripe-signature: whsec_test_signature`
- **Body (JSON):**
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

**Note:** For real webhook testing, use Stripe CLI (see below).

---

## 🎯 Create a Postman Collection

### Step 1: Create Collection
1. Click **"New"** → **"Collection"**
2. Name it: `CrownWorksNL APIs`
3. Click **"Create"**

### Step 2: Add Requests to Collection
1. Create each request (as shown above)
2. Drag requests into the collection
3. Organize with folders:
   ```
   CrownWorksNL APIs
   ├── Checkout
   │   ├── Business Growth (One-time)
   │   └── Business Growth (Subscription)
   ├── Contact
   │   └── Send Message
   ├── AI Agent
   │   ├── Legal Query
   │   ├── Veterinary Query
   │   └── Business Query
   └── Webhook
       └── Test Webhook
   ```

### Step 3: Save Collection
- Click **"Save"** button
- Collection is saved automatically

---

## 🌍 Use Environment Variables

### Create Environment:
1. Click **"Environments"** (left sidebar)
2. Click **"+"** to create new
3. Name it: `CrownWorksNL Local`
4. Add variables:
   - `base_url` = `http://localhost:3000`
   - `api_url` = `http://localhost:3000/api`
5. Click **"Save"**

### Create Production Environment:
1. Create another environment: `CrownWorksNL Production`
2. Add variables:
   - `base_url` = `https://crownworksnl.com`
   - `api_url` = `https://crownworksnl.com/api`
3. Click **"Save"**

### Use in Requests:
- Change URL to: `{{api_url}}/checkout`
- Postman will replace `{{api_url}}` with the value from selected environment
- Switch environments using dropdown (top right)

---

## 🔧 Testing Stripe Webhooks Properly

For **real webhook testing**, use **Stripe CLI**:

```bash
# In terminal:
stripe listen --forward-to localhost:3000/api/webhook

# In another terminal, trigger test event:
stripe trigger checkout.session.completed
```

This forwards real Stripe webhook events with proper signatures.

---

## 📋 Pre-configured Collection (Import)

You can create a collection file to import. Here's the structure:

**Collection JSON Structure:**
```json
{
  "info": {
    "name": "CrownWorksNL APIs",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Checkout - Business Growth",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"packageName\": \"Business Growth Package\",\n  \"amount\": 1499,\n  \"isRecurring\": false\n}"
        },
        "url": {
          "raw": "{{api_url}}/checkout",
          "variable": []
        }
      }
    }
  ]
}
```

**To Import:**
1. Click **"Import"** button (top left)
2. Select **"File"** tab
3. Choose the JSON file
4. Click **"Import"**

---

## 🐛 Debugging Tips

### Check Response:
- **Status Code:** Should be `200 OK` for success
- **Time:** Shows how long request took
- **Size:** Shows response size

### Common Status Codes:
- **200** = Success ✅
- **400** = Bad Request (check your JSON)
- **429** = Too Many Requests (rate limited)
- **500** = Server Error (check server logs)

### View Response:
- **Pretty:** Formatted JSON (default)
- **Raw:** Unformatted text
- **Preview:** HTML preview (if HTML response)
- **Visualize:** Custom visualization

### Save Responses:
- Click **"Save Response"** button
- Useful for comparing before/after changes

---

## 🚀 Advanced Features

### 1. Tests (Automated Checks)
Add to **"Tests"** tab:
```javascript
// Check status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Check response has sessionId
pm.test("Response has sessionId", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('sessionId');
});
```

### 2. Pre-request Scripts
Add to **"Pre-request Script"** tab:
```javascript
// Set timestamp
pm.environment.set("timestamp", new Date().toISOString());
```

### 3. Variables
Use `{{variable_name}}` in URLs, headers, or body:
- `{{base_url}}/api/checkout`
- `{{api_url}}/contact`

---

## 📝 Example: Full Checkout Flow Test

### Step 1: Test Checkout API
```
POST {{api_url}}/checkout
→ Get checkout URL
```

### Step 2: Copy Checkout URL
- Copy `url` from response
- Open in browser

### Step 3: Complete Payment
- Use test card: `4242 4242 4242 4242`
- Any future expiry date
- Any CVC

### Step 4: Verify Webhook
- Use Stripe CLI to listen
- Or check Stripe dashboard → Events

### Step 5: Check Success Page
- Should redirect to `/success?session_id=...`

---

## 🎯 Quick Test Checklist

- [ ] Checkout API returns checkout URL
- [ ] Contact form sends successfully
- [ ] AI Agent routes queries correctly
- [ ] Webhook endpoint accepts requests
- [ ] All responses are JSON
- [ ] Error handling works (test with invalid data)

---

## 💡 Pro Tips

1. **Save requests** to collection for easy reuse
2. **Use environments** to switch between local/production
3. **Add tests** to automatically verify responses
4. **Export collection** to share with team
5. **Use variables** to avoid hardcoding URLs
6. **Organize with folders** for better structure

---

**Happy Testing! 🎉**

