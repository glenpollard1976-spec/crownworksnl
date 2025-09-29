export default function Page() {
  return (
    <main className="font-sans text-zinc-100 scroll-smooth">
      {/* Navbar */}
      <nav className="navbar">
        <a href="#services">Services</a>
        <a href="#ai-agents">AI Agents</a>
        <a href="#opportunities">Opportunities</a>
        <a href="#about">About Glen</a>
        <a href="#why">Why Us</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>CrownWorksNL - Land & AI Services</h1>
        <p>Helping Newfoundlanders with Crown Land opportunities and empowering small businesses with AI agents.</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>For all inquiries, email us at:</p>
        <a href="mailto:glenpollard@hotmail.com">glenpollard@hotmail.com</a>
      </section>
    </main>
  );
}



