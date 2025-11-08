import { NextResponse } from 'next/server';

/**
 * Business Audit AI Agent API
 * Generates comprehensive business audit reports
 * Ready to sell - $99-$299 per audit
 */

// Initialize OpenAI (optional - has intelligent fallback)
let openai = null;
try {
  if (process.env.OPENAI_API_KEY) {
    const OpenAI = require('openai').default;
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
} catch (error) {
  console.log('OpenAI not configured, using intelligent rule-based audit generation');
}

// Business audit categories and scoring
const auditCategories = {
  marketing: {
    name: 'Marketing & Branding',
    weight: 0.25,
    questions: [
      'Do you have a clear brand identity?',
      'Is your website professional and up-to-date?',
      'Do you have active social media presence?',
      'Do you track marketing ROI?',
      'Do you have a content marketing strategy?'
    ]
  },
  operations: {
    name: 'Operations & Efficiency',
    weight: 0.20,
    questions: [
      'Are your business processes documented?',
      'Do you use automation tools?',
      'Is your team productive and efficient?',
      'Do you have systems for customer management?',
      'Are you tracking key performance metrics?'
    ]
  },
  financial: {
    name: 'Financial Health',
    weight: 0.25,
    questions: [
      'Do you have clear financial goals?',
      'Are you tracking revenue and expenses?',
      'Do you have a pricing strategy?',
      'Are you managing cash flow effectively?',
      'Do you have financial projections?'
    ]
  },
  growth: {
    name: 'Growth & Strategy',
    weight: 0.30,
    questions: [
      'Do you have a clear business plan?',
      'Have you identified your target market?',
      'Do you have competitive advantages?',
      'Are you planning for growth?',
      'Do you have scalable systems?'
    ]
  }
};

// Generate audit score
const calculateAuditScore = (responses) => {
  let totalScore = 0;
  let categoryScores = {};
  
  Object.keys(auditCategories).forEach(category => {
    const categoryData = auditCategories[category];
    const categoryResponses = responses[category] || {};
    let categoryScore = 0;
    let answeredQuestions = 0;
    
    categoryData.questions.forEach((question, index) => {
      const response = categoryResponses[index];
      if (response !== undefined) {
        answeredQuestions++;
        categoryScore += response === 'yes' ? 1 : response === 'partial' ? 0.5 : 0;
      }
    });
    
    const categoryPercentage = answeredQuestions > 0 
      ? (categoryScore / answeredQuestions) * 100 
      : 0;
    
    categoryScores[category] = {
      score: categoryPercentage,
      weight: categoryData.weight,
      name: categoryData.name
    };
    
    totalScore += categoryPercentage * categoryData.weight;
  });
  
  return {
    overall: Math.round(totalScore),
    categories: categoryScores
  };
};

// Generate recommendations based on scores
const generateRecommendations = (scores) => {
  const recommendations = [];
  const priorityActions = [];
  
  Object.keys(scores.categories).forEach(category => {
    const categoryScore = scores.categories[category];
    
    if (categoryScore.score < 60) {
      recommendations.push({
        category: categoryScore.name,
        priority: 'high',
        score: categoryScore.score,
        actions: getCategoryRecommendations(category, categoryScore.score)
      });
    } else if (categoryScore.score < 80) {
      recommendations.push({
        category: categoryScore.name,
        priority: 'medium',
        score: categoryScore.score,
        actions: getCategoryRecommendations(category, categoryScore.score)
      });
    }
  });
  
  // Sort by priority and score
  recommendations.sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (a.priority !== 'high' && b.priority === 'high') return 1;
    return a.score - b.score;
  });
  
  // Get top 5 priority actions
  recommendations.slice(0, 3).forEach(rec => {
    priorityActions.push(...rec.actions.slice(0, 2));
  });
  
  return {
    recommendations: recommendations.slice(0, 5),
    priorityActions: priorityActions.slice(0, 5)
  };
};

// Get category-specific recommendations
const getCategoryRecommendations = (category, score) => {
  const recommendations = {
    marketing: [
      'Develop a clear brand identity and messaging strategy',
      'Create or update your professional website',
      'Establish consistent social media presence',
      'Implement marketing analytics and tracking',
      'Develop a content marketing calendar'
    ],
    operations: [
      'Document your key business processes',
      'Implement automation tools for repetitive tasks',
      'Create standard operating procedures (SOPs)',
      'Set up customer relationship management (CRM) system',
      'Establish key performance indicators (KPIs)'
    ],
    financial: [
      'Create clear financial goals and budgets',
      'Set up proper accounting and bookkeeping systems',
      'Review and optimize your pricing strategy',
      'Implement cash flow forecasting',
      'Develop financial projections for next 12 months'
    ],
    growth: [
      'Create or update your business plan',
      'Clearly define your target market and customer personas',
      'Identify and document your competitive advantages',
      'Develop a growth strategy and roadmap',
      'Build scalable systems and processes'
    ]
  };
  
  return recommendations[category] || [];
};

