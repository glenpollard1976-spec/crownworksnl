"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Sparkles, BookOpen, Users, Award, TrendingUp, ArrowRight, CheckCircle2, PlayCircle, Clock, Target, Zap, GraduationCap, Trophy } from "lucide-react";
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

const learningPaths = [
  {
    level: "Beginner",
    title: "AI Automation Fundamentals",
    duration: "4 weeks",
    lessons: 12,
    description: "Master the basics of AI automation and learn how to identify automation opportunities in your business.",
    topics: [
      "Understanding AI Automation",
      "Identifying Automation Opportunities",
      "Basic Workflow Design",
      "Getting Started with Tools"
    ],
    color: "from-purple-500 to-purple-600"
  },
  {
    level: "Intermediate",
    title: "Advanced Automation Strategies",
    duration: "6 weeks",
    lessons: 18,
    description: "Dive deeper into complex automation scenarios and learn to build sophisticated workflows.",
    topics: [
      "Advanced Workflow Design",
      "Integration Strategies",
      "Error Handling & Monitoring",
      "Scaling Automation"
    ],
    color: "from-purple-600 to-purple-700"
  },
  {
    level: "Expert",
    title: "AI Automation Mastery",
    duration: "8 weeks",
    lessons: 24,
    description: "Become an AI automation expert and learn to architect enterprise-level automation solutions.",
    topics: [
      "Enterprise Architecture",
      "Custom AI Development",
      "Team Training & Leadership",
      "ROI Optimization"
    ],
    color: "from-purple-700 to-purple-800"
  }
];

const mentors = [
  {
    name: "Sarah Chen",
    role: "AI Automation Expert",
    experience: "10+ years",
    expertise: "Workflow Automation, Process Optimization",
    students: 1247
  },
  {
    name: "Marcus Rodriguez",
    role: "Business Process Expert",
    experience: "15+ years",
    expertise: "Digital Transformation, Strategic Planning",
    students: 892
  },
  {
    name: "Dr. Aisha Patel",
    role: "AI Research Scientist",
    experience: "12+ years",
    expertise: "Machine Learning, AI Implementation",
    students: 1563
  }
];

const stats = [
  { label: "Active Learners", value: "2,847", icon: Users },
  { label: "Projects Completed", value: "15,692", icon: Target },
  { label: "Success Rate", value: "94%", icon: Trophy },
  { label: "Average ROI", value: "340%", icon: TrendingUp }
];

export default function LearningCenterPage() {
  const [selectedPath, setSelectedPath] = useState(null);

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
              <Link href="/learning-center" className="text-sm text-purple-600 font-medium">Learning Centre</Link>
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
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span className="font-medium">CrownWorksNL AI Learning Centre</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
              Master AI Automation
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-8">
              Learn from industry experts and transform your business with AI automation. Join thousands of learners building the future.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/ai-toolkit/pricing">
                <Button className="rounded-2xl bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                  Start Learning Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button className="rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg">
                <PlayCircle className="mr-2 w-5 h-5" />
                Watch Intro Video
              </Button>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, i) => (
              <AnimatedSection key={i}>
                <Card className="text-center border-purple-100">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-purple-600 mb-1">{stat.value}</div>
                    <div className="text-sm text-zinc-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Learning Path</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Three comprehensive paths from beginner to AI automation expert
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((path, i) => (
              <AnimatedSection key={i}>
                <Card 
                  className={`h-full cursor-pointer transition-all hover:shadow-xl border-2 ${
                    selectedPath === i ? 'border-purple-500' : 'border-purple-100'
                  }`}
                  onClick={() => setSelectedPath(selectedPath === i ? null : i)}
                >
                  <CardHeader>
                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${path.color} mb-4`} />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-purple-600 uppercase">{path.level}</span>
                      <div className="flex items-center gap-1 text-sm text-zinc-500">
                        <Clock className="w-4 h-4" />
                        {path.duration}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                    <p className="text-sm text-zinc-600">{path.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="text-sm font-medium text-zinc-700 mb-2">What You'll Learn:</div>
                      <ul className="space-y-1">
                        {path.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-purple-100">
                      <span className="text-sm text-zinc-600">{path.lessons} Lessons</span>
                      <Link href="/ai-toolkit/pricing">
                        <Button className="rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm">
                          Enroll Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Learn from Industry Experts</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Our mentors have helped thousands of businesses transform with AI automation
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {mentors.map((mentor, i) => (
              <AnimatedSection key={i}>
                <Card className="text-center border-purple-100 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                    <p className="text-sm text-purple-600 font-medium mb-2">{mentor.role}</p>
                    <p className="text-xs text-zinc-500 mb-4">{mentor.experience} Experience</p>
                    <p className="text-sm text-zinc-600 mb-4">{mentor.expertise}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                      <Users className="w-4 h-4" />
                      <span>{mentor.students.toLocaleString()} Students</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Learning Centre?</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Comprehensive Curriculum",
                desc: "From basics to advanced, our courses cover everything you need to master AI automation"
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Expert Mentorship",
                desc: "Get 1-on-1 guidance from industry professionals with proven track records"
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Certification",
                desc: "Earn recognized certificates upon completion to showcase your expertise"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Hands-On Projects",
                desc: "Learn by doing with real-world projects that you can use in your business"
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Proven Results",
                desc: "94% of our students report significant ROI within 6 months of completion"
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Self-Paced Learning",
                desc: "Learn at your own pace with lifetime access to all course materials"
              }
            ].map((feature, i) => (
              <AnimatedSection key={i}>
                <Card className="h-full border-purple-100 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-zinc-600">{feature.desc}</p>
                      </div>
                    </div>
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
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-lg text-purple-100 mb-8">
              Join thousands of learners transforming their businesses with AI automation.
            </p>
            <Link href="/ai-toolkit/pricing">
              <Button className="rounded-2xl bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg font-semibold">
                Enroll Now - Start Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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

