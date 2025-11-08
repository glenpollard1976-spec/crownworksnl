# ⚡ Postman Quick Start - CrownWorksNL

## 🚀 3-Minute Setup

### Step 1: Create Collection
1. Open Postman
2. Click **"New"** → **"Collection"**
3. Name: `CrownWorksNL`
4. Click **"Create"**

### Step 2: Create Environment
1. Click **"Environments"** (left sidebar)
2. Click **"+"** button
3. Name: `Local`
4. Add variable:
   - Variable: `base_url`
   - Initial Value: `http://localhost:3000`
5. Click **"Save"**
6. Select environment from dropdown (top right)

### Step 3: Test Checkout API

**Create Request:**
1. Click **"New"** → **"HTTP Request"**
2. Name: `Checkout Test`
3. Method: `POST`
4. URL: `{{base_url}}/api/checkout`
5. **Headers:**
   - `Content-Type: application/json`
6. **Body (raw JSON):**
   ```json
   {
     "packageName": "Business Growth Package",
     "amount": 1499,
     "isRecurring": false
   }
   ```
7. Click **"Send"**

**Expected:** Returns `sessionId` and `url` ✅

---

### Step 4: Test Contact Form

**New Request:**
- Method: `POST`
- URL: `{{base_url}}/api/contact`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "name": "Test",
    "email": "test@example.com",
    "message": "Testing"
  }
  ```

**Expected:** `{"success": true}` ✅

---

### Step 5: Test AI Agent

**New Request:**
- Method: `POST`
- URL: `{{base_url}}/api/ai-agent`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "query": "I need legal help"
  }
  ```

**Expected:** Returns AI response ✅

---

## ✅ Done!

You now have:
- ✅ Collection created
- ✅ Environment set up
- ✅ 3 main APIs tested

**Next:** Add more requests, create folders, add tests!

See `POSTMAN_GUIDE.md` for advanced features.

