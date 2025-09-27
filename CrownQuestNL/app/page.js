
"use client";
import { motion } from "framer-motion";
import { Crown, Sparkles, ShieldCheck, MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "./globals.css";

const nav = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Consulting & Strategy", desc: "Roadmaps, audits, and hands‑on guidance to grow with confidence." },
  { icon: <Sparkles className="w-6 h-6" />, title: "Brand & Creative", desc: "Identity systems, content packages, and thumbnail/shorts kits." },
  { icon: <Crown className="w-6 h-6" />, title: "Crown Land Services", desc: "Simplifying the process of obtaining Crown Land with trusted local expertise." },
];

const features = [
  "Proud member of Qalipu First Nation",
  "Based in Corner Brook, Newfoundland",
  "Specializing in simplifying Crown Land access",
  "Clear pricing & fast turnaround",
  "You own your data and assets",
  "Ongoing support plans",
];

const testimonials = [
  { quote: "CrownQuestNL took us from idea to launch in two weeks. Our bookings doubled in month one.", name: "M. Jacobs", role: "Owner, Harbor Outfitters" },
  { quote: "Smart strategy + crisp design. They handled site, branding, and shorts—stress free.", name: "R. Bennett", role: "Founder, EastRock Guides" },
];

const fade = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 font-semibold no-underline">
              <Crown className="w-6 h-6" />
              <span>CrownQuestNL</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-sm hover:text-zinc-900 text-zinc-600 no-underline">
                  {n.label}
                </a>
              ))}
              <a href="#contact" className="no-underline">
                <Button className="rounded-2xl">Get a Quote</Button>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="w-[50rem] h-[50rem] rounded-full bg-indigo-200/40 blur-3xl absolute -top-40 -right-32" />
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
          <motion.div variants={fade} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 mb-4">
                <Sparkles className="w-4 h-4" />
                Empowering business & land ownership in NL
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Grow boldly. Land your future with confidence.
              </h1>
              <p className="mt-4 text-zinc-600 text-lg">
                CrownQuestNL, founded by Glen Pollard of the Qalipu First Nation, provides strategy, design, and Crown Land services to simplify your path to ownership and growth in Newfoundland & Labrador.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="no-underline"><Button className="rounded-2xl">Start a Project <ArrowRight className="ml-2 w-4 h-4" /></Button></a>
                <a href="#services" className="px-5 py-3 rounded-2xl border border-zinc-300 text-sm hover:bg-zinc-50 no-underline">Explore Services</a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-zinc-600">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />Corner Brook, NL</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" />709‑721‑0340</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" />hello@crownquestnl.ca</div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-white shadow-xl border border-zinc-200 p-4 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                  <div className="rounded-2xl bg-gradient-to-br from-indigo-200 to-indigo-50" />
                  <div className="rounded-2xl bg-gradient-to-br from-amber-200 to-amber-50" />
                  <div className="rounded-2xl bg-gradient-to-br from-rose-200 to-rose-50" />
                  <div className="rounded-2xl bg-gradient-to-br from-emerald-200 to-emerald-50" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold">Services</h2>
            <p className="mt-2 text-zinc-600">From business growth to land ownership, we make the process simple and effective.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {services.map((s) => (
              <Card key={s.title} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100">{s.icon}</span>
                    {s.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600">{s.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Discovery call & plan</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Transparent pricing</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Launch support</li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold">About CrownQuestNL</h2>
            <p className="mt-3 text-zinc-600">
              Founded by Glen Pollard, a proud member of the Qalipu First Nation, CrownQuestNL blends Indigenous values, strategic design, and local expertise. Our mission is to empower communities and individuals by simplifying access to Crown Land and supporting business growth.
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{f}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="rounded-3xl border border-zinc-200 p-6 bg-white shadow-sm">
              <div className="text-sm text-zinc-600">Sample timeline</div>
              <ol className="mt-3 space-y-4">
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">1</div>
                  <div>
                    <div className="font-medium">Discovery & Scope</div>
                    <div className="text-zinc-600 text-sm">1–2 days • Goals, land needs, and deliverables.</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">2</div>
                  <div>
                    <div className="font-medium">Design & Build</div>
                    <div className="text-zinc-600 text-sm">5–10 days • Brand, sites, and Crown Land paperwork guidance.</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">3</div>
                  <div>
                    <div className="font-medium">Launch & Support</div>
                    <div className="text-zinc-600 text-sm">1–2 days • Go‑live, training, and ongoing support.</div>
                  </div>
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="why" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl">
              <CardHeader><CardTitle>Indigenous Leadership</CardTitle></CardHeader>
              <CardContent className="text-zinc-600">Led by Glen Pollard of the Qalipu First Nation, our services reflect respect for community, land, and opportunity.</CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader><CardTitle>Crown Land Simplified</CardTitle></CardHeader>
              <CardContent className="text-zinc-600">We guide you through the process of securing Crown Land in Newfoundland & Labrador—stress free.</CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader><CardTitle>Trusted Local Expertise</CardTitle></CardHeader>
              <CardContent className="text-zinc-600">With roots in Corner Brook, we understand local markets and land policies to give you a clear path forward.</CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold">
            Clients say…
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {testimonials.map((t, i) => (
              <motion.blockquote key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-3xl p-6 border bg-white shadow-sm">
                <p className="text-lg">“{t.quote}”</p>
                <footer className="mt-3 text-sm text-zinc-600">— {t.name}, {t.role}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold">Let’s build something great</h2>
              <p className="mt-2 text-zinc-600">Tell us a bit about your project or land needs and we’ll reply within one business day.</p>
              <div className="mt-6 space-y-3 text-sm text-zinc-700">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />Corner Brook, Newfoundland & Labrador</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" />709‑721‑0340</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" />hello@crownquestnl.ca</div>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="rounded-3xl border border-zinc-200 bg-white shadow-sm p-6 space-y-4">
              <div>
                <label className="text-sm">Name</label>
                <input className="mt-1 w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Your full name" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Email</label>
                  <input type="email" className="mt-1 w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm">Phone</label>
                  <input className="mt-1 w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300" placeholder="709‑721‑0340" />
                </div>
              </div>
              <div>
                <label className="text-sm">Budget</label>
                <select className="mt-1 w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300">
                  <option>Under $2,500</option>
                  <option>$2,500–$5,000</option>
                  <option>$5,000–$10,000</option>
                  <option>$10,000+</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Project / Land Details</label>
                <textarea className="mt-1 w-full border rounded-xl px-3 py-2 h-28 outline-none focus:ring-2 focus:ring-indigo-300" placeholder="What are you building or applying for?" />
              </div>
              <Button type="submit" className="w-full rounded-2xl">Request Quote</Button>
              <p className="text-xs text-zinc-500">Submitting this form won’t send anything from this preview.</p>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="py-10 border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Crown className="w-4 h-4" />
            <span>© {new Date().getFullYear()} CrownQuestNL • Glen Pollard. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-600">
            <a href="#services" className="hover:text-zinc-900 no-underline">Services</a>
            <a href="#about" className="hover:text-zinc-900 no-underline">About</a>
            <a href="#contact" className="hover:text-zinc-900 no-underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
