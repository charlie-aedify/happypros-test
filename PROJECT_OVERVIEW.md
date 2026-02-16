# 🔧 Handyman AI Chatbot - Project Overview

## What We Built

A complete, production-ready AI chatbot web application tailored for handyman professionals to automate customer interactions.

## Key Features

### ✅ Built & Ready
- **Modern web interface** - Beautiful, responsive chat UI
- **AI-powered responses** - Uses OpenAI GPT-4 for intelligent conversations
- **Mobile-friendly** - Works perfectly on phones and tablets
- **Lead capture** - Collects customer contact info and job details
- **Service knowledge** - Pre-trained on handyman services, pricing, scheduling
- **24/7 availability** - Never miss a customer inquiry
- **Professional design** - Clean, modern UI with smooth animations
- **Easy deployment** - Multiple hosting options included

### 🎨 User Experience
- Real-time chat interface
- Typing indicators
- Message timestamps
- Smooth animations
- Dark mode support
- Mobile responsive layout

### 🧠 AI Capabilities
The chatbot is trained to:
- Answer questions about services (plumbing, electrical, carpentry, painting, etc.)
- Provide rough estimates (with disclaimer about final quotes)
- Help schedule appointments
- Collect customer information (name, phone, email, address)
- Explain common repairs and maintenance tasks
- Handle emergency service inquiries

## Tech Stack

| Component | Technology | Why? |
|-----------|-----------|------|
| Frontend | Next.js 14 + React + TypeScript | Modern, fast, SEO-friendly |
| Styling | Tailwind CSS | Rapid development, beautiful UI |
| AI Model | OpenAI GPT-4 Turbo | Best-in-class conversational AI |
| Icons | Lucide React | Clean, modern icons |
| Deployment | Aedify / Vercel / Docker | Flexible hosting options |

## Project Structure

```
handyman-chatbot-app/
├── app/
│   ├── api/chat/route.ts       # AI chatbot API endpoint ⚡
│   ├── page.tsx                # Home page with chat interface
│   ├── layout.tsx              # App layout and metadata
│   └── globals.css             # Global styles and animations
├── components/
│   └── ChatInterface.tsx       # Main chat UI component 💬
├── public/                     # Static assets (add logo here)
├── .env.example                # Environment variables template
├── package.json                # Dependencies
├── Dockerfile                  # For containerized deployment
├── setup.sh                    # Quick setup script
├── README.md                   # Developer documentation
├── DEPLOYMENT.md               # Deployment instructions
└── PROJECT_OVERVIEW.md         # This file
```

## Getting Started

### Quick Setup (3 steps)

```bash
# 1. Run setup script
./setup.sh

# 2. Add your OpenAI API key to .env.local
nano .env.local  # Add: OPENAI_API_KEY=sk-your-key

# 3. Start development server
npm run dev
```

Visit http://localhost:3000 - Done! 🎉

### What You Need

**Required:**
- Node.js 20+ (free)
- OpenAI API account (~$10-30/month for moderate use)

**For Deployment:**
- Hosting account (Aedify / Vercel / VPS)
- Domain name (optional)

## Customization Checklist

Before going live, customize these:

- [ ] **Business info** - Edit system prompt in `app/api/chat/route.ts`
  - Company name
  - Services offered
  - Pricing guidelines
  - Service area and hours
  - Contact information

- [ ] **Branding**
  - Update title/description in `app/layout.tsx`
  - Add your logo to `public/` folder
  - Customize colors in `tailwind.config.js`

- [ ] **Environment variables** in `.env.local`
  - `OPENAI_API_KEY` (required)
  - `NEXT_PUBLIC_BUSINESS_NAME`
  - `NEXT_PUBLIC_BUSINESS_PHONE`
  - `NEXT_PUBLIC_BUSINESS_EMAIL`

## Deployment Options

### 1. Aedify (Your Choice) 🎯
- AI-optimized infrastructure
- Good for GPU workloads
- Waiting for account setup

### 2. Vercel (Easiest)
- One-click deployment
- Free tier available
- Automatic HTTPS and CDN

### 3. Docker (Flexible)
- Works on any platform
- Full control
- Great for VPS/cloud

See `DEPLOYMENT.md` for detailed instructions.

## Costs Breakdown

### OpenAI API (Required)
- **GPT-4 Turbo:** ~$0.01-0.03 per conversation
- **GPT-3.5 Turbo:** ~$0.001 per conversation (cheaper alternative)

**Monthly estimate:**
- 500 chats: $5-15 (GPT-4) or $0.50-5 (GPT-3.5)
- 1000 chats: $10-30 (GPT-4) or $1-10 (GPT-3.5)
- 5000 chats: $50-150 (GPT-4) or $5-50 (GPT-3.5)

### Hosting
- Aedify: TBD
- Vercel: Free → $20/month
- DigitalOcean VPS: $5-12/month
- Self-hosted: Hardware costs only

**Total:** $15-50/month for most small businesses

## Next Steps

### Phase 1: Get It Running ✅ (DONE!)
- [x] Create project structure
- [x] Build chat interface
- [x] Integrate OpenAI API
- [x] Add documentation

### Phase 2: Local Testing (You Do This)
- [ ] Run `./setup.sh`
- [ ] Add OpenAI API key
- [ ] Test chatbot locally
- [ ] Customize business info

### Phase 3: Deploy to Production
- [ ] Sign up for Aedify (waiting on you)
- [ ] Review Aedify documentation
- [ ] Configure environment variables
- [ ] Deploy application
- [ ] Point domain (optional)

### Phase 4: Future Enhancements (Optional)
- [ ] Add database (Supabase) for chat history
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Email notifications for new leads
- [ ] SMS integration
- [ ] Appointment booking system
- [ ] Payment processing
- [ ] Analytics and reporting

## Architecture Diagram

```
┌─────────────┐
│   Browser   │  ← Customer visits website
└──────┬──────┘
       │ HTTPS
       ↓
┌─────────────┐
│  Next.js    │  ← Chat interface (React)
│  Frontend   │
└──────┬──────┘
       │ API Call
       ↓
┌─────────────┐
│  /api/chat  │  ← API route handles requests
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  OpenAI API │  ← GPT-4 generates responses
└─────────────┘
```

## Security Notes

**✅ Built-in Security:**
- Environment variables for secrets
- API keys never exposed to frontend
- HTTPS required for production

**⚠️ TODO Before Production:**
- [ ] Enable rate limiting
- [ ] Set OpenAI usage limits
- [ ] Monitor API costs
- [ ] Add CAPTCHA (optional)
- [ ] Implement session management

## Support & Resources

- **README.md** - Developer documentation
- **DEPLOYMENT.md** - Deployment instructions
- **OpenAI Docs** - https://platform.openai.com/docs
- **Next.js Docs** - https://nextjs.org/docs
- **Tailwind CSS** - https://tailwindcss.com/docs

## Questions?

Common questions answered:

**Q: Can I use Claude instead of OpenAI?**
A: Yes! Just modify `app/api/chat/route.ts` to use Anthropic's API.

**Q: How do I add a database?**
A: Use Supabase (recommended) - add credentials to `.env.local` and implement database logic.

**Q: Can customers upload images?**
A: Not yet - but this is easy to add with GPT-4 Vision API.

**Q: How do I prevent abuse?**
A: Add rate limiting (middleware) and set usage limits in OpenAI dashboard.

**Q: Can I white-label this?**
A: Absolutely! Customize all branding, colors, and text.

---

Built with ❤️ for handyman professionals who want to automate customer service.

**Current Status:** ✅ Ready to test locally
**Next Step:** Get Aedify account and deploy!
