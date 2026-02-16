# Deployment Guide

## Prerequisites

Before deploying, you need:

1. ✅ **OpenAI API Key** - Get from https://platform.openai.com/api-keys
2. ✅ **Hosting Account** - Aedify, Vercel, or your own server
3. ✅ **Domain** (optional) - Point your domain to the hosting

## Quick Start

### Step 1: Get Your OpenAI API Key

1. Go to https://platform.openai.com/signup
2. Create an account (free to start)
3. Go to https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. **Important:** Add billing info (pay as you go, ~$0.01 per chat)

### Step 2: Set Environment Variables

Your hosting platform needs these environment variables:

```
OPENAI_API_KEY=sk-your-actual-key-here
NEXT_PUBLIC_APP_NAME=Handyman AI Assistant
NEXT_PUBLIC_BUSINESS_NAME=Your Business Name
NEXT_PUBLIC_BUSINESS_PHONE=(555) 123-4567
NEXT_PUBLIC_BUSINESS_EMAIL=contact@yourbusiness.com
```

## Deployment Options

### Option 1: Aedify (GPU-Optimized Cloud)

**Status:** Waiting for Aedify account setup and documentation.

Once you have Aedify access:
1. Upload the project or connect GitHub
2. Set environment variables in Aedify dashboard
3. Deploy using their interface

_More instructions will be added after exploring Aedify platform._

---

### Option 2: Vercel (Easiest, Free Tier)

**Perfect for:** Quick deployment, automatic HTTPS, global CDN

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Or via CLI:
vercel env add OPENAI_API_KEY
```

**Custom Domain:**
- Go to Vercel dashboard → Project → Settings → Domains
- Add your domain and follow DNS instructions

---

### Option 3: Docker (Any Platform)

**Perfect for:** Self-hosting, VPS, cloud platforms

```bash
# Build image
docker build -t handyman-chatbot .

# Run container
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key \
  -e NEXT_PUBLIC_BUSINESS_NAME="Your Business" \
  --name handyman-chatbot \
  handyman-chatbot

# Check logs
docker logs handyman-chatbot
```

---

### Option 4: Manual Deployment (VPS/Dedicated Server)

**Perfect for:** Full control, existing infrastructure

```bash
# On your server:
git clone <your-repo>
cd handyman-chatbot-app

# Install dependencies
npm install

# Build production version
npm run build

# Set environment variables
nano .env.local  # Add your keys

# Start with PM2 (process manager)
npm install -g pm2
pm2 start npm --name "handyman-chatbot" -- start
pm2 save
pm2 startup

# Set up Nginx reverse proxy (optional)
# Configure SSL with Let's Encrypt
```

---

## After Deployment Checklist

- [ ] Test the chatbot with sample questions
- [ ] Verify OpenAI API is working (check responses)
- [ ] Customize business info in the system prompt
- [ ] Update pricing and services in `app/api/chat/route.ts`
- [ ] Add custom domain (if applicable)
- [ ] Set up SSL/HTTPS
- [ ] Test on mobile devices
- [ ] Monitor API costs in OpenAI dashboard

## Costs

### OpenAI API (Required)
- **GPT-4 Turbo:** ~$0.01-0.03 per conversation
- **GPT-3.5 Turbo:** ~$0.001 per conversation (cheaper option)
- **Estimated:** 1000 chats/month = $10-30 with GPT-4

### Hosting (Choose One)
- **Aedify:** TBD (check their pricing)
- **Vercel:** Free tier → $20/month for Pro (plenty for this app)
- **DigitalOcean VPS:** $5-12/month
- **AWS/GCP:** Pay-as-you-go, similar to Vercel

**Total Monthly Cost:** $15-50 depending on traffic and choices

## Troubleshooting

### "API key not configured"
- Make sure `OPENAI_API_KEY` is set in environment variables
- Verify the key starts with `sk-`
- Check if you have billing enabled on OpenAI

### Chat not responding
- Check browser console for errors (F12)
- Verify API route is accessible: `https://yourdomain.com/api/chat`
- Check server logs for errors

### High costs
- Switch from GPT-4 to GPT-3.5 in `app/api/chat/route.ts`
- Reduce `max_tokens` parameter
- Implement rate limiting

## Security

**Before going live:**
- [ ] Never commit `.env` files to Git
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting to prevent abuse
- [ ] Monitor API usage in OpenAI dashboard
- [ ] Set usage limits in OpenAI dashboard

## Next Steps

1. **Get it running locally first** (`npm run dev`)
2. **Test thoroughly** with real customer questions
3. **Customize** the system prompt for your business
4. **Deploy** using one of the options above
5. **Monitor** costs and performance

Need help? Check the main README.md or open an issue!
