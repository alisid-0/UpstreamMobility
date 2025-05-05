import { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import car1 from './assets/tire.jpg';
import odometer from './assets/odometer.jpg';
import sideview from './assets/side.jpg';
import back from './assets/back.jpg';
import tuvnord from './assets/tuvnord.jpg';
import dashboard2 from './assets/dashboard2.jpg';
import maintenance from './assets/maintenance.jpg';

// Import Motion differently to avoid linter errors
const MotionDiv = motion.div;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const sections = ['hero', 'features', 'technology', 'about', 'contact'];
  const observers = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Intersection Observer setup for each section
    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section);
            }
          });
        },
        { threshold: 0.3 }
      );

      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
        observers.current.push(observer);
      }
    });

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.current.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">UPSTREAM</span>
            <span className="logo-accent">MOBILITY</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            <a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Home</a>
            <a href="#features" className={activeSection === 'features' ? 'active' : ''}>Features</a>
            <a href="#technology" className={activeSection === 'technology' ? 'active' : ''}>Technology</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
            <div className="nav-cta">
              <a href="#contact" className="cta-button">Get Started</a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-toggle">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="icon" />
              ) : (
                <Bars3Icon className="icon" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="#hero" className={activeSection === 'hero' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#features" className={activeSection === 'features' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#technology" className={activeSection === 'technology' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Technology</a>
          <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#contact" className="mobile-cta" onClick={() => setIsMenuOpen(false)}>Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-overlay"></div>
        <img 
          src={car1} 
          alt="Luxury car dashboard" 
          className="hero-video"
        />
        <div className="hero-content">
          <div className="hero-text">
            <h1>NEXT GENERATION<br />CAR DIAGNOSTICS</h1>
            <p>Powered by TÜV NORD, our OBD2 scanner combines cutting-edge technology with unmatched precision for complete vehicle health monitoring.</p>
          </div>
          <div className="hero-cta">
            <a href="#features" className="cta-button-outline">Explore Features</a>
            <a href="#contact" className="cta-button">Get Started</a>
          </div>
          <div className="hero-clients">
            <p>Trusted by leading automotive brands</p>
            <div className="client-logos">
              <div className="client-logo">BMW</div>
              <div className="client-logo">AUDI</div>
              <div className="client-logo">MERCEDES</div>
              <div className="client-logo">TESLA</div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div>
            <span className="scroll-arrows">
              ↓
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <span className="section-tag">FEATURES</span>
          <h2>Advanced Capabilities</h2>
          <p>Experience unparalleled diagnostic precision and comprehensive vehicle analysis</p>
        </div>
        
        <div className="features-grid">
          {[
            {
              title: "Real-time Analytics",
              description: "Monitor your vehicle's vital systems with millisecond precision and instant feedback.",
              icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
              className: "real-time-analytics"
            },
            {
              title: "Comprehensive Diagnostics",
              description: "Access detailed error codes and system analyses from all vehicle subsystems.",
              icon: dashboard2
            },
            {
              title: "Predictive Maintenance",
              description: "AI-powered algorithms predict potential failures before they occur, saving time and money.",
              icon: maintenance
            },
            {
              title: "TÜV NORD Certified",
              description: "Meet the highest industry standards with our TÜV NORD certified technology.",
              icon: tuvnord
            }
          ].map((feature, index) => (
            <div key={index} className={`feature-card ${feature.className || ''}`}>
              <div className="feature-image">
                <img src={feature.icon} alt={feature.title} />
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="technology-section">
        <div className="tech-container">
          <div className="tech-content">
            <span className="section-tag">TECHNOLOGY</span>
            <h2>Cutting-Edge Architecture</h2>
            <p className="tech-intro">
              Our proprietary system combines advanced hardware with sophisticated algorithms to deliver the most accurate and comprehensive vehicle diagnostics available.
            </p>
            <ul className="tech-features">
              {[
                "Multi-spectrum sensor array with 0.001% error margin",
                "Military-grade data encryption and security",
                "Cloud-based analytics with real-time processing",
                "Compatible with 99.8% of vehicles manufactured since 1996"
              ].map((item, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="tech-cta">
              <a href="#contact" className="cta-button">Learn More</a>
            </div>
          </div>
          <div className="tech-image">
            <img src={back} alt="Advanced Technology" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-container">
            <span className="section-tag">ABOUT US</span>
            <h2>The Future of Automotive Diagnostics</h2>
            <div className="about-grid">
              <div className="about-image">
                <img src={sideview} alt="Upstream Inspections Team" />
              </div>
              <div className="about-text">
                <p>Founded by a team of automotive and technology experts, Upstream Inspections (DBA Upstream Mobility) is revolutionizing how we understand and maintain vehicles.</p>
                <p>With decades of combined experience and partnerships with leading automotive manufacturers, we've developed a diagnostic system that's not just accurate, but anticipatory.</p>
                <p>Our mission is to bring professional-grade diagnostics to every garage and driveway, empowering drivers and mechanics alike with unprecedented insights into vehicle health.</p>
                <div className="stats-container">
                  <div className="stat-item">
                    <span className="stat-number">99.8%</span>
                    <span className="stat-label">ACCURACY</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">10M+</span>
                    <span className="stat-label">VEHICLES DIAGNOSED</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">SUPPORT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="product" className="product-section">
        <div className="product-container">
          <div className="product-details">
            <span className="section-tag">OUR PRODUCT</span>
            <h2>OBD2 Ultra Scanner Pro</h2>
            <p className="product-description">
              The culmination of years of research and development, our flagship scanner represents the pinnacle of diagnostic technology.
            </p>
            <ul className="product-specs">
              <li>7" Ultra HD touchscreen display</li>
              <li>Bluetooth 5.2 & WiFi 6E connectivity</li>
              <li>48-hour battery life</li>
              <li>IP68 dust/water resistance</li>
              <li>CNC machined aerospace-grade aluminum body</li>
            </ul>
            <div className="product-cta">
              <a href="#contact" className="cta-button">Pre-Order Now</a>
              <div className="price-tag">
                <span className="original-price">$499.99</span>
                <span className="current-price">$399.99</span>
              </div>
            </div>
          </div>
          <div className="product-image">
            <img src={odometer} alt="OBD2 Scanner" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <span className="section-tag">TESTIMONIALS</span>
          <h2>What Our Clients Say</h2>
          <div className="testimonials-grid">
            {[
              {
                quote: "The precision of this device is astounding. It's identified issues even our dealership's equipment missed.",
                author: "Michael T., BMW Master Technician",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              },
              {
                quote: "As a fleet manager, this tool has paid for itself multiple times over by preventing major breakdowns.",
                author: "Sarah J., Fleet Operations Director",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80"
              },
              {
                quote: "The interface is intuitive and the diagnostic depth is unmatched. Absolutely worth the investment.",
                author: "Daniel R., Automotive Engineer",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="quote-text">{testimonial.quote}</p>
                  <div className="testimonial-author">
                    <img src={testimonial.image} alt={testimonial.author} />
                    <p>{testimonial.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-content">
            <span className="section-tag">CONTACT US</span>
            <h2>Ready to Transform Your Diagnostics?</h2>
            <p className="contact-intro">
              Fill out the form below, and one of our specialists will get in touch to discuss how our technology can meet your needs.
            </p>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company (Optional)</label>
                <input type="text" id="company" placeholder="Enter your company" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="4" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="form-submit">Submit Inquiry</button>
            </form>
          </div>
          <div className="contact-image">
            <img src="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Support Team" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <div className="logo">
                <span className="logo-text">UPSTREAM</span>
                <span className="logo-accent">MOBILITY</span>
              </div>
              <p>Upstream Inspections DBA Upstream Mobility - Revolutionizing automotive diagnostics with cutting-edge technology.</p>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#technology">Technology</a>
                <a href="#product">Products</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-links-column">
                <h4>Resources</h4>
                <a href="#">Documentation</a>
                <a href="#">Support</a>
                <a href="#">API</a>
                <a href="#">Blog</a>
              </div>
              <div className="footer-links-column">
                <h4>Connect</h4>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Upstream Inspections DBA Upstream Mobility. All rights reserved.</p>
            <p>
              <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
