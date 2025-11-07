"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Sparkles, ShieldCheck, MapPin, Phone, Mail, ArrowRight, CheckCircle2, X, Bot, FileText, TrendingUp, DollarSign, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateContactForm, checkRateLimit } from "@/lib/security";
import "./globals.css";

const SITE = {
  name: "CrownWorksNL",
  phone: "+1 (709) 721-0340",
  url: "https://crownworksnl.com",
  email: "info@crownworksnl.com",
};

const nav = [
  { label: "Services", href: "#services" },
  { label: "iLawyer", href: "#ilawyer" },
  { label: "ProVet", href: "#provet" },
  { label: "Pricing", href: "#pricing" },
  { label: "AI Agents", href: "#ai-agents" },
  { label: "About Glen", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Consulting & Strategy", desc: "Roadmaps, audits, and hands‑on guidance to grow with confidence." },
  { icon: <Sparkles className="w-6 h-6" />, title: "Brand & Creative", desc: "Identity systems, content packages, and thumbnail/shorts kits." },
  { icon: <FileText className="w-6 h-6" />, title: "iLawyer", desc: "AI-powered legal assistance and document preparation for businesses." },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "ProVet", desc: "Professional veterinary practice management and business consulting." },
];

const features = [
  "Proud member of Qalipu First Nation",
  "Based in Corner Brook, Newfoundland",
  "Clear pricing & fast turnaround",
  "You own your data and assets",
  "Ongoing support plans",
];

const testimonials = [
  { quote: "CrownWorksNL took us from idea to launch in two weeks. Our bookings doubled in month one.", name: "M. Jacobs", role: "Owner, Harbor Outfitters" },
  { quote: "Smart strategy + crisp design. They handled site, branding, and shorts—stress free.", name: "R. Bennett", role: "Founder, EastRock Guides" },
];

// Optimized animations - no y-transform on mobile to prevent jumpiness
const fade = { 
  hidden: { opacity: 0, y: 12 }, 
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } 
};

