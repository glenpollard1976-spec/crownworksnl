"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GraduationCap, CheckCircle2, Clock, Users, ArrowRight, BookOpen, Play, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SITE = {
  name: "CrownWorksNL",
  phone: "+1 (709) 721-0340",
  email: "crownworksnl@gmail.com",
  url: "https://www.crownworksnl.com",
};

const courseData = {
  "saas-foundation": {
    id: "saas-foundation",
    title: "SaaS Foundation: From Idea to Launch",
    description: "Master the fundamentals of building a successful SaaS business from scratch. Learn proven strategies, avoid common pitfalls, and launch your first product.",
    price: 299,
    originalPrice: 499,
    duration: "8 hours",
    modules: 12,
    students: 150,
    level: "Beginner",
    color: "from-blue-600 to-indigo-600",
    instructor: "Glen Pollard",
    instructorBio: "Founder of CrownWorksNL, built multiple SaaS products from scratch. Expert in business strategy, product development, and growth.",
    curriculum: [
      { title: "Module 1: Finding Your SaaS Idea", duration: "45 min", lessons: 5, locked: false },
      { title: "Module 2: Market Validation", duration: "50 min", lessons: 6, locked: false },
      { title: "Module 3: Building Your MVP", duration: "60 min", lessons: 7, locked: false },
      { title: "Module 4: Pricing Strategy", duration: "40 min", lessons: 4, locked: false },
      { title: "Module 5: Launch Planning", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 6: Getting First Customers", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 7: Growth Hacking Basics", duration: "45 min", lessons: 5, locked: false },
      { title: "Module 8: Customer Retention", duration: "40 min", lessons: 4, locked: false },
      { title: "Module 9: Scaling Your SaaS", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 10: Funding & Investment", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 11: Common Mistakes to Avoid", duration: "35 min", lessons: 4, locked: false },
      { title: "Module 12: Your 90-Day Action Plan", duration: "45 min", lessons: 5, locked: false },
    ],
    whatYouGet: [
      "12 comprehensive video modules",
      "Downloadable worksheets and templates",
      "Access to private community",
      "Lifetime access to all content",
      "30-day money-back guarantee",
      "Certificate of completion"
    ],
    requirements: [
      "No prior experience needed",
      "Willingness to learn and take action",
      "Basic computer skills"
    ]
  },
  "saas-growth": {
    id: "saas-growth",
    title: "SaaS Growth Mastery: 0 to $10K MRR",
    description: "Advanced strategies to grow your SaaS from zero to $10,000 monthly recurring revenue. Proven tactics from successful SaaS founders.",
    price: 499,
    originalPrice: 799,
    duration: "12 hours",
    modules: 15,
    students: 89,
    level: "Intermediate",
    color: "from-green-600 to-emerald-600",
    instructor: "Glen Pollard",
    instructorBio: "Founder of CrownWorksNL, built multiple SaaS products from scratch. Expert in business strategy, product development, and growth.",
    curriculum: [
      { title: "Module 1: Growth Mindset", duration: "40 min", lessons: 4, locked: false },
      { title: "Module 2: Product-Market Fit", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 3: Customer Acquisition Channels", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 4: Conversion Optimization", duration: "45 min", lessons: 5, locked: false },
      { title: "Module 5: Pricing Psychology", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 6: Upselling & Cross-selling", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 7: Churn Reduction", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 8: Referral Programs", duration: "40 min", lessons: 4, locked: false },
      { title: "Module 9: Content Marketing for SaaS", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 10: Paid Advertising", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 11: Partnerships & Integrations", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 12: Community Building", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 13: Metrics That Matter", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 14: Case Studies", duration: "60 min", lessons: 6, locked: false },
      { title: "Module 15: Your Growth Plan", duration: "50 min", lessons: 5, locked: false },
    ],
    whatYouGet: [
      "15 comprehensive video modules",
      "Growth frameworks and templates",
      "Real case studies from $1M+ SaaS companies",
      "Access to private community",
      "Lifetime access to all content",
      "30-day money-back guarantee",
      "Certificate of completion"
    ],
    requirements: [
      "Basic understanding of SaaS business",
      "Have or planning to launch a SaaS product",
      "Willingness to implement strategies"
    ]
  },
  "saas-technical": {
    id: "saas-technical",
    title: "SaaS Technical Stack: Build Like a Pro",
    description: "Learn the technical side of SaaS development. From architecture to deployment, master the tools and technologies used by successful SaaS companies.",
    price: 399,
    originalPrice: 699,
    duration: "15 hours",
    modules: 18,
    students: 67,
    level: "Advanced",
    color: "from-purple-600 to-pink-600",
    instructor: "Glen Pollard",
    instructorBio: "Founder of CrownWorksNL, built multiple SaaS products from scratch. Expert in business strategy, product development, and growth.",
    curriculum: [
      { title: "Module 1: Tech Stack Overview", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 2: Frontend Frameworks", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 3: Backend Architecture", duration: "60 min", lessons: 7, locked: false },
      { title: "Module 4: Database Design", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 5: Authentication & Security", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 6: Payment Integration", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 7: Email Systems", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 8: File Storage", duration: "40 min", lessons: 4, locked: false },
      { title: "Module 9: Monitoring & Analytics", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 10: CI/CD Pipelines", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 11: Scaling Infrastructure", duration: "60 min", lessons: 7, locked: false },
      { title: "Module 12: API Design", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 13: Third-party Integrations", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 14: Testing Strategies", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 15: Performance Optimization", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 16: Security Best Practices", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 17: DevOps Essentials", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 18: Production Deployment", duration: "60 min", lessons: 7, locked: false },
    ],
    whatYouGet: [
      "18 comprehensive video modules",
      "Code examples and templates",
      "Architecture diagrams and guides",
      "Access to private community",
      "Lifetime access to all content",
      "30-day money-back guarantee",
      "Certificate of completion"
    ],
    requirements: [
      "Basic programming knowledge",
      "Familiarity with web development",
      "Understanding of databases"
    ]
  },
  "saas-sales": {
    id: "saas-sales",
    title: "SaaS Sales & Marketing: Close More Deals",
    description: "Master SaaS sales and marketing. Learn proven frameworks to attract, convert, and retain customers. Real strategies from $1M+ SaaS companies.",
    price: 349,
    originalPrice: 599,
    duration: "10 hours",
    modules: 14,
    students: 112,
    level: "Intermediate",
    color: "from-orange-600 to-red-600",
    instructor: "Glen Pollard",
    instructorBio: "Founder of CrownWorksNL, built multiple SaaS products from scratch. Expert in business strategy, product development, and growth.",
    curriculum: [
      { title: "Module 1: SaaS Sales Fundamentals", duration: "45 min", lessons: 5, locked: false },
      { title: "Module 2: Customer Personas", duration: "40 min", lessons: 4, locked: false },
      { title: "Module 3: Value Proposition", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 4: Sales Process", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 5: Demo Best Practices", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 6: Pricing Strategies", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 7: Objection Handling", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 8: Closing Techniques", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 9: Marketing Channels", duration: "55 min", lessons: 6, locked: false },
      { title: "Module 10: Content Marketing", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 11: SEO for SaaS", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 12: Paid Advertising", duration: "50 min", lessons: 5, locked: false },
      { title: "Module 13: Email Marketing", duration: "45 min", lessons: 4, locked: false },
      { title: "Module 14: Sales Automation", duration: "50 min", lessons: 5, locked: false },
    ],
    whatYouGet: [
      "14 comprehensive video modules",
      "Sales scripts and email templates",
      "Marketing funnel templates",
      "Access to private community",
      "Lifetime access to all content",
      "30-day money-back guarantee",
      "Certificate of completion"
    ],
    requirements: [
      "Basic understanding of SaaS business",
      "Willingness to implement sales strategies",
      "Open to learning new techniques"
    ]
  }
};

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId;
  const course = courseData[courseId];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!course) {
      // Course not found, could redirect
      console.log('Course not found');
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <a href="/university" className="text-indigo-600 hover:text-indigo-700">
            Back to University →
          </a>
        </div>
      </div>
    );
  }

  const handleEnroll = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/university" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            CrownWorksNL University
          </a>
          <a href="/university" className="text-sm text-indigo-600 hover:text-indigo-700">
            Back to Courses →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className={`py-20 px-4 bg-gradient-to-r ${course.color} text-white`}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium mb-4 inline-block">
              {course.level}
            </span>
            <h1 className="text-5xl font-bold mb-6">{course.title}</h1>
            <p className="text-xl text-white/90 mb-8">{course.description}</p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration} of content</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{course.modules} modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{course.students} students enrolled</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div>
                <span className="text-4xl font-bold">${course.price}</span>
                <span className="text-white/70 line-through ml-2">${course.originalPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleEnroll}
              disabled={loading}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-6 text-lg rounded-2xl font-semibold"
            >
              {loading ? 'Processing...' : `Enroll Now - $${course.price}`}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* What You'll Learn */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.whatYouGet.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <p className="text-sm text-gray-600">{course.modules} modules • {course.duration} total</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.curriculum.map((module, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold text-sm">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-gray-600">
                            {module.duration} • {module.lessons} lessons
                          </div>
                        </div>
                      </div>
                      {module.locked ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Play className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">${course.price}</div>
                  <div className="text-gray-500 line-through">${course.originalPrice}</div>
                  <div className="text-sm text-green-600 font-medium mt-1">
                    Save ${course.originalPrice - course.price}
                  </div>
                </div>

                <Button
                  onClick={handleEnroll}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-6 text-lg font-semibold mb-4"
                >
                  {loading ? 'Processing...' : `Enroll Now`}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <div className="text-center text-sm text-gray-600 mb-6">
                  30-day money-back guarantee
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">This Course Includes:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Private community access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>All future updates</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-6 mt-6">
                  <div className="text-sm">
                    <div className="font-semibold mb-2">Instructor</div>
                    <div className="text-gray-700">{course.instructor}</div>
                    <div className="text-gray-600 text-xs mt-1">{course.instructorBio}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 {SITE.name} University. All rights reserved.
          </p>
          <a href="/university" className="text-indigo-400 hover:text-indigo-300 mt-2 inline-block">
            Back to University
          </a>
        </div>
      </footer>
    </div>
  );
}

