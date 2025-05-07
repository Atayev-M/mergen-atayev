document.addEventListener('DOMContentLoaded', function() {
  // AOS Animation Initialization
  AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
  });

  // Back to Top Button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
      window.addEventListener('scroll', function() {
          if (window.pageYOffset > 300) {
              backToTopButton.style.display = 'flex';
          } else {
              backToTopButton.style.display = 'none';
          }
      });
      
      backToTopButton.addEventListener('click', function(e) {
          e.preventDefault();
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.custom-navbar');
  if (navbar) {
      window.addEventListener('scroll', function() {
          if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }
      });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
              });
              
              // Close mobile menu when clicking a link
              const navbarCollapse = document.querySelector('.navbar-collapse');
              if (navbarCollapse.classList.contains('show')) {
                  const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                      toggle: false
                  });
                  bsCollapse.hide();
              }
          }
      });
  });

  // Portfolio Filter
  const portfolioFilters = document.querySelectorAll('[data-filter]');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (portfolioFilters.length && portfolioItems.length) {
      portfolioFilters.forEach(filter => {
          filter.addEventListener('click', function(e) {
              e.preventDefault();
              
              // Remove active class from all filters
              portfolioFilters.forEach(f => f.classList.remove('active'));
              
              // Add active class to clicked filter
              this.classList.add('active');
              
              const filterValue = this.getAttribute('data-filter');
              
              portfolioItems.forEach(item => {
                  if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                      item.style.display = 'block';
                  } else {
                      item.style.display = 'none';
                  }
              });
          });
      });
  }

  // GLightbox Initialization
  if (typeof GLightbox !== 'undefined') {
      const lightbox = GLightbox({
          selector: '[data-gallery="portfolioGallery"]'
      });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Remove previous validation classes
          const formInputs = this.querySelectorAll('.form-control');
          formInputs.forEach(input => {
              input.classList.remove('is-invalid');
          });
          
          let isValid = true;
          
          // Validate Name
          const nameInput = this.querySelector('#name');
          if (!nameInput.value.trim()) {
              nameInput.classList.add('is-invalid');
              isValid = false;
          }
          
          // Validate Email
          const emailInput = this.querySelector('#email');
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailInput.value.trim())) {
              emailInput.classList.add('is-invalid');
              isValid = false;
          }
          
          // Validate Subject
          const subjectInput = this.querySelector('#subject');
          if (!subjectInput.value.trim()) {
              subjectInput.classList.add('is-invalid');
              isValid = false;
          }
          
          // Validate Message
          const messageInput = this.querySelector('#message');
          if (!messageInput.value.trim()) {
              messageInput.classList.add('is-invalid');
              isValid = false;
          }
          
          if (isValid) {
              // Here you would typically send the form data to a server
              // For demo purposes, we'll just show an alert
              alert('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğim.');
              this.reset();
          }
      });
  }

  // Activate current nav link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (pageYOffset >= sectionTop - 100) {
              current = section.getAttribute('id');
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
              link.classList.add('active');
          }
      });
  });
});

// Skills bölümüne animasyon ekleme
document.addEventListener('DOMContentLoaded', function() {
  const skills = document.querySelectorAll('.skill-item');
  
  skills.forEach((skill, index) => {
      skill.style.opacity = '0';
      skill.style.transform = 'translateY(20px)';
      skill.style.transition = `all 0.5s ease ${index * 0.1}s`;
      
      // Intersection Observer ile görünür olduğunda animasyonu tetikle
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
              }
          });
      });
      
      observer.observe(skill);
  });
  
  // Profesyonel beceri kartlarına hover efekti
  const proSkills = document.querySelectorAll('.professional-skill');
  proSkills.forEach(skill => {
      skill.addEventListener('mouseenter', function() {
          const icon = this.querySelector('.skill-icon i');
          icon.style.transform = 'scale(1.1)';
          icon.style.transition = 'transform 0.3s ease';
      });
      
      skill.addEventListener('mouseleave', function() {
          const icon = this.querySelector('.skill-icon i');
          icon.style.transform = 'scale(1)';
      });
  });
});