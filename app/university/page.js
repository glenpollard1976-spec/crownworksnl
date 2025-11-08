"use client";

import { useState } from "react";
import { GraduationCap, BookOpen, CheckCircle2, ArrowRight, Clock, Users, TrendingUp, DollarSign, Rocket, Zap, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const SITE = {
  name: "CrownWorksNL",
  phone: "+1 (709) 721-0340",
  email: "crownworksnl@gmail.com",
  url: "https://www.crownworksnl.com",
};

const courses = [
  {
    id: "saas-foundation",
    title: "SaaS Foundation: From Idea to Launch",
    description: "Master the fundamentals of building a successful SaaS business from scratch. Learn proven strategies, avoid common pitfalls, and launch your first product.",
    price: 299,
    originalPrice: 499,
    duration: "8 hours",
    modules: 12,
    students: 150,
    level: "Beginner",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-blue-600 to-indigo-600",
    features: [
      "Idea validation framework",
      "Market research strategies",
      "MVP development guide",
      "Launch checklist",
      "First 100 customers plan"
    ],
    curriculum: [
      "Module 1: Finding Your SaaS Idea",
      "Module 2: Market Validation",
      "Module 3: Building Your MVP",
      "Module 4: Pricing Strategy",
      "Module 5: Launch Planning",
      "Module 6: Getting First Customers",
      "Module 7: Growth Hacking Basics",
      "Module 8: Customer Retention",
      "Module 9: Scaling Your SaaS",
      "Module 10: Funding & Investment",
      "Module 11: Common Mistakes to Avoid",
      "Module 12: Your 90-Day Action Plan"
    ]
  },
  {
    id: "saas-growth",
    title: "SaaS Growth Mastery: 0 to $10K MRR",
    description: "Advanced strategies to grow your SaaS from zero to $10,000 monthly recurring revenue. Proven tactics from successful SaaS founders.",
    price: 499,
    originalPrice: 799,
    duration: "12 hours",
    modules: 15,
    students: 89,
    level: "Intermediate",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "from-green-600 to-emerald-600",
    features: [
      "Growth frameworks",
      "Customer acquisition funnels",
      "Retention strategies",
      "Pricing optimization",
      "Revenue scaling tactics"
    ],
    curriculum: [
      "Module 1: Growth Mindset",
      "Module 2: Product-Market Fit",
      "Module 3: Customer Acquisition Channels",
      "Module 4: Conversion Optimization",
      "Module 5: Pricing Psychology",
      "Module 6: Upselling & Cross-selling",
      "Module 7: Churn Reduction",
      "Module 8: Referral Programs",
      "Module 9: Content Marketing for SaaS",
      "Module 10: Paid Advertising",
      "Module 11: Partnerships & Integrations",
      "Module 12: Community Building",
      "Module 13: Metrics That Matter",
      "Module 14: Case Studies",
      "Module 15: Your Growth Plan"
    ]
  },
  {
    id: "saas-technical",
    title: "SaaS Technical Stack: Build Like a Pro",
    description: "Learn the technical side of SaaS development. From architecture to deployment, master the tools and technologies used by successful SaaS companies.",
    price: 399,
    originalPrice: 699,
    duration: "15 hours",
    modules: 18,
    students: 67,
    level: "Advanced",
    icon: <Zap className="w-8 h-8" />,
    color: "from-purple-600 to-pink-600",
    features: [
      "Tech stack selection",
      "Architecture patterns",
      "Database design",
      "API development",
      "Deployment strategies"
    ],
    curriculum: [
      "Module 1: Tech Stack Overview",
      "Module 2: Frontend Frameworks",
      "Module 3: Backend Architecture",
      "Module 4: Database Design",
      "Module 5: Authentication & Security",
      "Module 6: Payment Integration",
      "Module 7: Email Systems",
      "Module 8: File Storage",
      "Module 9: Monitoring & Analytics",
      "Module 10: CI/CD Pipelines",
      "Module 11: Scaling Infrastructure",
      "Module 12: API Design",
      "Module 13: Third-party Integrations",
      "Module 14: Testing Strategies",
      "Module 15: Performance Optimization",
      "Module 16: Security Best Practices",
      "Module 17: DevOps Essentials",
      "Module 18: Production Deployment"
    ]
  },
  {
    id: "saas-sales",
    title: "SaaS Sales & Marketing: Close More Deals",
    description: "Master SaaS sales and marketing. Learn proven frameworks to attract, convert, and retain customers. Real strategies from $1M+ SaaS companies.",
    price: 349,
    originalPrice: 599,
    duration: "10 hours",
    modules: 14,
    students: 112,
    level: "Intermediate",
    icon: <Target className="w-8 h-8" />,
    color: "from-orange-600 to-red-600",
    features: [
      "Sales frameworks",
      "Marketing funnels",
      "Content strategies",
      "Email campaigns",
      "Conversion optimization"
    ],
    curriculum: [
      "Module 1: SaaS Sales Fundamentals",
      "Module 2: Customer Personas",
      "Module 3: Value Proposition",
      "Module 4: Sales Process",
      "Module 5: Demo Best Practices",
      "Module 6: Pricing Strategies",
      "Module 7: Objection Handling",
      "Module 8: Closing Techniques",
      "Module 9: Marketing Channels",
      "Module 10: Content Marketing",
      "Module 11: SEO for SaaS",
      "Module 12: Paid Advertising",
      "Module 13: Email Marketing",
      "Module 14: Sales Automation"
    ]
  }
];

const bundle = {
  title: "Complete SaaS Mastery Bundle",
  description: "Get all 4 courses + exclusive bonuses. Save $1,000+ and get lifetime access to all content.",
  price: 999,
    originalPrice: 1546,
  savings: 547,
  courses: courses.length,
  bonuses: [
    "Private community access",
    "Monthly Q&A sessions",
    "1-on-1 strategy call",
    "Templates & resources library",
    "Lifetime updates"
  ]
};

export default function UniversityPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEnroll = async (course) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageName: course.title,
          amount: course.price,
          isRecurring: false,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Payment error');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Payment Error: ${error.message}\n\nContact us: ${SITE.email} or ${SITE.phone}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            CrownWorksNL University
          </a>
          <a href="/" className="text-sm text-indigo-600 hover:text-indigo-700">
            Back to Home →
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Learn from Real SaaS Success Stories</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build Your Successful SaaS Business
            </h1>
            
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Step-by-step courses teaching you how to build, launch, and grow a profitable SaaS business. 
              From idea to $10K MRR and beyond.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold">4</div>
                <div className="text-indigo-100">Complete Courses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">400+</div>
                <div className="text-indigo-100">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">50+</div>
                <div className="text-indigo-100">Hours of Content</div>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById('courses');
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-6 text-lg rounded-2xl font-semibold inline-flex items-center justify-center transition-colors"
            >
              Browse Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bundle Offer */}
      <section className="py-12 px-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-y border-yellow-200">
        <div className="max-w-6xl mx-auto">
          <Card className="border-2 border-yellow-400 bg-white">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">
                      BEST VALUE
                    </span>
                    <span className="text-sm text-gray-600">Save ${bundle.savings}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3">{bundle.title}</h2>
                  <p className="text-gray-700 mb-4">{bundle.description}</p>
                  <ul className="space-y-2 mb-6">
                    {bundle.bonuses.map((bonus, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span>{bonus}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-4xl font-bold text-indigo-600">${bundle.price}</span>
                      <span className="text-gray-500 line-through ml-2">${bundle.originalPrice}</span>
                    </div>
                    <Button
                      onClick={() => handleEnroll(bundle)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-2xl font-semibold"
                    >
                      Get Complete Bundle
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive courses covering every aspect of building a successful SaaS business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className={`bg-gradient-to-r ${course.color} p-6 text-white rounded-t-lg`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                        {course.icon}
                      </div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                    <p className="text-white/90">{course.description}</p>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.modules} modules</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students} students</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-indigo-600">${course.price}</span>
                      <span className="text-gray-500 line-through">${course.originalPrice}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                      <ul className="space-y-2">
                        {course.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto space-y-3">
                      <Button
                        onClick={() => handleEnroll(course)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-6 text-lg font-semibold"
                      >
                        Enroll Now - ${course.price}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                      <a
                        href={`/university/${course.id}`}
                        className="block text-center text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        View Full Curriculum →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why CrownWorksNL University?</h2>
            <p className="text-xl text-gray-600">Learn from real experience, not theory</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Practical Content</h3>
                <p className="text-gray-600">
                  Real-world strategies you can implement immediately. No fluff, just actionable steps.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Join a community of SaaS founders. Share experiences, get feedback, and grow together.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lifetime Access</h3>
                <p className="text-gray-600">
                  One-time purchase, lifetime access. All future updates and new content included.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your SaaS?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join 400+ students who are building their SaaS businesses with our proven frameworks.
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              const targetElement = document.getElementById('courses');
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-6 text-lg rounded-2xl font-semibold inline-flex items-center justify-center transition-colors"
          >
            Start Learning Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 {SITE.name} University. All rights reserved.
          </p>
          <a href="/" className="text-indigo-400 hover:text-indigo-300 mt-2 inline-block">
            Back to Home
          </a>
        </div>
      </footer>
    </div>
  );
}

