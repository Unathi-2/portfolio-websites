class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #1e293b;
          color: white;
          padding: 3rem 1rem;
          margin-top: 4rem;
        }
        .dark footer {
          background: #111827;
        }
        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }
        .footer-section h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #60a5fa;
        }
        .footer-section p {
          margin-bottom: 0.5rem;
          color: #cbd5e1;
        }
        .footer-section a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-section a:hover {
          color: #60a5fa;
        }
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .social-link {
          color: white;
          transition: all 0.3s;
          padding: 0.5rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
        }
        .social-link:hover {
          color: #60a5fa;
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        .copyright {
          text-align: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #334155;
          color: #94a3b8;
        }
        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h3>Kekeletso Basholo</h3>
            <p>Transforming data into insights that drive decisions and create value.</p>
            <div class="social-links">
              <a href="https://linkedin.com/in/kekeletso-basholo" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://github.com/kekeletso-basholo" class="social-link" aria-label="GitHub" target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <p><a href="index.html">Home</a></p>
            <p><a href="projects.html">Projects</a></p>
            <p><a href="contact.html">Contact</a></p>
          </div>
          <div class="footer-section">
            <h3>Contact Info</h3>
            <p>Email: unathibasholo@gmail.com</p>
            <p>Phone: +27 630 167 901</p>
            <p>Cape Town, South Africa</p>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; ${new Date().getFullYear()} Kekeletso Basholo. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);