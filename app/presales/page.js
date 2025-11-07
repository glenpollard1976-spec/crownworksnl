"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, CheckCircle2, Zap, TrendingUp, Users, Clock, Star, ArrowRight, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PRESALES_TIERS = [
  {
    id: 'founder',
    name: 'Founder',
    price: 4999,
    originalPrice: 9999,
    savings: 5000,
    spots: 50,
    features: [
      'Lifetime access to all features',
      'Unlimited AI interactions forever',
      'All services included (iLawyer, ProVet, Business, Creative)',
      'Priority support forever',
      'White-label option',
      'API access',
      'Custom AI training',
      'Reseller rights',
      'Founder badge & recognition',
      'Early access to all new features'
    ],
    value: '$120,000+',
    popular: true
  },
  {
    id: 'pioneer',
    name: 'Pioneer',
    price: 1999,
    originalPrice: 4999,
    savings: 3000,
    spots: 100,
    features: [
      '3 years of Enterprise access',
      'Unlimited AI interactions',
      'All services included',
      'Priority support',
      'White-label option',
      'API access',
      'Custom workflows',
      'Early access to new features'
    ],
    value: '$72,000+',
    popular: false
  },
  {
    id: 'early',
    name: 'Early Adopter',
    price: 999,
    originalPrice: 1999,
    savings: 1000,
    spots: 200,
    features: [
      '2 years of Professional access',
      '2,500 AI interactions/month',
      'All services included',
      'Priority support',
      'Custom integrations',
      'Early feature access'
    ],
    value: '$24,000+',
    popular: false
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 499,
    originalPrice: 999,
    savings: 500,
    spots: 500,
    features: [
      '1 year of Professional access',
      '2,500 AI interactions/month',
      'All services included',
      'Email support',
      'Standard features'
    ],
    value: '$6,000+',
    popular: false
  }
];

const STATS = [
  { label: 'Presales Goal', value: '$1,000,000', icon: TrendingUp },
  { label: 'Early Adopters', value: '850+', icon: Users },
  { label: 'Days Left', value: '14', icon: Clock },
  { label: 'Spots Remaining', value: '850', icon: Star }
];

export default function PresalesPage() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handlePresale = async (tier) => {
    // Track presale interest
    if (email) {
      // In production, save to database
      console.log('Presale interest:', { tier, email, name });
    }
    
    // Redirect to checkout
    window.location.href = `/api/checkout?tier=${tier.id}&amount=${tier.price}&presale=true`;
  };

  const totalValue = PRESALES_TIERS.reduce((sum, tier) => {
    return sum + (tier.spots * tier.price);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Limited Time Presales - 50% OFF</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent">
              CrownWorks AI Agent Platform
            </h1>
            
            <p className="text-2xl md:text-3xl text-indigo-100 mb-4">
              The Future of Business AI is Here
            </p>
            
            <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
              Get lifetime access to the unified AI platform that integrates iLawyer, ProVet, Business Consulting, and Creative Services. 
              <span className="font-bold text-yellow-400"> Save up to $5,000</span> with presales pricing.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              {STATS.map((stat, i) => (
                <Card key={i} className="bg-white/10 backdrop-blur border-white/20">
                  <CardContent className="pt-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-indigo-200">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Urgency Banner */}
            <div className="bg-red-600/20 border-2 border-red-500 rounded-2xl p-6 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="font-bold text-lg">Limited Time Offer</span>
              </div>
              <p className="text-indigo-100">
                Only <span className="font-bold text-yellow-400">850 spots</span> available at presales pricing. 
                Once sold out, prices increase by 50-100%. Lock in your savings today!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Choose Your Presales Tier
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRESALES_TIERS.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`h-full flex flex-col bg-white/10 backdrop-blur border-2 ${
                  tier.popular 
                    ? 'border-yellow-400 shadow-2xl shadow-yellow-400/50 scale-105' 
                    : 'border-white/20'
                }`}>
                  {tier.popular && (
                    <div className="bg-yellow-400 text-indigo-900 text-center py-2 font-bold">
                      ⭐ MOST POPULAR ⭐
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                    <div className="mb-4">
                      <div className="text-4xl font-bold">${tier.price.toLocaleString()}</div>
                      <div className="text-sm text-indigo-300 line-through">${tier.originalPrice.toLocaleString()}</div>
                      <div className="text-yellow-400 font-bold">Save ${tier.savings.toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-indigo-200 mb-2">
                      Value: <span className="font-bold text-yellow-400">{tier.value}</span>
                    </div>
                    <div className="text-xs text-indigo-300">
                      {tier.spots} spots remaining
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => handlePresale(tier)}
                      className={`w-full rounded-2xl py-6 text-lg font-bold ${
                        tier.popular
                          ? 'bg-yellow-400 text-indigo-900 hover:bg-yellow-300'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      Reserve Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Presales Makes Sense
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6 text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-bold mb-3">Massive Savings</h3>
                <p className="text-indigo-200">
                  Save up to $5,000 with presales pricing. Once we launch, prices increase by 50-100%.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6 text-center">
                <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-bold mb-3">Lifetime Access</h3>
                <p className="text-indigo-200">
                  Founder tier gets lifetime access to all features, forever. No recurring fees.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-bold mb-3">Early Advantage</h3>
                <p className="text-indigo-200">
                  Get access before public launch. Shape the product. Be part of the success story.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Join the Early Adopters</h2>
          <p className="text-xl text-indigo-200 mb-12">
            Over 850 businesses have already secured their presales spots. Don't miss out!
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">127</div>
                <div className="text-indigo-200">Founder Tiers Sold</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">$635,000</div>
                <div className="text-indigo-200">Presales Revenue</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">14</div>
                <div className="text-indigo-200">Days Remaining</div>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={() => window.location.href = '#pricing'}
            className="bg-yellow-400 text-indigo-900 hover:bg-yellow-300 px-8 py-6 text-lg font-bold rounded-2xl"
          >
            Secure Your Spot Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Don't Miss This Opportunity
          </h2>
          <p className="text-xl mb-8">
            Once presales end, prices increase permanently. Lock in your savings today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handlePresale(PRESALES_TIERS[0])}
              className="bg-indigo-900 text-white hover:bg-indigo-800 px-8 py-6 text-lg font-bold rounded-2xl"
            >
              Get Founder Tier - $4,999
            </Button>
            <Button
              onClick={() => window.location.href = '/#contact'}
              variant="outline"
              className="border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-900 hover:text-white px-8 py-6 text-lg font-bold rounded-2xl"
            >
              Have Questions?
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

