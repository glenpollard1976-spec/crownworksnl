"use client";
import React, { useState } from "react";

const SITE = {
  name: "CrownWorksNL",
  phone: "+1 (709) 721-0340",
  url: "https://crownworksnl.com", // Your live site
};

const nav = [
  { label: "Services", href: "#services" },
  { label: "AI Agents", href: "#ai-agents" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "About Glen", href: "#about" },
  { label: "Why Us", href: "#why" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="font-sans text-zinc-900">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">{SITE.name}</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-purple-600 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 border rounded"
          >
            ☰
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <nav className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col p-4 space-y-3">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block hover:text-purple-600"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-purple-800 text-white text-center px-4">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            CrownWorksNL – Land & AI Services
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Helping Newfoundlanders with Crown Land opportunities and empowering
            small businesses with AI agents.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              Claim Crown Land →
            </a>
            <a
              href="#ai-agents"
              className="px-6 py-3 bg-white text-purple-800 hover:bg-gray-100 rounded-lg font-semibold"
            >
              Explore AI Agents →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">For all inquiries, email us at:</p>
        <a
          href={`mailto:${SITE.phone}`}
          className="text-lg font-semibold text-purple-700 hover:underline"
        >
          glenpollard@hotmail.com
        </a>
      </section>
    </main>
  );
}

