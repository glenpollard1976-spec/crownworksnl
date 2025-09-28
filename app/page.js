"use client";
import React, { useState } from "react";

// ---- Site constants ----
const SITE = {
  name: "CrownWorksNL",
  phone: "+1 (709) 721-0340",
  url: "https://crownworksnl.vercel.app", // Add your live Vercel link here
};

// ---- Navigation ----
const nav = [
  { label: "Services", href: "#services" },
  { label: "AI Agents", href: "#ai-agents" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "About Glen", href: "#about" },
  { label: "Why Us", href: "#why" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// ---- Page Component ----
export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="font-sans text-zinc-900 scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-bold text-purple-800">
            {SITE.name}
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-purple-800 hover:text-purple-600 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-purple-800 hover:bg-purple-100"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="md:hidden border-t bg-white">
            <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col gap-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-purple-800 hover:text-purple-600"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative text-white py-24 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(64,0,128,0.6), rgba(128,0,128,0.6)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <h1 className="text-5xl font-bold mb-6">
          {SITE.name} - Land & AI Services
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Helping Newfoundlanders with Crown Land opportunities and empowering
          small businesses with AI agents.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#opportunities"
            className="bg-white/90 hover:bg-white text-purple-800 px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition duration-300"
          >
            Claim Crown Land →
          </a>
          <a
            href="#ai-agents"
            className="bg-black/20 hover:bg-black/30 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition duration-300 border border-white/40"
          >
            Explore AI Agents →
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-purple-50 text-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Contact Us</h2>
        <p className="mb-4">For all inquiries, email us at:</p>
        <a
          href="mailto:glenpollard@hotmail.com"
          className="text-lg font-semibold text-purple-700 hover:underline"
        >
          glenpollard@hotmail.com
        </a>
      </section>
    </main>
  );
}
