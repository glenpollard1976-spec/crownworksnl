# 🤖 BATCH EMAIL SENDER - FULLY AUTOMATED

## Glen, This Opens ALL Emails Automatically. Just Click Send.

---

## ⚡ ONE COMMAND - DONE

```bash
npm run send-batch
```

**That's it. It opens all emails automatically.**

---

## 🚀 WHAT IT DOES

1. ✅ Finds your CSV file
2. ✅ Parses all contacts
3. ✅ Opens emails in batches of 10
4. ✅ Waits 5 seconds between batches
5. ✅ Your email client opens with all emails ready
6. ✅ You just click "Send" on each one

**No clicking links. No thinking. Just send.**

---

## ⚙️ CUSTOMIZE BATCH SIZE

**Default:** 10 emails per batch, 5 second delay

**Change it:**
```bash
node scripts/send-batch.js [csv-path] [batch-size] [delay-seconds]
```

**Examples:**
```bash
# 20 emails per batch, 10 second delay
node scripts/send-batch.js contacts.csv 20 10000

# 5 emails per batch, 3 second delay
node scripts/send-batch.js contacts.csv 5 3000
```

---

## 📊 HOW IT WORKS

**Batch 1:** Opens first 10 emails → Wait 5 seconds
**Batch 2:** Opens next 10 emails → Wait 5 seconds
**Batch 3:** Opens next 10 emails → Wait 5 seconds
**...continues until all done**

**Your email client will have all emails open and ready to send.**

---

## ✅ CHECKLIST

- [ ] Run: `npm run send-batch`
- [ ] Wait for emails to open
- [ ] Click "Send" on each email
- [ ] **DONE**

---

## 💪 THAT'S IT

**One command. All emails open. You send. Done.**

🚀 **RUN: `npm run send-batch`**

