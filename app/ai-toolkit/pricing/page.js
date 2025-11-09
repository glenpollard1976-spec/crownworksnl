"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, CheckCircle2, ArrowRight, Users, Zap, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const fade = { 
  hidden: { opacity: 0, y: 12 }, 
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } 
};

const pricingTiers = [
  {
    name: "Solo",
    price: 37,
    teamSize: "1-5 employees",
    description: "Perfect for solo entrepreneurs and small teams",
    features: [
      "ROI Calculator (Excel)",
      "25-page Implementation Guide",
      "Quick-Start Checklist",
      "5 Case Studies",
      "Email Support"
    ],
    popular: false
  },
  {
    name: "Team",
    price: 67,
    teamSize: "6-20 employees",
    description: "Ideal for growing teams and departments",
    features: [
      "Everything in Solo",
      "Team Templates (5+ templates)",
      "Advanced Case Studies (10+)",
      "Priority Email Support",
      "1-on-1 Setup Call (30 min)"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: 147,
    teamSize: "21+ employees",
    description: "Complete solution for large organizations",
    features: [
      "Everything in Team",
      "Custom Implementation Plan",
      "Unlimited Case Studies",
      "Priority Support (24/7)",
      "1-on-1 Strategy Session (60 min)",
      "Custom ROI Templates"
    ],
    popular: false
  }
];

export default function PricingPage() {
  const [loadingCheckout, setLoadingCheckout] = useState({});
  const [teamSize, setTeamSize] = useState(10);

  const handleCheckout = async (tier) => {
    if (loadingCheckout[tier.name]) return;
    
    setLoadingCheckout(prev => ({ ...prev, [tier.name]: true }));

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageName: `AI Automation Toolkit - ${tier.name}`,
          amount: tier.price,
          isRecurring: false
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMsg = data.error || data.details || 'Payment system error';
        alert(`❌ Payment Error\n\n${errorMsg}\n\nPlease contact us at crownworksnl@gmail.com`);
        setLoadingCheckout(prev => ({ ...prev, [tier.name]: false }));
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`❌ Unable to start checkout\n\n${error.message}\n\nPlease contact us at crownworksnl@gmail.com`);
      setLoadingCheckout(prev => ({ ...prev, [tier.name]: false }));
    }
  };

  const calculateRecommendedTier = () => {
    if (teamSize <= 5) return pricingTiers[0];
    if (teamSize <= 20) return pricingTiers[1];
    return pricingTiers[2];
  };

  const recommendedTier = calculateRecommendedTier();

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
              <Link href="/ai-toolkit/guide" className="text-sm text-zinc-600 hover:text-purple-600">Implementation Guide</Link>
              <Link href="/ai-toolkit/pricing" className="text-sm text-purple-600 font-medium">Pricing</Link>
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
          <motion.div 
            variants={fade}
            initial="hidden"
            animate="show"
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 mb-4 border border-purple-200/50">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="font-medium">Choose Your Plan</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your team size. All plans include lifetime access and updates.
            </p>
          </motion.div>

          {/* Team Size Calculator */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            className="max-w-md mx-auto mb-12"
          >
            <Card className="border-purple-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-purple-600" />
                  <label className="font-medium">Your Team Size</label>
                </div>
                <input
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                  min="1"
                  className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-2"
                />
                <p className="text-sm text-zinc-500">
                  Recommended: <span className="font-semibold text-purple-600">{recommendedTier.name} Plan</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                animate="show"
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full relative border-2 ${
                  tier.popular 
                    ? 'border-purple-500 shadow-xl scale-105' 
                    : 'border-purple-200'
                }`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-purple-600">${tier.price}</span>
                      <span className="text-zinc-600 ml-2">one-time</span>
                    </div>
                    <p className="text-sm text-zinc-600 mb-2">{tier.teamSize}</p>
                    <p className="text-sm text-zinc-500">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleCheckout(tier)}
                      disabled={loadingCheckout[tier.name]}
                      className={`w-full rounded-2xl ${
                        tier.popular
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-2 border-purple-600'
                      } py-6 text-lg font-semibold disabled:opacity-50`}
                    >
                      {loadingCheckout[tier.name] ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="loading-spinner" aria-hidden="true"></span>
                          Processing...
                        </span>
                      ) : (
                        <>
                          Get {tier.name} Plan
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Toolkit?</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Everything you need to implement AI automation and start saving immediately
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Proven ROI",
                desc: "Average 340% ROI within 6 months"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Quick Setup",
                desc: "Get started in minutes, not weeks"
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Lifetime Access",
                desc: "All updates and new content included"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center border-purple-100 h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-zinc-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-lg text-purple-100 mb-8">
              Not satisfied? Get a full refund, no questions asked. We're confident you'll love it.
            </p>
            <Link href="/ai-toolkit">
              <Button className="rounded-2xl bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg font-semibold">
                Try the ROI Calculator First
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
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

