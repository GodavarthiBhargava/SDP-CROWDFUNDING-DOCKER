import "./css/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact FundConnect</h1>
        <p>Have questions or need help? Reach out to us and we’ll get back to you promptly.</p>
      </div>

      <div className="contact-content">
        {/* Contact Info Cards */}
        <div className="contact-info">
          <div className="info-card">
            <div className="icon">📧</div>
            <h3>Email Us</h3>
            <p>support@fundconnect.com</p>
          </div>
          <div className="info-card">
            <div className="icon">📞</div>
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="info-card">
            <div className="icon">🏢</div>
            <h3>Office</h3>
            <p>123 FundConnect Street, Bangalore, India</p>
          </div>
          <div className="info-card">
            <div className="icon">💬</div>
            <h3>Support Chat</h3>
            <p>Available 24/7 via our platform</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="contact-message">
          <h2>Send us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      <div className="contact-footer">
        <p>Follow us on social media:</p>
        <div className="social-links">
          <a href="#" className="social-link">Facebook</a>
          <a href="#" className="social-link">Twitter</a>
          <a href="#" className="social-link">Instagram</a>
          <a href="#" className="social-link">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
