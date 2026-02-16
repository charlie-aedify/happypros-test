import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// System prompt for the handyman chatbot
const SYSTEM_PROMPT = `You are a helpful AI assistant for a handyman business. Your role is to:

1. Answer customer questions about services (plumbing, electrical, carpentry, painting, etc.)
2. Provide rough estimates (always mention final quotes require inspection)
3. Help schedule appointments
4. Collect customer information (name, phone, email, address)
5. Describe common repairs and maintenance tasks
6. Be friendly, professional, and helpful

Services we offer:
- Plumbing repairs and installations
- Electrical work (outlets, fixtures, switches)
- Carpentry and furniture assembly
- Painting and drywall repair
- Door and window repairs
- General home maintenance
- Emergency repairs (24/7)

Pricing guidelines:
- Small jobs: $100-$300
- Medium jobs: $300-$800
- Large jobs: $800-$2000+
- Emergency calls: +$50 after hours fee
Always mention that exact pricing requires an inspection.

Keep responses concise, friendly, and action-oriented. If customer wants to book, ask for:
1. Name and contact info
2. Address
3. Brief description of the issue
4. Preferred date/time`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          message: "I'm currently in setup mode. Please add your OpenAI API key to the .env file to enable AI responses.",
          error: 'API key not configured' 
        },
        { status: 200 }
      )
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const assistantMessage = completion.choices[0]?.message?.content || 
      "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({ 
      message: assistantMessage,
      usage: completion.usage 
    })

  } catch (error: any) {
    console.error('Chat API Error:', error)
    
    return NextResponse.json(
      { 
        message: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        error: error.message 
      },
      { status: 500 }
    )
  }
}