// Generate AI-powered audit report
const generateAIReport = async (responses, businessInfo, scores, recommendations) => {
  if (!openai) {
    return generateRuleBasedReport(responses, businessInfo, scores, recommendations);
  }
  
  try {
    const prompt = `You are an expert business consultant creating a comprehensive business audit report.

Business Information:
- Name: ${businessInfo.name || 'Not provided'}
- Industry: ${businessInfo.industry || 'Not provided'}
- Size: ${businessInfo.size || 'Not provided'}

Audit Scores:
${Object.keys(scores.categories).map(cat => 
  `- ${scores.categories[cat].name}: ${scores.categories[cat].score}%`
).join('\n')}
Overall Score: ${scores.overall}%

Key Recommendations:
${recommendations.priorityActions.map((action, i) => `${i + 1}. ${action}`).join('\n')}

Create a professional, actionable business audit report with:
1. Executive Summary (2-3 paragraphs)
2. Overall Assessment (1 paragraph)
3. Category Analysis (brief analysis of each category)
4. Top 5 Priority Actions (detailed, actionable steps)
5. Growth Opportunities (2-3 opportunities)
6. Next Steps (clear action plan)

Keep it professional, encouraging, and actionable. Total length: 800-1200 words.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert business consultant specializing in business audits and growth strategies. Write clear, actionable, professional reports.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });
    
    return completion.choices[0]?.message?.content || generateRuleBasedReport(responses, businessInfo, scores, recommendations);
  } catch (error) {
    console.error('OpenAI error:', error);
    return generateRuleBasedReport(responses, businessInfo, scores, recommendations);
  }
};

// Generate rule-based report (fallback)
const generateRuleBasedReport = (responses, businessInfo, scores, recommendations) => {
  const report = {
    executiveSummary: `This business audit reveals an overall score of ${scores.overall}%, indicating ${scores.overall >= 70 ? 'strong' : scores.overall >= 50 ? 'moderate' : 'significant opportunities for improvement'} in your business operations. The audit evaluated four key areas: Marketing & Branding, Operations & Efficiency, Financial Health, and Growth & Strategy.`,
    
    overallAssessment: `Your business shows ${scores.overall >= 70 ? 'strong fundamentals with room for optimization' : scores.overall >= 50 ? 'a solid foundation with clear areas for improvement' : 'significant opportunities to strengthen core business functions'}. The analysis identifies specific actionable steps to drive growth and improve operational efficiency.`,
    
    categoryAnalysis: Object.keys(scores.categories).map(category => {
      const cat = scores.categories[category];
      return {
        category: cat.name,
        score: cat.score,
        assessment: cat.score >= 80 
          ? 'Excellent - This area is well-developed and functioning effectively.'
          : cat.score >= 60
          ? 'Good - This area is solid but has room for improvement.'
          : cat.score >= 40
          ? 'Needs Improvement - This area requires attention and strategic focus.'
          : 'Critical - This area needs immediate attention and development.'
      };
    }),
    
    priorityActions: recommendations.priorityActions,
    
    growthOpportunities: [
      'Leverage digital marketing to expand your customer base',
      'Implement automation to improve operational efficiency',
      'Develop strategic partnerships to accelerate growth'
    ],
    
    nextSteps: [
      'Review this audit report with your team',
      'Prioritize the top 3 recommendations',
      'Create an action plan with timelines',
      'Schedule a follow-up consultation to discuss implementation'
    ]
  };
  
  return report;
};

// Format report for response
const formatReport = (report, scores, recommendations) => {
  return {
    executiveSummary: typeof report === 'string' ? report : report.executiveSummary,
    overallAssessment: typeof report === 'string' ? report : report.overallAssessment,
    categoryAnalysis: typeof report === 'string' ? [] : report.categoryAnalysis,
    priorityActions: recommendations.priorityActions,
    growthOpportunities: typeof report === 'string' ? [] : report.growthOpportunities,
    nextSteps: typeof report === 'string' ? [] : report.nextSteps,
    scores: scores,
    generatedAt: new Date().toISOString()
  };
};

export async function POST(request) {
  try {
    const { responses, businessInfo = {} } = await request.json();
    
    if (!responses || Object.keys(responses).length === 0) {
      return NextResponse.json(
        { error: 'Audit responses are required' },
        { status: 400 }
      );
    }
    
    // Calculate scores
    const scores = calculateAuditScore(responses);
    
    // Generate recommendations
    const recommendations = generateRecommendations(scores);
    
    // Generate report
    const report = await generateAIReport(responses, businessInfo, scores, recommendations);
    
    // Format final report
    const finalReport = formatReport(report, scores, recommendations);
    
    return NextResponse.json({
      success: true,
      report: finalReport,
      scores: scores,
      recommendations: recommendations
    });
    
  } catch (error) {
    console.error('Business Audit Agent error:', error);
    return NextResponse.json(
      { error: 'Failed to generate audit report', message: error.message },
      { status: 500 }
    );
  }
}

// Get audit categories (for questionnaire)
export async function GET() {
  return NextResponse.json({
    success: true,
    categories: Object.keys(auditCategories).map(key => ({
      id: key,
      name: auditCategories[key].name,
      weight: auditCategories[key].weight,
      questions: auditCategories[key].questions
    }))
  });
}