// Mobile-friendly fade (opacity only, no y-transform)
const fadeMobile = { 
  hidden: { opacity: 0 }, 
  show: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } } 
};

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Use mobile-friendly animation on mobile (no y-transform)
  const variants = isMobile ? fadeMobile : fade;
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={variants}
      className={className}
      style={{ willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState({ businessGrowth: false });

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  const handleNavClick = (e) => {
    setMobileMenuOpen(false);
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const trackConversion = (eventName, eventData = {}) => {
    // Track conversions for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventData);
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, eventData);
    }
    // Console log for debugging (remove in production)
    console.log('Conversion tracked:', eventName, eventData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!checkRateLimit('contact_form', 5, 60000)) {
      alert('Too many requests. Please wait a minute before submitting again.');
      return;
    }
    
    // Validate form data
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return;
    }
    
    // Track form submission
    trackConversion('contact_form_submit', {
      form_name: 'contact_form',
      form_location: 'contact_section'
    });
    
    // Use validated and sanitized data
    const sanitizedData = validation.data;
    
    // In a real application, you would send this to a backend API
    // For now, we'll use mailto as a fallback
    const subject = encodeURIComponent(`Contact from ${sanitizedData.name}`);
    const body = encodeURIComponent(`Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nPhone: ${sanitizedData.phone}\n\nMessage:\n${sanitizedData.message}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleCTAClick = (ctaName, location) => {
    trackConversion('cta_click', {
      cta_name: ctaName,
      location: location
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-zinc-200" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 font-semibold no-underline group">
              <Crown className="w-6 h-6 icon-pop text-indigo-600 group-hover:text-indigo-700" />
              <span className="gradient-text">CrownWorksNL</span>
            </a>
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-sm hover:text-zinc-900 text-zinc-600 no-underline transition-colors">
                  {n.label}
                </a>
              ))}
              <a href="/email-list" className="text-sm hover:text-zinc-900 text-zinc-600 no-underline transition-colors">
                Email List
              </a>
              <a href={`tel:${SITE.phone}`} className="no-underline mr-2">
                <Button variant="outline" className="rounded-2xl text-sm">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Now
                </Button>
              </a>
              <a href="#contact" className="no-underline">
                <Button className="rounded-2xl">Get a Quote</Button>
              </a>
            </nav>
            <button 
              className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 transition-colors z-50" 
              aria-label="Toggle mobile menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          {/* Mobile Menu */}
          <motion.nav
            initial={false}
            animate={{
              height: mobileMenuOpen ? "auto" : 0,
              opacity: mobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            aria-label="Mobile navigation"
            style={{ willChange: 'height, opacity', transform: 'translateZ(0)' }}
          >
            <div className="py-4 space-y-3 border-t border-zinc-200 mt-2">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={handleNavClick}
                  className="block text-sm hover:text-zinc-900 text-zinc-600 no-underline transition-colors py-2"
                >
                  {n.label}
                </a>
              ))}
              <a href="/email-list" onClick={handleNavClick} className="block text-sm hover:text-zinc-900 text-zinc-600 no-underline transition-colors py-2">
                Email List
              </a>
              <a href="#contact" onClick={handleNavClick} className="no-underline block mt-4">
                <Button className="rounded-2xl w-full">Get a Quote</Button>
              </a>
            </div>
          </motion.nav>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-[50rem] h-[50rem] rounded-full bg-indigo-200/40 blur-3xl absolute -top-40 -right-32" />
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
          <motion.div 
            variants={fade} 
            initial="hidden" 
            animate="show" 
            className="grid md:grid-cols-2 gap-10 items-center"
            style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 mb-4 border border-indigo-200/50 shadow-sm">
                <Sparkles className="w-4 h-4 icon-sparkle text-indigo-600" />
                <span className="font-medium">Empowering business growth in NL</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Grow boldly. Build your future with confidence.
              </h1>
              <p className="mt-4 text-zinc-600 text-lg">
                CrownWorksNL, founded by Glen Pollard of the Qalipu First Nation, provides strategy, design, and business consulting services to help you grow and succeed in Newfoundland & Labrador.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" onClick={() => handleCTAClick('get_free_consultation', 'hero')} className="no-underline"><Button className="rounded-2xl text-lg px-6 py-3 bg-indigo-600 hover:bg-indigo-700">Get Free Consultation <ArrowRight className="ml-2 w-4 h-4" /></Button></a>
                <a href={`tel:${SITE.phone}`} onClick={() => handleCTAClick('call_now', 'hero')} className="px-5 py-3 rounded-2xl border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 no-underline font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a href="#pricing" onClick={() => handleCTAClick('view_pricing', 'hero')} className="px-5 py-3 rounded-2xl border border-zinc-300 text-sm hover:bg-zinc-50 no-underline font-medium">View Pricing</a>
              </div>
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  🎉 <strong>Launch Special:</strong> Free consultation for first 10 businesses - <span className="text-green-600">Only 7 spots left!</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Free initial consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>No obligation</span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Corner Brook, NL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${SITE.phone}`} className="no-underline">{SITE.phone}</a>
                </div>
              </div>
            </div>
            <div className="relative hero-glow">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 animate-pulse" />
                <Crown className="w-32 h-32 text-white logo-crown relative z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-zinc-600">Comprehensive solutions for your business needs</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={i}>
                <Card className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="service-icon-wrapper mb-4">
                      <div className="text-indigo-600 icon-pop icon-sparkle">
                        {service.icon}
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-indigo-600 transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-600">{service.desc}</p>
                    <a href="#contact" onClick={() => handleCTAClick('get_started', `service_${service.title}`)} className="no-underline mt-4 inline-block">
                      <Button className="rounded-2xl mt-4 w-full group-hover:bg-indigo-700 transition-all">Get Started</Button>
                    </a>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="ilawyer" className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">iLawyer</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              AI-powered legal assistance and document preparation for businesses in Newfoundland & Labrador.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection>
              <Card className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="service-icon-wrapper mb-4">
                    <div className="text-indigo-600 icon-pop icon-sparkle">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">Legal Document Preparation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">
                    Get help with contracts, agreements, and legal documents for your business.
                  </p>
                  <ul className="space-y-2 text-zinc-600 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Contract review and preparation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Business agreements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Legal compliance documents</span>
                    </li>
                  </ul>
                  <a href="#contact" onClick={() => handleCTAClick('get_started', 'ilawyer_legal_docs')} className="no-underline">
                    <Button className="rounded-2xl w-full">Get Started</Button>
                  </a>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection>
              <Card className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="service-icon-wrapper mb-4">
                    <div className="text-indigo-600 icon-pop icon-sparkle">
                      <Bot className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">AI Legal Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">
                    Get instant answers to legal questions and guidance for your business needs.
                  </p>
                  <ul className="space-y-2 text-zinc-600 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 AI legal consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Legal question answering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Compliance guidance</span>
                    </li>
                  </ul>
                  <a href="#contact" onClick={() => handleCTAClick('learn_more', 'ilawyer_ai_assistant')} className="no-underline">
                    <Button className="rounded-2xl w-full">Learn More</Button>
                  </a>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="provet" className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ProVet</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Professional veterinary practice management and business consulting services.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection>
              <Card className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="service-icon-wrapper mb-4">
                    <div className="text-indigo-600 icon-pop icon-sparkle">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">Practice Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">
                    Streamline your veterinary practice operations and improve efficiency.
                  </p>
                  <ul className="space-y-2 text-zinc-600 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Appointment scheduling systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Patient record management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Billing and payment systems</span>
                    </li>
                  </ul>
                  <a href="#contact" onClick={() => handleCTAClick('get_started', 'provet_practice_mgmt')} className="no-underline">
                    <Button className="rounded-2xl w-full">Get Started</Button>
                  </a>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection>
              <Card className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="service-icon-wrapper mb-4">
                    <div className="text-indigo-600 icon-pop icon-sparkle">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">Business Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">
                    Grow your veterinary practice with strategic consulting and marketing.
                  </p>
                  <ul className="space-y-2 text-zinc-600 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Marketing and client acquisition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Financial planning and optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Staff training and development</span>
                    </li>
                  </ul>
                  <a href="#contact" onClick={() => handleCTAClick('learn_more', 'provet_business_growth')} className="no-underline">
                    <Button className="rounded-2xl w-full">Learn More</Button>
                  </a>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Packages</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto mb-4">
              Transparent pricing for business consulting and growth services. All packages include a free initial consultation.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              <Users className="w-4 h-4" />
              <span>12+ businesses helped this month</span>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection>
              <Card className="border-2 border-indigo-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Business Growth Package</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-zinc-900">$1,499</span>
                    <span className="text-zinc-600 ml-2">USD/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Strategic business roadmap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Brand identity & design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Monthly strategy sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Content creation support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Priority email support</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={async () => {
                      if (loadingCheckout.businessGrowth) return;
                      handleCTAClick('pricing_click', 'business_growth_package');
                      setLoadingCheckout(prev => ({ ...prev, businessGrowth: true }));
                      try {
                        const response = await fetch('/api/checkout', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            packageName: 'Business Growth Package',
                            amount: 1499,
                            isRecurring: true,
                          }),
                        });
                        const data = await response.json();
                        if (data.error) {
                          alert(data.error);
                          setLoadingCheckout(prev => ({ ...prev, businessGrowth: false }));
                        } else if (data.url) {
                          window.location.href = data.url;
                        } else {
                          throw new Error('No checkout URL received');
                        }
                      } catch (error) {
                        console.error('Checkout error:', error);
                        alert('Error starting checkout. Please contact us directly at ' + SITE.email);
                        setLoadingCheckout(prev => ({ ...prev, businessGrowth: false }));
                      }
                    }}
                    className="rounded-2xl w-full bg-indigo-600 hover:bg-indigo-700" 
                    disabled={loadingCheckout.businessGrowth}
                  >
                    {loadingCheckout.businessGrowth ? 'Processing...' : 'Subscribe - $1,499/month'}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection>
              <Card className="border-2 border-zinc-200">
                <CardHeader>
                  <CardTitle className="text-xl">AI Solutions</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-zinc-900">Custom</span>
                    <span className="text-zinc-600 ml-2">pricing</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Custom AI agent development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Workflow automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Integration & training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Ongoing maintenance & updates</span>
                    </li>
                  </ul>
                  <a href="#contact" onClick={() => handleCTAClick('pricing_click', 'ai_solutions')} className="no-underline">
                    <Button className="rounded-2xl w-full">Get Quote</Button>
                  </a>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection className="text-center mt-8">
            <p className="text-zinc-600 mb-4">Need a custom solution? We offer flexible packages tailored to your needs.</p>
            <a href="#contact" onClick={() => handleCTAClick('schedule_consultation', 'pricing_section')} className="no-underline">
              <Button className="rounded-2xl">Schedule Free Consultation <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </a>
          </AnimatedSection>
        </div>
      </section>

      <section id="why" className="py-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <AnimatedSection key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>{feature}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Clients Say</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, i) => (
              <AnimatedSection key={i}>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-zinc-700 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-zinc-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-agents" className="py-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI Agents</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Leverage cutting-edge AI technology to automate workflows, enhance customer interactions, and drive growth for your business.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatedSection>
              <Card className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="service-icon-wrapper mb-4">
                    <div className="text-indigo-600 icon-pop icon-sparkle">
                      <Bot className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">Customer Support Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600">
                    24/7 AI-powered customer support that handles inquiries, schedules appointments, and provides instant responses to common questions.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection>
              <Card className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="service-icon-wrapper mb-4">
                    <div className="text-indigo-600 icon-pop icon-sparkle">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">Document Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600">
                    Streamline business documentation and paperwork with AI that helps prepare, review, and organize your files.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection>
              <Card className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="service-icon-wrapper mb-4">
                    <div className="text-indigo-600 icon-pop icon-sparkle">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">Business Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600">
                    Get actionable insights from your data with AI agents that analyze trends, forecast opportunities, and recommend strategic decisions.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection className="mt-8 text-center">
            <p className="text-zinc-600 mb-4">Interested in implementing AI agents for your business?</p>
            <a href="#contact" className="no-underline">
              <Button className="rounded-2xl">Get Started <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </a>
          </AnimatedSection>
        </div>
      </section>

      <section id="opportunities" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partnership Opportunities</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Join forces with CrownWorksNL to create meaningful impact in Newfoundland & Labrador. We're always looking for partners who share our vision.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle>Business Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">
                    Collaborate with us to expand your reach in the Newfoundland & Labrador market. We offer:
                  </p>
                  <ul className="space-y-2 text-zinc-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Joint ventures in business development projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Referral programs for complementary services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Co-marketing opportunities with local businesses</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle>Community Collaborations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">
                    Work with us to support Indigenous communities and local initiatives:
                  </p>
                  <ul className="space-y-2 text-zinc-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Community development projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Educational workshops on business growth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Supporting First Nations economic development</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection className="text-center">
            <p className="text-zinc-600 mb-4">Have a partnership idea? Let's discuss how we can work together.</p>
            <a href="#contact" className="no-underline">
              <Button className="rounded-2xl">Contact Us <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </a>
          </AnimatedSection>
        </div>
      </section>

      <section id="about" className="py-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Glen</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <div className="space-y-4">
                <p className="text-zinc-600 text-lg">
                  Glen Pollard, a proud member of the Qalipu First Nation, founded CrownWorksNL to help businesses and individuals grow and succeed in Newfoundland & Labrador.
                </p>
                <p className="text-zinc-600">
                  Based in Corner Brook, Glen brings deep local expertise and a genuine understanding of the region's unique challenges and opportunities. With a commitment to Indigenous values and community empowerment, he combines strategic business acumen with cultural sensitivity to deliver results that matter.
                </p>
                <p className="text-zinc-600">
                  Whether you're looking to grow your business, expand your reach, or explore new opportunities in Newfoundland & Labrador, Glen and the CrownWorksNL team are here to guide you every step of the way.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <a href="#contact" className="no-underline">
                    <Button className="rounded-2xl">Connect with Glen <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </a>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">Key Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Business strategy and growth planning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Business strategy and growth consulting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Indigenous community engagement and partnerships</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Brand development and creative direction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-600">Local market insights for Newfoundland & Labrador</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-b from-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-indigo-100">Ready to start your project? Let's talk.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 flex-shrink-0" />
                    <a href={`tel:${SITE.phone}`} className="no-underline text-white hover:underline">{SITE.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 flex-shrink-0" />
                    <a href={`mailto:${SITE.email}`} className="no-underline text-white hover:underline">{SITE.email}</a>
                  </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                    <span>Corner Brook, Newfoundland & Labrador</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
            <AnimatedSection>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-6">Send a Message</h3>
                  {formSubmitted && (
                    <div className="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg text-sm">
                      Thank you! Your message has been sent. We'll get back to you soon.
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone (optional)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-2xl bg-white text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-900 text-zinc-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
