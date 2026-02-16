# 🚀 Quick Start Guide

## Get Running in 5 Minutes!

### Step 1: Get an OpenAI API Key (2 minutes)

1. Go to https://platform.openai.com/signup
2. Create an account (use your email)
3. Add a payment method (required - they charge per use)
4. Go to https://platform.openai.com/api-keys
5. Click "Create new secret key"
6. **Copy the key** (starts with `sk-`) - you'll need it next!

### Step 2: Install & Run (3 minutes)

Open your terminal in this folder and run:

```bash
# Run the setup script
./setup.sh

# It will:
# - Install all dependencies (takes 1-2 minutes)
# - Create .env.local for you

# Now add your API key:
nano .env.local
# or use any text editor to open .env.local
```

**In .env.local, replace the placeholder with your actual key:**
```
OPENAI_API_KEY=sk-your-actual-key-here-from-step-1
```

Save the file!

### Step 3: Start the App

```bash
npm run dev
```

**Open your browser:** http://localhost:3000

🎉 **Done!** Start chatting with your AI handyman assistant!

---

## What to Test

Try asking these questions:

- "How much does it cost to fix a leaky faucet?"
- "Do you do emergency repairs?"
- "I need someone to install a ceiling fan"
- "What services do you offer?"
- "Can I schedule an appointment?"

---

## Customize Before Going Live

**1. Edit Business Info** (`app/api/chat/route.ts`)

Change this part to match YOUR business:

```typescript
Services we offer:
- Your actual services here

Pricing guidelines:
- Your actual pricing here
```

**2. Update Contact Info** (`.env.local`)

```
NEXT_PUBLIC_BUSINESS_NAME=Your Actual Business Name
NEXT_PUBLIC_BUSINESS_PHONE=(555) 123-4567
NEXT_PUBLIC_BUSINESS_EMAIL=contact@yourbusiness.com
```

**3. Test Thoroughly**

Ask it lots of questions! Make sure the responses match your business.

---

## Ready to Deploy?

See `DEPLOYMENT.md` for:
- Deploying to Aedify
- Deploying to Vercel (easiest)
- Docker deployment
- Custom domain setup

---

## Troubleshooting

### "API key not configured"
- Make sure you saved `.env.local` with your real API key
- The key must start with `sk-`
- Restart the dev server: Stop (Ctrl+C) and run `npm run dev` again

### "Module not found" errors
- Run `npm install` again
- Make sure you're in the `handyman-chatbot-app` folder

### Still stuck?
- Check `README.md` for detailed info
- Check OpenAI dashboard for API status
- Verify your OpenAI account has billing enabled

---

## Cost Warning ⚠️

**Each conversation costs ~$0.01-0.03** with GPT-4.

To reduce costs:
1. **Use GPT-3.5 instead** (10x cheaper):
   - Edit `app/api/chat/route.ts`
   - Change `model: 'gpt-4-turbo-preview'` to `model: 'gpt-3.5-turbo'`
2. **Set usage limits** in OpenAI dashboard
3. **Monitor spending** at https://platform.openai.com/usage

---

## That's It!

You now have a working AI chatbot. 

**Next:** Read `PROJECT_OVERVIEW.md` to understand the full project.

Happy coding! 🔧
