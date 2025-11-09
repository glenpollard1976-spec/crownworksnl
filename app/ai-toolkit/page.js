"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Sparkles, TrendingUp, DollarSign, Clock, Users, ArrowRight, CheckCircle2, Download, Calculator, Zap, Target, BarChart3, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// CrownworksNL Purple Palette
const PURPLE = {
  crown: "#6B46C1",      // Royal authority
  electric: "#8B5CF6",   // Dynamic learning
  mentor: "#A78BFA",     // Nurturing wisdom
  foundation: "#4C1D95", // Solid base
  gold: "#F59E0B"        // Success accent
};

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

export default function AIToolkitPage() {
  const [inputs, setInputs] = useState({
    employees: 10,
    avgSalary: 50000,
    hoursPerWeek: 40,
    errorRate: 5,
    currentAutomation: 20
  });

  const [results, setResults] = useState({
    annualSavings: 0,
    monthlySavings: 0,
    timeSaved: 0,
    errorReduction: 0,
    roi: 0,
    paybackPeriod: 0
  });

  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const calculateROI = () => {
    const {
      employees,
      avgSalary,
      hoursPerWeek,
      errorRate,
      currentAutomation
    } = inputs;

    // Calculate potential automation percentage (max 80%)
    const potentialAutomation = Math.min(80, currentAutomation + 40);
    const automationIncrease = potentialAutomation - currentAutomation;

    // Time savings calculation
    const weeklyHours = employees * hoursPerWeek;
    const annualHours = weeklyHours * 52;
    const automatableHours = (annualHours * automationIncrease) / 100;
    const timeSaved = automatableHours;

    // Cost savings (assuming 30% of time saved = cost savings)
    const costPerHour = avgSalary / (hoursPerWeek * 52);
    const annualSavings = timeSaved * costPerHour * 0.3;

    // Error reduction savings (assuming errors cost 2x time to fix)
    const currentErrors = (annualHours * errorRate) / 100;
    const errorReduction = currentErrors * 0.5; // 50% reduction
    const errorSavings = errorReduction * costPerHour * 2;

    // Total savings
    const totalSavings = annualSavings + errorSavings;
    const monthlySavings = totalSavings / 12;

    // ROI calculation (assuming $37 toolkit cost)
    const toolkitCost = 37;
    const roi = ((totalSavings - toolkitCost) / toolkitCost) * 100;

    // Payback period (months)
    const paybackPeriod = toolkitCost / monthlySavings;

    setResults({
      annualSavings: totalSavings,
      monthlySavings: monthlySavings,
      timeSaved: timeSaved,
      errorReduction: errorReduction,
      roi: roi,
      paybackPeriod: paybackPeriod
    });

    if (totalSavings > 0) {
      setShowChart(true);
    }
  };

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(num);
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
              <Link href="/ai-toolkit" className="text-sm text-purple-600 font-medium">ROI Calculator</Link>
              <Link href="/learning-center" className="text-sm text-zinc-600 hover:text-purple-600">Learning Centre</Link>
              <Link href="/ai-toolkit/guide" className="text-sm text-zinc-600 hover:text-purple-600">Implementation Guide</Link>
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
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="font-medium">AI Automation ROI Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
              Calculate Your Automation ROI
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-8">
              Discover how much time and money you can save with AI automation. Get instant, personalized ROI calculations for your business.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <AnimatedSection>
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-6 h-6 text-purple-600" />
                    <CardTitle className="text-2xl">Your Business Metrics</CardTitle>
                  </div>
                  <p className="text-sm text-zinc-600">Enter your current business numbers to see potential savings</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      value={inputs.employees}
                      onChange={(e) => handleInputChange('employees', e.target.value)}
                      className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Average Annual Salary (USD)
                    </label>
                    <input
                      type="number"
                      value={inputs.avgSalary}
                      onChange={(e) => handleInputChange('avgSalary', e.target.value)}
                      className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Hours Worked Per Week
                    </label>
                    <input
                      type="number"
                      value={inputs.hoursPerWeek}
                      onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                      className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      min="1"
                      max="80"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Current Error Rate (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.errorRate}
                      onChange={(e) => handleInputChange('errorRate', e.target.value)}
                      className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Current Automation Level (%)
                    </label>
                    <input
                      type="number"
                      value={inputs.currentAutomation}
                      onChange={(e) => handleInputChange('currentAutomation', e.target.value)}
                      className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      min="0"
                      max="80"
                    />
                    <p className="text-xs text-zinc-500 mt-1">How much of your work is currently automated?</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Results Panel */}
            <AnimatedSection>
              <Card className="border-2 border-purple-500 shadow-xl bg-gradient-to-br from-purple-50 to-white">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                    <CardTitle className="text-2xl">Your ROI Results</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <div className="text-sm text-zinc-600 mb-1">Annual Savings</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(results.annualSavings)}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <div className="text-sm text-zinc-600 mb-1">Monthly Savings</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(results.monthlySavings)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg">
                    <div className="text-sm opacity-90 mb-1">Return on Investment</div>
                    <div className="text-4xl font-bold mb-2">
                      {formatNumber(results.roi)}%
                    </div>
                    <div className="text-sm opacity-90">
                      Payback in {formatNumber(results.paybackPeriod)} months
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium">Time Saved Annually</span>
                      </div>
                      <span className="font-bold text-purple-600">
                        {formatNumber(results.timeSaved)} hours
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium">Errors Reduced</span>
                      </div>
                      <span className="font-bold text-purple-600">
                        {formatNumber(results.errorReduction)} hours/year
                      </span>
                    </div>
                  </div>

                  {results.annualSavings > 0 && (
                    <Link href="/ai-toolkit/pricing">
                      <Button className="w-full rounded-2xl bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg">
                        Get Your AI Toolkit Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What's Included in Your Toolkit</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Everything you need to implement AI automation and start saving time and money today.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Calculator className="w-6 h-6" />,
                title: "ROI Calculator",
                desc: "Interactive Excel calculator with pre-built formulas for instant ROI calculations"
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Implementation Guide",
                desc: "25-page comprehensive guide with real case studies and step-by-step instructions"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Quick-Start Checklist",
                desc: "Get started in minutes with our proven checklist for immediate automation wins"
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "Case Studies",
                desc: "Real examples from businesses that saved $50K+ annually with automation"
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Team Templates",
                desc: "Ready-to-use templates for different team sizes and industries"
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Best Practices",
                desc: "Learn from industry experts and avoid common automation pitfalls"
              }
            ].map((feature, i) => (
              <AnimatedSection key={i}>
                <Card className="h-full hover:shadow-lg transition-shadow border-purple-100">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-purple-100 mb-8">
              Join hundreds of businesses already saving time and money with AI automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-toolkit/pricing">
                <Button className="rounded-2xl bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg font-semibold">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/learning-center">
                <Button className="rounded-2xl border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
          </AnimatedSection>
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

