import { NextResponse } from 'next/server';

/**
 * CrownWorks AI Agent API
 * Unified AI assistant that routes to appropriate services
 * Now supports multiple LLM providers: OpenAI, Anthropic Claude, Google Gemini
 */

// Try to use multi-LLM provider system, fallback to OpenAI-only
let useMultiLLM = false;
let llmProviders = null;

try {
  llmProviders = require('../../lib/llm-providers');
  useMultiLLM = true;
  console.log('✅ Multi-LLM provider system loaded');
} catch (error) {
  console.log('⚠️ Multi-LLM system not available, using OpenAI-only mode');
}

// Fallback: Initialize OpenAI (optional - falls back to rule-based if not configured)
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
  
  // Legal keywords (expanded)
  const legalKeywords = [
    'legal', 'law', 'contract', 'agreement', 'compliance', 'lawsuit', 'attorney', 'lawyer', 
    'document', 'legal document', 'nda', 'non-disclosure', 'employment contract', 'lease',
    'partnership', 'incorporation', 'corporate', 'trademark', 'copyright', 'intellectual property',
    'liability', 'risk', 'litigation', 'dispute', 'settlement', 'terms of service', 'privacy policy',
    'terms and conditions', 'service agreement', 'consulting agreement', 'vendor agreement',
    'commercial lease', 'real estate', 'business formation', 'corporate law', 'hr policy',
    'employment law', 'labor law', 'regulatory', 'compliance', 'legal advice', 'legal question'
  ];
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
      message: `I'm your AI legal assistant for iLawyer by CrownWorksNL. I specialize in Canadian business law, contracts, and compliance.

I can help you with:
📄 **Contract Services**
- Drafting employment contracts, service agreements, NDAs
- Reviewing existing contracts for risks
- Partnership and shareholder agreements

🏢 **Business Law**
- Business formation and incorporation
- Corporate compliance and governance
- Commercial leases and real estate

⚖️ **Legal Compliance**
- Employment law and HR policies
- Industry-specific regulations
- Risk assessment and mitigation

💼 **Intellectual Property**
- Trademark and copyright guidance
- IP protection strategies

What legal matter can I help you with today? Ask me anything about contracts, business law, compliance, or legal documents.`,
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

// Generate AI response using multi-LLM system or OpenAI fallback
const generateAIResponse = async (service, query, context) => {
  // Service-specific context
  const serviceContext = {
    ilawyer: `You are an expert AI legal assistant for CrownWorksNL iLawyer service, specializing in Canadian law (particularly Newfoundland & Labrador), business law, contracts, and compliance.

Your expertise includes:
- Contract drafting and review (employment, service, partnership, NDAs)
- Business formation and corporate law
- Employment law and HR compliance
- Intellectual property (trademarks, copyrights)
- Commercial leases and real estate
- Regulatory compliance (industry-specific)
- Legal document preparation
- Risk assessment and mitigation

Guidelines:
- Provide practical, actionable legal advice
- Reference relevant Canadian/NL legal frameworks when applicable
- Explain legal concepts in clear, understandable language
- Identify potential legal risks and suggest solutions
- Always recommend consulting with a licensed attorney for complex matters
- Be professional, thorough, and helpful

When users ask legal questions, provide specific, detailed answers with relevant legal considerations. For document requests, explain what documents they need and key provisions to include.`,
    provet: 'You are an AI veterinary assistant for CrownWorksNL ProVet service. Help with pet health, veterinary consultations, and practice management.',
    business: 'You are a business consultant for CrownWorksNL. Help with business strategy, growth planning, and revenue optimization.',
    creative: 'You are a creative consultant for CrownWorksNL Brand & Creative service. Help with brand identity, design, and marketing materials.'
  };

  const systemPrompt = `${serviceContext[service] || serviceContext.business} 

${service === 'ilawyer' 
  ? 'Provide detailed, comprehensive legal guidance. Be thorough and specific. Explain legal concepts clearly. Include relevant considerations and potential risks. Keep responses between 200-400 words for complex questions, or 100-200 words for simple queries. Always end by suggesting they contact us for document preparation or complex legal matters.'
  : 'Keep responses helpful, professional, and under 200 words. Always end by suggesting they contact us for more information.'}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: query }
  ];

  const options = {
    maxTokens: service === 'ilawyer' ? 500 : 300,
    temperature: service === 'ilawyer' ? 0.3 : 0.7
  };

  // Try multi-LLM system first
  if (useMultiLLM && llmProviders) {
    try {
      const result = await llmProviders.generateWithFallback(service, query, messages, options);
      
      return {
        message: result.response || 'I can help with that. Please contact us for more information.',
        action: 'contact',
        service: service === 'ilawyer' ? 'iLawyer' : 
                 service === 'provet' ? 'ProVet' :
                 service === 'business' ? 'Business Consulting' : 'Brand & Creative',
        provider: result.provider,
        model: result.model
      };
    } catch (error) {
      console.error('Multi-LLM error:', error);
      // Fall through to OpenAI fallback
    }
  }

  // Fallback to OpenAI-only mode
  if (!openai) {
    return generateRuleBasedResponse(service, query, context);
  }

  try {
    const model = service === 'ilawyer' ? 'gpt-4' : 'gpt-3.5-turbo';
    
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      max_tokens: options.maxTokens,
      temperature: options.temperature,
    });

    const aiMessage = completion.choices[0]?.message?.content || 'I can help with that. Please contact us for more information.';

    return {
      message: aiMessage,
      action: 'contact',
      service: service === 'ilawyer' ? 'iLawyer' : 
               service === 'provet' ? 'ProVet' :
               service === 'business' ? 'Business Consulting' : 'Brand & Creative',
      provider: 'OpenAI',
      model: model
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
  const providers = useMultiLLM && llmProviders 
    ? llmProviders.getAvailableProviders().map(p => ({ name: p.name, models: p.models.length }))
    : openai ? [{ name: 'OpenAI', models: 2 }] : [];
  
  return NextResponse.json({
    status: 'online',
    service: 'CrownWorks AI Agent',
    version: '2.0.0',
    services: ['ilawyer', 'provet', 'business', 'creative'],
    providers: providers,
    multiLLM: useMultiLLM
  });
}

