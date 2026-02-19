"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Leaf,
  TrendingUp,
  Users,
  Truck,
  Shield,
  Sun,
  Wheat,
  Apple,
  Carrot,
  Factory,
  Building,
  Sprout,
  Zap,
  User,
} from "lucide-react"
import farmerAnimation from '../assets/farmer.json'
import logo from "../assets//1749736593810.png"
import API_BASE_URL from "../config";
import '../animations/landing.css';
import Lottie from "lottie-react";

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(()=>{
    fetch(`${API_BASE_URL}/api/v1/ping`)
    .then(console.log("backend up"))
    .catch((err)=> console.log("some error occured backend down", err))
  },[])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>

      <div className="noise">
        {/* ── NAVBAR ── */}
        <header className="navbar">
          <div className="nav-logo">
            <img src={logo} alt="Farm Help logo" />
            <span className="nav-brand">Farm <span>Help</span></span>
          </div>

          <nav>
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a href="/signin/user" className="btn-ghost">Sign In</a>
            <a href="/signup/user" className="btn-primary">
              Get Started <ArrowRight size={14} />
            </a>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(m => !m)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <nav className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <div className="mobile-menu-actions">
            <a href="/signin/user" className="btn-ghost" style={{flex:1,justifyContent:'center',textAlign:'center'}}>Sign In</a>
            <a href="/signup/user" className="btn-primary" style={{flex:1,justifyContent:'center',textAlign:'center'}}>Get Started</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-left">
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              Revolutionizing Agriculture
            </div>

            <h1 className="hero-title">
              Direct Farm<br />
              to Business<br />
              <em>Connection.</em>
            </h1>

            <p className="hero-desc">
              Eliminate middlemen and maximize your profits. Connect directly with businesses looking for your crops.
            </p>

            <div className="hero-cta">
              <a href="/signin/user" className="btn-hero-primary">
                Get Started <ArrowRight size={16} />
              </a>
              <a href="#how-it-works" className="btn-hero-secondary">
                Learn More
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">5K+</div>
                <div className="stat-label">Farmers Onboard</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-number">1,200+</div>
                <div className="stat-label">Companies</div>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <div className="stat-number">₹10Cr+</div>
                <div className="stat-label">Transactions</div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-img-wrap">
              <Lottie
                animationData={farmerAnimation}
                loop={true}
                className="w-full h-auto"
              />
            </div>

            <div className="hero-decorative-text">FARM</div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-strip">
          <div className="marquee-inner">
            {[...Array(2)].map((_, i) => (
              ["Direct Farm to Business", "Higher Profit Margins", "Verified Farmers", "Simplified Logistics", "Fast Payments", "Secure Transactions", "Sustainable Agriculture", "Growth Support"].map((text, j) => (
                <div key={`${i}-${j}`} className="marquee-item">
                  <span className="marquee-dot" />
                  {text}
                </div>
              ))
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section id="features" className="features-section">
          <div className="features-header">
            <div>
              <div className="section-label">Features</div>
              <h2 className="section-title">Why Choose<br />Farm Help?</h2>
            </div>
            <p className="features-desc">
              Our platform offers unique benefits for both farmers and businesses — built on transparency, efficiency, and trust.
            </p>
          </div>

          <div className="features-grid">
            {[
              { icon: <TrendingUp size={20} />, title: "Higher Profits", desc: "Eliminate middlemen and increase your profit margins by up to 40%", num: "01" },
              { icon: <Users size={20} />, title: "Direct Connections", desc: "Build lasting relationships with businesses that value quality produce", num: "02" },
              { icon: <Truck size={20} />, title: "Simplified Logistics", desc: "Integrated tools for managing transportation and delivery seamlessly", num: "03" },
              { icon: <Zap size={20} />, title: "Fast Payments", desc: "Receive payments quickly and securely through our trusted platform", num: "04" },
              { icon: <Shield size={20} />, title: "Secure Platform", desc: "End-to-end encryption and verification for all transactions", num: "05" },
              { icon: <Sprout size={20} />, title: "Growth Support", desc: "Resources and tools to help your farm business scale and thrive", num: "06" },
            ].map((f) => (
              <div key={f.num} className="feature-card">
                <div className="feature-num">{f.num}</div>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="how-section">
          <div className="how-inner">
            <div className="how-header">
              <div className="section-label">Process</div>
              <h2 className="section-title">How Farm Help<br />Works</h2>
            </div>

            <div className="steps-grid">
              {[
                { num: "01", icon: <User size={20} />, title: "Create Your Profile", desc: "Sign up and create a detailed profile showcasing your farm and produce to attract the right buyers." },
                { num: "02", icon: <Wheat size={20} />, title: "List Your Produce", desc: "Add details about your available crops, quantities, and pricing — all in one place." },
                { num: "03", icon: <Building size={20} />, title: "Connect & Sell", desc: "Receive inquiries from businesses and negotiate deals directly, no intermediaries." },
              ].map((s) => (
                <div key={s.num} className="step-card">
                  <div className="step-number-wrap">
                    <div className="step-number">{s.num}</div>
                    <div className="step-line" />
                  </div>
                  <div className="step-icon">{s.icon}</div>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="ecosystem-card">
              <div>
                <div className="eco-side-title"><User size={13} /> Farmers</div>
                <ul className="eco-list">
                  {["Create detailed farm profiles", "List available crops & quantities", "Set your own fair prices", "Receive direct payments"].map(item => (
                    <li key={item}><span className="eco-bullet" />{item}</li>
                  ))}
                </ul>
              </div>

              <div className="eco-divider">
                <div className="eco-divider-line" />
                <div className="eco-center-icon"><Zap size={20} /></div>
                <div className="eco-divider-line" />
              </div>

              <div>
                <div className="eco-side-title"><Building size={13} /> Businesses</div>
                <ul className="eco-list">
                  {["Search for specific crops", "Connect with verified farmers", "Place orders & negotiate terms", "Track deliveries in real-time"].map(item => (
                    <li key={item}><span className="eco-bullet" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" className="testimonials-section">
          <div className="testimonials-header">
            <div>
              <div className="section-label">Testimonials</div>
              <h2 className="section-title">Success Stories</h2>
            </div>
            <p style={{ fontSize: "0.9375rem", color: "var(--soil)", maxWidth: "300px", textAlign: "right", fontWeight: 300 }}>
              Hear from farmers and businesses who have transformed their operations
            </p>
          </div>

          <div className="testimonials-grid">
            {[
              { text: "Since joining Farm Help, I've increased my profit margins by 35%. The direct connection with restaurants has transformed my small farm business.", name: "John Smith", role: "Organic Vegetable Farmer", icon: <User size={20} /> },
              { text: "As a restaurant owner, Farm Help has allowed me to source the freshest ingredients directly from local farmers. The quality is exceptional and our customers can taste the difference.", name: "Sarah Johnson", role: "Restaurant Owner", icon: <Building size={20} /> },
              { text: "The logistics support on Farm Help is incredible. I can track my deliveries and manage my inventory all in one place. It's revolutionized how I run my farm.", name: "Rajesh Kumar", role: "Rice Farmer", icon: <User size={20} /> },
              { text: "As a food processing company, we need consistent quality and supply. Farm Help connects us directly with verified farmers, ensuring we get the best raw materials year-round.", name: "Priya Sharma", role: "Food Processing CEO", icon: <Factory size={20} /> },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-quote-mark">❝</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.icon}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="stats-row">
            {[
              { num: "35%", label: "Average Profit Increase" },
              { num: "5,000+", label: "Farmers Onboarded" },
              { num: "1,200+", label: "Business Partners" },
              { num: "98%", label: "Satisfaction Rate" },
            ].map((s) => (
              <div key={s.label} className="stat-block">
                <span className="stat-block-number">{s.num}</span>
                <span className="stat-block-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-inner">
            <h2 className="cta-title">
              Ready to Transform<br />
              <em>Your Business?</em>
            </h2>
            <p className="cta-desc">
              Join thousands of farmers and businesses already benefiting from direct connections.
            </p>

            <form
              className="cta-form"
              onSubmit={(e) => {
                e.preventDefault()
                alert(`Thank you for your interest! We'll contact you at: ${email}`)
                setEmail("")
              }}
            >
              <input
                className="cta-input"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="cta-submit">
                Get Started <ArrowRight size={15} />
              </button>
            </form>

            <div className="cta-badges">
              {[
                { icon: <Shield size={12} />, label: "Secure Transactions" },
                { icon: <Users size={12} />, label: "5,000+ Farmers" },
                { icon: <Leaf size={12} />, label: "Sustainable Agriculture" },
                { icon: <Zap size={12} />, label: "Fast Payments" },
              ].map((b) => (
                <div key={b.label} className="cta-badge">
                  {b.icon} {b.label}
                </div>
              ))}
            </div>

            <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "rgba(253,250,245,0.35)" }}>
              By signing up, you agree to our{" "}
              <a href="/terms" style={{ color: "rgba(253,250,245,0.55)", textDecoration: "underline" }}>Terms & Conditions</a>
            </p>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="contact-section">
          <div className="contact-grid">
            <div>
              <div className="section-label">Contact Us</div>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>Get in Touch</h2>
              <p style={{ fontSize: "1.0625rem", color: "var(--soil)", fontWeight: 300, lineHeight: 1.7, marginBottom: "2.5rem" }}>
                Have questions about Farm Help? Our team is here to assist you.
              </p>

              {[
                { label: "Phone", text: "+91 123 456 7890", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.19 12 19.79 19.79 0 0 1 1.12 3.38 2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
                { label: "Email", text: "support@farmhelp.com", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                { label: "Address", text: "123 Agri Tower, New Delhi", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
                { label: "Hours", text: "Mon–Fri: 9AM – 6PM IST", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
              ].map((item) => (
                <div key={item.label} className="contact-info-item">
                  <div className="contact-info-icon">{item.icon}</div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-text">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-form-wrap">
              <h3 className="form-title">Send a Message</h3>
              <p className="form-subtitle">Fill out the form below and we'll get back to you shortly.</p>

              <form>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">First Name</label>
                    <input className="form-input" placeholder="John" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Last Name</label>
                    <input className="form-input" placeholder="Smith" />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="john.smith@example.com" />
                </div>

                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea className="form-input form-textarea" placeholder="Tell us how we can help..." />
                </div>

                <button type="button" className="form-submit">
                  Send Message <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-brand">
            <img src={logo} alt="Farm Help" />
            <span className="footer-brand-name">Farm Help</span>
          </div>

          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Farm Help. All rights reserved.
          </p>

          <ul className="footer-links">
            <li><a href="/terms">Terms</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </footer>
      </div>
    </>
  )
}