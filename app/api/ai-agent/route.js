import { NextResponse } from 'next/server';

/**
 * CrownWorks AI Agent API
 * Unified AI assistant that routes to appropriate services
 */

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

// Service-specific response generators
const generateResponse = async (service, query, context) => {
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
    
    // Generate response
    const response = await generateResponse(service, query, context);
    
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

