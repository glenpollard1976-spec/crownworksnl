"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, CheckCircle2, ArrowRight, FileText, TrendingUp, Target, Zap, Clock, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const fade = { 
  hidden: { opacity: 0, y: 12 }, 
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } 
};

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={fade}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const quizQuestions = [
  {
    id: 1,
    question: "What is your primary business goal with automation?",
    options: [
      "Reduce operational costs",
      "Increase productivity",
      "Improve accuracy",
      "Scale operations"
    ]
  },
  {
    id: 2,
    question: "How many employees does your business have?",
    options: [
      "1-10 employees",
      "11-50 employees",
      "51-200 employees",
      "200+ employees"
    ]
  },
  {
    id: 3,
    question: "What is your current automation level?",
    options: [
      "No automation (0%)",
      "Basic automation (1-25%)",
      "Moderate automation (26-50%)",
      "Advanced automation (51%+)"
    ]
  },
  {
    id: 4,
    question: "What is your biggest automation challenge?",
    options: [
      "Not sure where to start",
      "Lack of technical expertise",
      "Budget constraints",
      "Change management"
    ]
  }
];

const caseStudies = [
  {
    company: "TechStart Inc.",
    industry: "SaaS",
    employees: 25,
    savings: "$125,000/year",
    automation: "Customer support, data entry, reporting",
    timeline: "3 months"
  },
  {
    company: "RetailPro Solutions",
    industry: "E-commerce",
    employees: 50,
    savings: "$200,000/year",
    automation: "Inventory management, order processing, email marketing",
    timeline: "4 months"
  },
  {
    company: "ServiceCo",
    industry: "Professional Services",
    employees: 15,
    savings: "$75,000/year",
    automation: "Scheduling, invoicing, client communication",
    timeline: "2 months"
  }
];

export default function ImplementationGuidePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion + 1]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateRecommendations(newAnswers);
      setQuizComplete(true);
    }
  };

  const generateRecommendations = (allAnswers) => {
    // Simple recommendation logic based on answers
    const recs = {
      priority: [],
      timeline: "3-6 months",
      estimatedSavings: "$50,000 - $150,000/year",
      nextSteps: []
    };

    if (allAnswers[2]?.includes("1-10")) {
      recs.priority.push("Start with customer communication automation");
      recs.priority.push("Implement basic workflow automation");
      recs.nextSteps.push("Set up email automation");
      recs.nextSteps.push("Automate scheduling and booking");
    } else if (allAnswers[2]?.includes("11-50")) {
      recs.priority.push("Focus on process automation");
      recs.priority.push("Implement data management automation");
      recs.nextSteps.push("Automate reporting and analytics");
      recs.nextSteps.push("Set up CRM automation");
    } else {
      recs.priority.push("Enterprise-level automation strategy");
      recs.priority.push("Cross-department workflow automation");
      recs.nextSteps.push("Implement API integrations");
      recs.nextSteps.push("Build custom automation solutions");
    }

    setRecommendations(recs);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setQuizComplete(false);
    setRecommendations(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/90 border-b border-purple-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-semibold no-underline group">
              <Crown className="w-6 h-6 text-purple-600 group-hover:text-purple-700" />
              <span className="text-purple-600">CrownWorksNL</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/ai-toolkit" className="text-sm text-zinc-600 hover:text-purple-600">ROI Calculator</Link>
              <Link href="/learning-center" className="text-sm text-zinc-600 hover:text-purple-600">Learning Centre</Link>
              <Link href="/ai-toolkit/guide" className="text-sm text-purple-600 font-medium">Implementation Guide</Link>
              <Link href="/ai-toolkit/pricing" className="text-sm text-zinc-600 hover:text-purple-600">Pricing</Link>
              <Link href="/">
                <Button className="rounded-2xl bg-purple-600 hover:bg-purple-700 text-white">
                  Back to Home
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="w-[50rem] h-[50rem] rounded-full bg-purple-200/40 blur-3xl absolute -top-40 -right-32" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 mb-4 border border-purple-200/50">
              <FileText className="w-4 h-4 text-purple-600" />
              <span className="font-medium">Implementation Guide</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
              Your AI Automation Roadmap
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Take our quick assessment to get a personalized implementation plan tailored to your business needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quiz Section */}
      {!quizComplete ? (
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <AnimatedSection>
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl">Business Readiness Assessment</CardTitle>
                    <span className="text-sm text-zinc-500">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(option)}
                        className="w-full text-left p-4 rounded-lg border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50 transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>
      ) : (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <AnimatedSection>
              <Card className="border-2 border-purple-500 shadow-xl bg-gradient-to-br from-purple-50 to-white mb-8">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-8 h-8 text-purple-600" />
                    <CardTitle className="text-2xl">Your Personalized Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {recommendations && (
                    <>
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Priority Actions</h3>
                        <ul className="space-y-2">
                          {recommendations.priority.map((action, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <div className="text-sm text-zinc-600 mb-1">Estimated Timeline</div>
                          <div className="text-xl font-bold text-purple-600">{recommendations.timeline}</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <div className="text-sm text-zinc-600 mb-1">Potential Savings</div>
                          <div className="text-xl font-bold text-purple-600">{recommendations.estimatedSavings}</div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Next Steps</h3>
                        <ul className="space-y-2">
                          {recommendations.nextSteps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Link href="/ai-toolkit/pricing">
                          <Button className="rounded-2xl bg-purple-600 hover:bg-purple-700 text-white">
                            Get Your Toolkit
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          onClick={resetQuiz}
                          className="rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                        >
                          Retake Assessment
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              See how businesses like yours achieved incredible results with AI automation
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, i) => (
              <AnimatedSection key={i}>
                <Card className="h-full border-purple-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{study.company}</CardTitle>
                    <p className="text-sm text-zinc-500">{study.industry} • {study.employees} employees</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="text-sm text-zinc-600 mb-1">Annual Savings</div>
                      <div className="text-2xl font-bold text-purple-600">{study.savings}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Automated:</div>
                      <p className="text-sm text-zinc-600">{study.automation}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <Clock className="w-4 h-4" />
                      <span>Timeline: {study.timeline}</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Crown className="w-6 h-6 text-purple-500" />
              <span className="text-white font-semibold">CrownWorksNL</span>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} CrownWorksNL. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

