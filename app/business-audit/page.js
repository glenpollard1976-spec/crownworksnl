"use client";

import { useState } from "react";
import { CheckCircle2, Clock, FileText, TrendingUp, ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SITE = {
  name: "CrownWorksNL",
  phone: "+1 (709) 721-0340",
  email: "crownworksnl@gmail.com",
  url: "https://www.crownworksnl.com",
};

export default function BusinessAuditPage() {
  const [loading, setLoading] = useState(false);

  const handleBookAudit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageName: '60-Minute Business Audit',
          amount: 99,
          isRecurring: false,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMsg = data.error || data.details || 'Payment system error';
        alert(`❌ Payment Error\n\n${errorMsg}\n\nPlease contact us:\n📧 ${SITE.email}\n📞 ${SITE.phone}`);
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`❌ Unable to start checkout\n\n${error.message || 'Network error'}\n\nContact us:\n📧 ${SITE.email}\n📞 ${SITE.phone}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <a href="/" className="text-2xl font-bold text-indigo-600">
            {SITE.name}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            <span>Quick Service - 60 Minutes</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            60-Minute Business Audit
          </h1>
          
          <p className="text-2xl text-gray-600 mb-8">
            Get Expert Feedback on Your Business in Just 1 Hour
          </p>

          <div className="text-4xl font-bold text-indigo-600 mb-2">
            $99
          </div>
          <p className="text-gray-500 mb-8">One-time payment • No recurring fees</p>

          <Button
            onClick={handleBookAudit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-2xl"
            size="lg"
          >
            {loading ? 'Processing...' : 'Book Your Audit Now'}
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            Secure payment via Stripe • Cancel anytime
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle>60-Minute Session</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  One-on-one strategy session via Zoom. We'll dive deep into your business and identify opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle>Written Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Receive a comprehensive 5-10 page audit report with detailed analysis and recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle>Actionable Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get 3-5 prioritized recommendations you can implement immediately to grow your business.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-lg">Pre-call business review (we'll review your website and social media)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-lg">60-minute strategy session via Zoom</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-lg">Comprehensive written audit report (5-10 pages)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-lg">3-5 prioritized, actionable recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-lg">Follow-up email with resources and next steps</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-lg">Option to upgrade to full consulting package</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Small Business Owners</h3>
                <p className="text-gray-600">
                  Get expert feedback on your business without the commitment of a full consulting package.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Entrepreneurs Starting Out</h3>
                <p className="text-gray-600">
                  Validate your business idea and get actionable steps to move forward.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Businesses Stuck in Growth</h3>
                <p className="text-gray-600">
                  Identify what's holding you back and get a clear path to scale.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Anyone Needing Fresh Perspective</h3>
                <p className="text-gray-600">
                  Sometimes you need an outside expert to see what you're missing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Expert Feedback?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Book your 60-minute business audit today and start growing tomorrow.
          </p>
          
          <Button
            onClick={handleBookAudit}
            disabled={loading}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-6 text-lg rounded-2xl font-semibold"
            size="lg"
          >
            {loading ? 'Processing...' : 'Book Your Audit - $99'}
          </Button>

          <p className="text-sm text-indigo-100 mt-6">
            Limited spots available this week
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Questions?</h2>
          <p className="text-gray-600 mb-6">
            We're here to help. Get in touch anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
            >
              <Phone className="w-5 h-5" />
              <span>{SITE.phone}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
            >
              <Mail className="w-5 h-5" />
              <span>{SITE.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 {SITE.name}. All rights reserved.
          </p>
          <a href="/" className="text-indigo-400 hover:text-indigo-300 mt-2 inline-block">
            Back to Home
          </a>
        </div>
      </footer>
    </div>
  );
}

