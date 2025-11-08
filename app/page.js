"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Sparkles, ShieldCheck, MapPin, Phone, Mail, ArrowRight, CheckCircle2, X, Bot, FileText, TrendingUp, DollarSign, Clock, Users, Smartphone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateContactForm, checkRateLimit } from "@/lib/security";
import AIAgentWidget from "@/components/AIAgentWidget";
import "./globals.css";

const SITE = {
  name: "CrownWorksNL",
  phone: "+1 (709) 721-0340",
  url: "https://www.crownworksnl.com",
  email: "crownworksnl@gmail.com",
};

const nav = [
  { label: "Services", href: "#services" },
  { label: "University", href: "/university" },
  { label: "AI Audit Agent", href: "/business-audit-agent" },
  { label: "Business Audit", href: "/business-audit" },
  { label: "iLawyer", href: "#ilawyer" },
  { label: "ProVet", href: "#provet" },
  { label: "Pricing", href: "#pricing" },
  { label: "Mobile App", href: "#mobile-apps" },
  { label: "AI Agents", href: "#ai-agents" },
  { label: "Presales", href: "/presales" },
  { label: "About Glen", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { 
    icon: <ShieldCheck className="w-6 h-6" />, 
    title: "Consulting & Strategy", 
    desc: "Roadmaps, audits, and hands‑on guidance to grow with confidence.",
    products: [
      "Business Growth Package - $1,499/month",
      "Strategic Business Roadmap",
      "Business Audits & Analysis",
      "Monthly Strategy Sessions",
      "Growth Planning & Execution"
    ]
  },
  { 
    icon: <Sparkles className="w-6 h-6" />, 
    title: "Brand & Creative", 
    desc: "Identity systems, content packages, and thumbnail/shorts kits.",
    products: [
      "Brand Identity Design",
      "Logo Design Packages",
      "Content Creation",
      "Thumbnail & Shorts Kits",
      "Social Media Graphics"
    ]
  },
  { 
    icon: <FileText className="w-6 h-6" />, 
    title: "iLawyer", 
    desc: "AI-powered legal assistance and document preparation for businesses.",
    products: [
      "Free Initial Consultation",
      "Legal Document Preparation",
      "AI Legal Assistant (24/7)",
      "Compliance Guidance",
      "Business Legal Services"
    ]
  },
  { 
    icon: <ShieldCheck className="w-6 h-6" />, 
    title: "ProVet", 
    desc: "Professional veterinary practice management and business consulting.",
    products: [
      "Free Trial Available",
      "AI-Powered Consultations (24/7)",
      "Complete Canine Health Management",
      "Health Records Management",
      "Vaccination Tracking"
    ]
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Solutions",
    desc: "Custom AI agent development and workflow automation.",
    products: [
      "Custom AI Agent Development",
      "Workflow Automation",
      "Integration & Training",
      "Ongoing Maintenance",
      "API Access"
    ]
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "AI Agent Platform",
    desc: "Unified AI assistant integrating all CrownWorks services.",
    products: [
      "Founder Tier - $4,999 (Lifetime)",
      "Pioneer Tier - $1,999 (3 Years)",
      "Early Adopter - $999 (2 Years)",
      "Starter - $499 (1 Year)",
      "Post-Launch Subscriptions Available"
    ]
  }
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
      style={{ willChange: 'opacity', pointerEvents: 'auto' }}
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
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Ensure page starts at top on load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const forceScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
      }
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
        document.scrollingElement.scrollLeft = 0;
      }
    };

    // Force immediately
    forceScrollToTop();

    // Enforce top position with requestAnimationFrame for first 2 seconds
    let isCancelled = false;
    const startTime = performance.now();
    let rafId = null;

    const enforceTop = (now) => {
      if (isCancelled) return;
      if (now - startTime < 2000) { // Extend to 2 seconds
        forceScrollToTop();
        rafId = requestAnimationFrame(enforceTop);
      }
    };

    rafId = requestAnimationFrame(enforceTop);

    // Also use setInterval as backup
    const intervalId = setInterval(() => {
      if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
        forceScrollToTop();
      }
    }, 10);

    // Stop after 2 seconds and re-enable scrolling
    setTimeout(() => {
      isCancelled = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      clearInterval(intervalId);
      // Re-enable scrolling in CSS
      if (document.documentElement) {
        document.documentElement.classList.add('scrolled');
      }
    }, 2000);

    // Handle hash navigation after the enforcement window
    const hash = window.location.hash;
    if (hash && hash !== '#') {
      setTimeout(() => {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 2100); // Wait until after scroll prevention
    }

    return () => {
      isCancelled = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      clearInterval(intervalId);
    };
  }, []);

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
    // Production: Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Conversion tracked:', eventName, eventData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!checkRateLimit('contact_form', 5, 60000)) {
      alert('Too many requests. Please wait a minute before submitting again.');
      return;
    }
    
    // Validate form data
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      const errorMessage = validation.errors.join('\n• ');
      alert(`Please fix the following:\n\n• ${errorMessage}`);
      return;
    }
    
    // Track form submission
    trackConversion('contact_form_submit', {
      form_name: 'contact_form',
      form_location: 'contact_section'
    });
    
    // Use validated and sanitized data
    const sanitizedData = validation.data;
    
    // Show loading state
    setFormSubmitted(true);
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }
    
    try {
      // Send to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success
      setFormSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      if (submitButton) {
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.style.backgroundColor = '#10b981';
      }
      
      setTimeout(() => {
        setFormSubmitted(false);
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          submitButton.style.backgroundColor = '';
        }
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      alert(`Failed to send message: ${error.message}\n\nPlease contact us directly at ${SITE.email} or call ${SITE.phone}`);
      
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
      setFormSubmitted(false);
    }
  };

  const handleCTAClick = (ctaName, location) => {
    trackConversion('cta_click', {
      cta_name: ctaName,
      location: location
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-zinc-200" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" onClick={(e) => { e.preventDefault(); const el = document.getElementById('home'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="flex items-center gap-2 font-semibold no-underline group">
              <Crown className="w-6 h-6 icon-pop text-indigo-600 group-hover:text-indigo-700" />
              <span className="gradient-text">CrownWorksNL</span>
            </a>
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); const el = document.getElementById(n.href.substring(1)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="text-sm hover:text-zinc-900 text-zinc-600 no-underline transition-colors">
                  {n.label}
                </a>
              ))}
              <a href="/email-list" className="text-sm hover:text-zinc-900 text-zinc-600 no-underline transition-colors">
                Email List
              </a>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCTAClick('call_now', 'header');
                  window.location.href = `tel:${SITE.phone}`;
                }}
                className="mr-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call Now
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCTAClick('get_quote', 'header');
                  const targetElement = document.getElementById('contact');
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get a Quote
              </button>
            </nav>
            <button 
              className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg" 
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
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
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick(e);
                  handleCTAClick('get_quote', 'mobile_menu');
                  const targetElement = document.getElementById('contact');
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get a Quote
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      <main id="main-content">
      {/* Services Section - Now First on Page */}
      <section id="services" className="py-20 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-zinc-600 text-lg">Comprehensive solutions for your business needs</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={i}>
                <Card className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <CardHeader>
                    <div className="service-icon-wrapper mb-4">
                      <div className="text-indigo-600 icon-pop icon-sparkle">
                        {service.icon}
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-indigo-600 transition-colors text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-zinc-600 mb-4">{service.desc}</p>
                    
                    {/* Dropdown Menu */}
                    <div className="mb-4">
                      <button
                        onClick={() => setOpenDropdowns(prev => ({ ...prev, [i]: !prev[i] }))}
                        className="w-full flex items-center justify-between px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-sm font-medium text-indigo-700 transition-colors"
                      >
                        <span>View Products & Services</span>
                        <ArrowRight className={`w-4 h-4 transition-transform ${openDropdowns[i] ? 'rotate-90' : ''}`} />
                      </button>
                      
                      {openDropdowns[i] && (
                        <div className="mt-2 border border-indigo-200 rounded-lg bg-white shadow-sm">
                          <ul className="py-2">
                            {service.products?.map((product, idx) => (
                              <li key={idx} className="px-4 py-2 text-sm text-zinc-700 hover:bg-indigo-50 transition-colors border-b border-indigo-100 last:border-b-0">
                                <div className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                  <span>{product}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCTAClick('get_started', `service_${service.title}`);
                        const targetElement = document.getElementById('contact');
                        if (targetElement) {
                          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="mt-auto w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Get Started
                    </button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCTAClick('get_free_consultation', 'hero');
                    const targetElement = document.getElementById('contact');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="inline-flex items-center justify-center rounded-2xl text-lg px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Get Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <a href={`tel:${SITE.phone}`} onClick={() => handleCTAClick('call_now', 'hero')} className="px-5 py-3 rounded-2xl border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 no-underline font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors" aria-label={`Call ${SITE.phone}`}>
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a 
                  href="#pricing" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleCTAClick('view_pricing', 'hero');
                    const targetElement = document.getElementById('pricing');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }} 
                  className="px-5 py-3 rounded-2xl border border-zinc-300 text-sm hover:bg-zinc-50 no-underline font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  View Pricing
                </a>
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
                  <a href={`tel:${SITE.phone}`} className="no-underline hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded" aria-label={`Call ${SITE.phone}`}>{SITE.phone}</a>
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

      <section id="ilawyer" className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">iLawyer</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto mb-8">
              AI-powered legal assistance and document preparation for businesses in Newfoundland & Labrador.
            </p>
            {/* Prominent CTA Banner */}
            <div className="mt-8 mb-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4">
                  <FileText className="w-12 h-12 mx-auto opacity-90" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-indigo-100 mb-6 max-w-xl">
                  Get instant preliminary legal guidance from our AI legal assistant. Start your first consultation free.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCTAClick('start_free_consultation', 'ilawyer_banner');
                      const targetElement = document.getElementById('contact');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }} 
                    className="rounded-2xl bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 font-semibold flex items-center gap-2"
                  >
                    Start Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
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
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCTAClick('get_started', 'ilawyer_legal_docs');
                      const targetElement = document.getElementById('contact');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }} 
                    className="rounded-2xl w-full"
                  >
                    Get Started
                  </Button>
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
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCTAClick('learn_more', 'ilawyer_ai_assistant');
                      const targetElement = document.getElementById('contact');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }} 
                    className="rounded-2xl w-full"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="provet" className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">24/7 AI Veterinary Care for Your Best Friend</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto text-lg mb-6">
              Complete canine health management at a fraction of traditional vet costs. AI-powered consultations, health records, vaccination tracking, and instant expert guidance whenever your dog needs it.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-6" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCTAClick('start_free_trial', 'provet_hero');
                  const targetElement = document.getElementById('contact');
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              >
                Start Free Trial
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCTAClick('view_pricing', 'provet_hero');
                  const targetElement = document.getElementById('pricing');
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900 font-semibold transition-colors no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              >
                View Pricing
              </a>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <span>💰 Save up to 80% compared to traditional vet visits</span>
            </div>
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
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">AI-Powered Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">
                    Get instant expert guidance for your dog's health 24/7. AI-powered consultations available whenever you need them.
                  </p>
                  <ul className="space-y-2 text-zinc-600 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 AI veterinary consultations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Health records management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Vaccination tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Instant expert guidance</span>
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCTAClick('start_free_trial', 'provet_ai_consultations');
                      const targetElement = document.getElementById('contact');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                  >
                    Start Free Trial
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
                  <CardTitle className="group-hover:text-indigo-600 transition-colors">Complete Canine Health Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 mb-4">
                    Save up to 80% compared to traditional vet visits. Comprehensive health management at a fraction of the cost.
                  </p>
                  <ul className="space-y-2 text-zinc-600 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Complete health records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Vaccination reminders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Cost-effective care</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Expert guidance on demand</span>
                    </li>
                  </ul>
                  <a
                    href="#pricing"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCTAClick('view_pricing', 'provet_health_mgmt');
                      const targetElement = document.getElementById('pricing');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                  >
                    View Pricing
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
                        // Use relative path - works in both dev and production
                        const apiUrl = '/api/checkout';
                        
                        const response = await fetch(apiUrl, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            packageName: 'Business Growth Package',
                            amount: 1499,
                            isRecurring: true,
                          }),
                        });
                        
                        const data = await response.json();
                        
                        if (!response.ok || data.error) {
                          const errorMsg = data.error || data.details || 'Payment system error';
                          console.error('Checkout API error:', { status: response.status, error: errorMsg, data });
                          alert(`❌ Payment Error\n\n${errorMsg}\n\nIf this persists, contact:\n📧 ${SITE.email}\n📞 ${SITE.phone}`);
                          setLoadingCheckout(prev => ({ ...prev, businessGrowth: false }));
                          return;
                        }
                        
                        if (data.url) {
                          window.location.href = data.url;
                        } else {
                          throw new Error('No checkout URL received from server');
                        }
                      } catch (error) {
                        console.error('Checkout error:', error);
                        alert(`❌ Unable to start checkout\n\n${error.message || 'Network error. Please check your connection.'}\n\nContact us:\n📧 ${SITE.email}\n📞 ${SITE.phone}`);
                        setLoadingCheckout(prev => ({ ...prev, businessGrowth: false }));
                      }
                    }}
                    className="rounded-2xl w-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all" 
                    disabled={loadingCheckout.businessGrowth}
                    aria-label={loadingCheckout.businessGrowth ? 'Processing payment...' : 'Subscribe to Business Growth Package for $1,499 per month'}
                  >
                    {loadingCheckout.businessGrowth ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="loading-spinner" aria-hidden="true"></span>
                        Processing...
                      </span>
                    ) : (
                      'Subscribe - $1,499/month'
                    )}
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCTAClick('pricing_click', 'ai_solutions');
                      const targetElement = document.getElementById('contact');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Get Quote
                  </button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection className="text-center mt-8">
            <p className="text-zinc-600 mb-4">Need a custom solution? We offer flexible packages tailored to your needs.</p>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                handleCTAClick('schedule_consultation', 'pricing_section');
                const targetElement = document.getElementById('contact');
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }} 
              className="no-underline"
            >
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
          
          {/* AI Audit Agent Promo */}
          <AnimatedSection className="mb-12">
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-6 h-6" />
                      <span className="text-indigo-100 font-medium">NEW: AI-Powered Business Audit</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Get Your Business Audit in 5 Minutes</h3>
                    <p className="text-indigo-100 mb-4">
                      Instant AI-powered analysis with actionable recommendations. Free preview available!
                    </p>
                    <ul className="space-y-2 text-indigo-100 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>4 category scores (Marketing, Operations, Financial, Growth)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Top 5 priority actions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Full report for $99</span>
                      </li>
                    </ul>
                    <a 
                      href="/business-audit-agent" 
                      className="no-underline inline-block"
                    >
                      <Button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 font-semibold rounded-2xl">
                        Try Free Preview
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                  <div className="flex-shrink-0">
                    <Bot className="w-32 h-32 opacity-80" />
                  </div>
                </div>
              </CardContent>
            </Card>
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
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCTAClick('get_started', 'ai_agents_section');
                const targetElement = document.getElementById('contact');
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </button>
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
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCTAClick('contact_us', 'partnership_section');
                const targetElement = document.getElementById('contact');
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Contact Us <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </AnimatedSection>
        </div>
      </section>

      <section id="mobile-apps" className="py-20 bg-gradient-to-b from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <div className="mb-6">
              <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-90" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Get Our Mobile App</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
              Access CrownWorksNL services on the go! Our mobile apps are available for both Android and iOS devices.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <AnimatedSection>
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Android App</h3>
                    <p className="text-indigo-100 mb-4">
                      Available on Google Play Store. Download now for instant access to all CrownWorksNL services.
                    </p>
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.crownworksnl.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => handleCTAClick('download_app', 'android')}
                      className="no-underline inline-block"
                    >
                      <Button className="rounded-2xl bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 font-semibold flex items-center gap-2 mx-auto">
                        <Download className="w-5 h-5" />
                        Get on Google Play
                      </Button>
                    </a>
                    <p className="text-xs text-indigo-200 mt-3">
                      <a 
                        href="https://play.google.com/store/apps/details?id=com.crownworksnl.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-200 hover:text-white underline"
                      >
                        Direct Link to Play Store
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection>
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">iOS App</h3>
                    <p className="text-indigo-100 mb-4">
                      Available on Apple App Store. Download now for instant access to all CrownWorksNL services.
                    </p>
                    <a 
                      href="https://apps.apple.com/app/crownworksnl/id1234567890" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => handleCTAClick('download_app', 'ios')}
                      className="no-underline inline-block"
                    >
                      <Button className="rounded-2xl bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 font-semibold flex items-center gap-2 mx-auto">
                        <Download className="w-5 h-5" />
                        Get on App Store
                      </Button>
                    </a>
                    <p className="text-xs text-indigo-200 mt-3">
                      <a 
                        href="https://apps.apple.com/app/crownworksnl/id1234567890" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-200 hover:text-white underline"
                      >
                        Direct Link to App Store
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">App Features</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-indigo-100">Full website functionality</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-indigo-100">Secure payment processing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-indigo-100">Contact forms & consultations</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-indigo-100">iLawyer & ProVet services</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-indigo-100">AI agent information</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-indigo-100">Offline access support</span>
                </div>
              </div>
            </div>
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('✅ Connect with Glen button clicked!');
                      handleCTAClick('connect_glen', 'about_section');
                      setTimeout(() => {
                        const targetElement = document.getElementById('contact');
                        if (targetElement) {
                          console.log('✅ Scrolling to contact section');
                          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                          console.error('❌ Contact section not found!');
                        }
                      }, 100);
                    }}
                    style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Connect with Glen <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('✅ Phone button clicked!');
                        handleCTAClick('call_now', 'contact_section');
                        window.location.href = `tel:${SITE.phone}`;
                      }}
                      style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                      className="text-left text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded cursor-pointer bg-transparent border-none p-0"
                      aria-label={`Call ${SITE.phone}`}
                    >
                      {SITE.phone}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 flex-shrink-0" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('✅ Email button clicked!');
                        handleCTAClick('email_contact', 'contact_section');
                        window.location.href = `mailto:${SITE.email}`;
                      }}
                      style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                      className="text-left text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded cursor-pointer bg-transparent border-none p-0"
                      aria-label={`Email ${SITE.email}`}
                    >
                      {SITE.email}
                    </button>
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
                    <div className="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg text-sm" role="alert" aria-live="polite">
                      <strong className="text-green-200">✓ Success!</strong> Thank you! Your message has been sent. We'll get back to you soon.
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
                        aria-label="Your name"
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors"
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
                        aria-label="Your email address"
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone (optional)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        aria-label="Your phone number (optional)"
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors"
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
                        aria-label="Your message"
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 resize-none transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                      className="w-full px-6 py-3 rounded-2xl bg-white text-indigo-600 font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Send contact message"
                    >
                      {formSubmitted ? 'Message Sent!' : 'Send Message'}
                    </button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
      </main>

      <footer className="bg-zinc-900 text-zinc-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-indigo-500" />
                <h3 className="text-white font-semibold text-lg">{SITE.name}</h3>
              </div>
              <p className="text-zinc-400 mb-4 leading-relaxed">
                Transforming businesses through AI and automation. We help organizations leverage cutting-edge technology to streamline operations, reduce costs, and unlock exponential growth potential.
              </p>
              <p className="text-zinc-500 text-sm">
                Founded by Glen Pollard
              </p>
              <p className="text-zinc-500 text-sm mt-2">
                AI Business Systems & Automation Solutions
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const targetElement = document.getElementById('services');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0"
                    style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                  >
                    Web Automation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const targetElement = document.getElementById('ai-agents');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0"
                    style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                  >
                    AI Agents
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = '/university';
                    }}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0"
                    style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                  >
                    Digital Products
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const targetElement = document.getElementById('services');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0"
                    style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                  >
                    Business Consulting
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const targetElement = document.getElementById('about');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0"
                    style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // WABAM Philosophy - scroll to about section or create dedicated section
                      const targetElement = document.getElementById('about');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0"
                    style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                  >
                    WABAM Philosophy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const targetElement = document.getElementById('contact');
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0"
                    style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-zinc-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-zinc-500 text-sm">
                &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
              </p>
              <p className="text-zinc-500 text-sm">
                Powered by AI & Automation
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Agent Widget */}
      <AIAgentWidget />
    </div>
  );
}
