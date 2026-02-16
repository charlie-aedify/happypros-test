# 🔧 Handyman AI Assistant

An AI-powered chatbot designed for handyman professionals to handle customer interactions 24/7.

## Features

- ✅ **24/7 Customer Service** - AI chatbot responds instantly to inquiries
- ✅ **Service Information** - Answers questions about plumbing, electrical, carpentry, etc.
- ✅ **Lead Capture** - Collects customer contact info and job details
- ✅ **Mobile Responsive** - Works perfectly on phones and tablets
- ✅ **Modern UI** - Beautiful, professional design with smooth animations
- ✅ **Easy Deployment** - Ready to deploy on Aedify or any hosting platform

## Tech Stack

- **Frontend:** Next.js 14 + React + TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI GPT-4 (easily swap to Claude or other models)
- **Database:** Supabase (optional, for chat history)
- **Icons:** Lucide React

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

**Get an OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create an account or sign in
3. Click "Create new secret key"
4. Copy the key and paste it in `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

### 4. Customize Your Business Info

Edit the system prompt in `app/api/chat/route.ts` to add:
- Your actual services and pricing
- Your business name and contact info
- Your service area and hours
- Any special policies or information

## Deployment

### Option 1: Aedify (Recommended for AI workloads)

_Instructions coming soon - pending Aedify documentation_

### Option 2: Vercel (Easy, Free)

```bash
npm install -g vercel
vercel login
vercel
```

### Option 3: Docker (For any platform)

```bash
# Build the Docker image
docker build -t handyman-chatbot .

# Run the container
docker run -p 3000:3000 --env-file .env.local handyman-chatbot
```

## Customization

### Change AI Model

In `app/api/chat/route.ts`, change the model:

```typescript
model: 'gpt-4-turbo-preview',  // or 'gpt-3.5-turbo' for cheaper
```

### Change Colors

Edit `tailwind.config.js` to change the primary color theme.

### Add Database (Optional)

To store chat history and customer data:
1. Sign up for Supabase (free tier available)
2. Add the credentials to `.env.local`
3. Implement database logic in `lib/supabase.ts`

## Project Structure

```
handyman-chatbot-app/
├── app/
│   ├── api/chat/route.ts    # AI chatbot API endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   └── ChatInterface.tsx    # Main chat UI component
├── lib/                     # Utility functions
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── package.json
└── README.md
```

## Cost Estimate

**OpenAI API Costs:**
- GPT-4 Turbo: ~$0.01 per chat conversation
- GPT-3.5 Turbo: ~$0.001 per conversation

For 1000 customer chats/month with GPT-4: ~$10-20/month

## Support

Need help? Open an issue or contact support.

## License

MIT
