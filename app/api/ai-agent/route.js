import { NextResponse } from 'next/server';

/**
 * CrownWorks AI Agent API
 * Unified AI assistant that routes to appropriate services
 */

// Initialize OpenAI (optional - falls back to rule-based if not configured)
let openai = null;
try {
  if (process.env.OPENAI_API_KEY) {
    const OpenAI = require('openai').default;
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
} catch (error) {
  // OpenAI not available, will use rule-based responses
  console.log('OpenAI not configured, using rule-based responses');
}

// Service routing logic
const routeToService = (query, context) => {
  const lowerQuery = query.toLowerCase();
  
  // Legal keywords
  const legalKeywords = ['legal', 'law', 'contract', 'agreement', 'compliance', 'lawsuit', 'attorney', 'lawyer', 'document', 'legal document'];
  if (legalKeywords.some(keyword => lowerQuery.includes(keyword))) {
    return 'ilawyer';
  }
  
  // Veterinary keywords
  const vetKeywords = ['vet', 'veterinary', 'pet', 'dog', 'cat', 'animal', 'vaccination', 'health record', 'canine', 'feline'];
  if (vetKeywords.some(keyword => lowerQuery.includes(keyword))) {
    return 'provet';
  }
  
  // Business consulting keywords
  const businessKeywords = ['business', 'strategy', 'growth', 'consulting', 'revenue', 'marketing', 'sales', 'planning', 'roadmap'];
  if (businessKeywords.some(keyword => lowerQuery.includes(keyword))) {
    return 'business';
  }
  
  // Brand & creative keywords
  const creativeKeywords = ['brand', 'design', 'logo', 'creative', 'content', 'marketing material', 'identity', 'graphic'];
  if (creativeKeywords.some(keyword => lowerQuery.includes(keyword))) {
    return 'creative';
  }
  
  // Default to general business consulting
  return 'business';
};

// Service-specific response generators (fallback if OpenAI not available)
const generateRuleBasedResponse = async (service, query, context) => {
  const responses = {
    ilawyer: {
      message: `I can help you with legal matters through our iLawyer service. I can assist with:
- Legal document preparation
- Contract review
- Business compliance
- Legal questions

Would you like me to help you with a specific legal matter?`,
      action: 'contact',
      service: 'iLawyer'
    },
    provet: {
      message: `I can help you with veterinary practice management through our ProVet service. I can assist with:
- 24/7 AI veterinary consultations
- Health records management
- Vaccination tracking
- Practice management

How can I help with your veterinary needs?`,
      action: 'contact',
      service: 'ProVet'
    },
    business: {
      message: `I can help you with business consulting and growth strategies. I can assist with:
- Business strategy development
- Growth planning
- Market analysis
- Revenue optimization
- AI automation solutions

What business challenge can I help you solve?`,
      action: 'contact',
      service: 'Business Consulting'
    },
    creative: {
      message: `I can help you with brand development and creative services. I can assist with:
- Brand identity design
- Content creation
- Marketing materials
- Creative strategy

What creative project are you working on?`,
      action: 'contact',
      service: 'Brand & Creative'
    }
  };
  
  return responses[service] || responses.business;
};

// Generate AI response using OpenAI
const generateAIResponse = async (service, query, context) => {
  if (!openai) {
    return generateRuleBasedResponse(service, query, context);
  }

  try {
    const serviceContext = {
      ilawyer: 'You are an AI legal assistant for CrownWorksNL iLawyer service. Help with legal questions, document preparation, and business compliance.',
      provet: 'You are an AI veterinary assistant for CrownWorksNL ProVet service. Help with pet health, veterinary consultations, and practice management.',
      business: 'You are a business consultant for CrownWorksNL. Help with business strategy, growth planning, and revenue optimization.',
      creative: 'You are a creative consultant for CrownWorksNL Brand & Creative service. Help with brand identity, design, and marketing materials.'
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${serviceContext[service] || serviceContext.business} Keep responses helpful, professional, and under 200 words. Always end by suggesting they contact us for more information.`
        },
        {
          role: 'user',
          content: query
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiMessage = completion.choices[0]?.message?.content || 'I can help with that. Please contact us for more information.';

    return {
      message: aiMessage,
      action: 'contact',
      service: service === 'ilawyer' ? 'iLawyer' : 
               service === 'provet' ? 'ProVet' :
               service === 'business' ? 'Business Consulting' : 'Brand & Creative'
    };
  } catch (error) {
    console.error('OpenAI error:', error);
    // Fallback to rule-based
    return generateRuleBasedResponse(service, query, context);
  }
};

export async function POST(request) {
  try {
    const { query, context = {} } = await request.json();
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }
    
    // Route to appropriate service
    const service = routeToService(query, context);
    
    // Generate response (AI-powered if OpenAI configured, otherwise rule-based)
    const response = await generateAIResponse(service, query, context);
    
    // Track usage (in production, save to database)
    // await trackUsage(service, query, context);
    
    return NextResponse.json({
      success: true,
      service: response.service,
      message: response.message,
      action: response.action,
      suggestedActions: [
        {
          label: 'Get Started',
          action: 'contact',
          href: '#contact'
        },
        {
          label: 'Learn More',
          action: 'info',
          href: `#${service}`
        }
      ]
    });
    
  } catch (error) {
    console.error('AI Agent error:', error);
    return NextResponse.json(
      { error: 'Failed to process query', message: error.message },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'CrownWorks AI Agent',
    version: '1.0.0',
    services: ['ilawyer', 'provet', 'business', 'creative']
  });
}

