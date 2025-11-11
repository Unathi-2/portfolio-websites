class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }
        .dark nav {
          background: rgba(17, 24, 39, 0.95);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        .nav-scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        }
        .dark .nav-scrolled {
          background: rgba(17, 24, 39, 0.98);
        }
        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          height: 5rem;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          color: #2563eb;
          font-weight: bold;
          font-size: 1.5rem;
          text-decoration: none;
          transition: transform 0.3s ease;
        }
        .dark .logo {
          color: #60a5fa;
        }
        .logo:hover {
          transform: scale(1.05);
        }
        .nav-links {
          display: none;
          gap: 2.5rem;
        }
        .nav-link {
          position: relative;
          padding: 0.5rem 0;
          color: #4b5563;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .dark .nav-link {
          color: #d1d5db;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #2563eb;
          transition: width 0.3s ease;
        }
        .dark .nav-link::after {
          background: #60a5fa;
        }
        .nav-link:hover {
          color: #2563eb;
        }
        .dark .nav-link:hover {
          color: #60a5fa;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .active {
          color: #2563eb;
        }
        .dark .active {
          color: #60a5fa;
        }
        .active::after {
          width: 100%;
        }
        .mobile-menu-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.375rem;
          transition: background-color 0.3s ease;
          color: #4b5563;
        }
        .dark .mobile-menu-button {
          color: #d1d5db;
        }
        .mobile-menu-button:hover {
          background-color: #f3f4f6;
        }
        .dark .mobile-menu-button:hover {
          background-color: #374151;
        }
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.375rem;
          transition: background-color 0.3s ease;
          color: #4b5563;
          margin-left: 1rem;
        }
        .dark .theme-toggle {
          color: #d1d5db;
        }
        .theme-toggle:hover {
          background-color: #f3f4f6;
        }
        .dark .theme-toggle:hover {
          background-color: #374151;
        }
        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
          .mobile-menu-button {
            display: none;
          }
        }
      </style>
      <nav>
        <div class="nav-container">
          <div class="nav-content">
            <a href="index.html" class="logo">
              <span>KB</span>
            </a>
            <div class="nav-links">
              <a href="index.html" class="nav-link">Home</a>
              <a href="projects.html" class="nav-link">Projects</a>
              <a href="contact.html" class="nav-link">Contact</a>
            </div>
            <div class="flex items-center">
              <button class="theme-toggle" aria-label="Toggle dark mode">
                <svg class="h-5 w-5 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
                <svg class="h-5 w-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </button>
              <button class="mobile-menu-button" aria-label="Toggle menu">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;

    // Add scroll effect
    window.addEventListener('scroll', () => {
      const nav = this.shadowRoot.querySelector('nav');
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    });

    // Mobile menu functionality
    const mobileMenuButton = this.shadowRoot.querySelector('.mobile-menu-button');
    const navLinks = this.shadowRoot.querySelector('.nav-links');
    
    mobileMenuButton.addEventListener('click', () => {
      const isHidden = navLinks.style.display === 'none' || !navLinks.style.display;
      
      if (isHidden) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        navLinks.style.gap = '0';
        
        // Style individual links for mobile
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
          link.style.padding = '0.75rem 1rem';
          link.style.width = '100%';
        });
      } else {
        navLinks.style.display = 'none';
      }
    });

    // Update active link based on current page
    const updateActiveLink = () => {
      const path = window.location.pathname.split('/').pop();
      const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        if ((path === 'index.html' || path === '') && link.getAttribute('href') === 'index.html') {
          link.classList.add('active');
        } else if (path === link.getAttribute('href')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    // Initial update and listen for navigation
    updateActiveLink();
    window.addEventListener('popstate', updateActiveLink);
  }
}

customElements.define('custom-navbar', CustomNavbar);