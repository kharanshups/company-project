/* ================================================================
   MARINE ENGINEERING & SHIPBUILDING CORPORATE WEBSITE
   JavaScript Utilities & Components
   ================================================================ */

/**
 * Document Ready - Initialize all components
 */
document.addEventListener('DOMContentLoaded', function() {
  initializeNavbar();
  initializeSmoothScroll();
  initializeLightbox();
  initializeFormValidation();
  initializeScrollAnimations();
  initializeParallax();
});

/* ================================================================
   1. NAVBAR FUNCTIONALITY
   ================================================================ */
function initializeNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-menu');
  const navbar = document.querySelector('.navbar');
  const links = document.querySelectorAll('.navbar-menu a');

  // Mobile menu toggle
  if (toggle) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', function() {
      menu.classList.remove('active');
    });
  });

  // Navbar scroll background change
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active link highlighting
  updateActiveNavLink();
  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('.navbar-menu a');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ================================================================
   2. SMOOTH SCROLLING
   ================================================================ */
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ================================================================
   3. LIGHTBOX FUNCTIONALITY
   ================================================================ */
function initializeLightbox() {
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!lightbox) return;

  let currentImageIndex = 0;
  let currentGallery = [];

  // Open lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const lightboxGroup = this.getAttribute('data-lightbox');
      currentGallery = Array.from(document.querySelectorAll(`[data-lightbox="${lightboxGroup}"]`));
      currentImageIndex = currentGallery.indexOf(this);
      showLightboxImage();
    });
  });

  // Close lightbox
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });

  // Navigation
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    showLightboxImage();
  });

  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    showLightboxImage();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
      showLightboxImage();
    }
    if (e.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
      showLightboxImage();
    }
  });

  function showLightboxImage() {
    const img = currentGallery[currentImageIndex];
    lightboxImg.src = img.dataset.src || img.src;
    lightboxImg.alt = img.alt || 'Gallery image';
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }
}

/* ================================================================
   4. FORM VALIDATION & SUBMISSION
   ================================================================ */
function initializeFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Validate form
      if (!validateForm(this)) {
        return;
      }

      // Submit form
      await submitForm(this);
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('[required]');

  inputs.forEach(input => {
    if (!input.value.trim()) {
      showError(input, 'This field is required');
      isValid = false;
    } else {
      clearError(input);
    }

    // Email validation
    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        showError(input, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(input);
      }
    }

    // Phone validation
    if (input.type === 'tel') {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (input.value && !phoneRegex.test(input.value)) {
        showError(input, 'Please enter a valid phone number');
        isValid = false;
      } else {
        clearError(input);
      }
    }
  });

  return isValid;
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  if (!formGroup) return;

  let errorDiv = formGroup.querySelector('.error-text');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'error-text';
    errorDiv.style.color = 'var(--danger)';
    errorDiv.style.fontSize = 'var(--font-size-sm)';
    errorDiv.style.marginTop = 'var(--spacing-xs)';
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  }
  errorDiv.textContent = message;
  input.style.borderColor = 'var(--danger)';
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  if (!formGroup) return;

  const errorDiv = formGroup.querySelector('.error-text');
  if (errorDiv) errorDiv.remove();
  input.style.borderColor = '';
}

async function submitForm(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Check if we should submit to backend or just show success
    const action = form.getAttribute('action');
    
    if (action && action !== '#') {
      // Submit to backend
      const response = await fetch(action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Network response was not ok');
    }

    // Show success message
    showSuccessMessage(form, 'Form submitted successfully! We will be in touch soon.');
    form.reset();

  } catch (error) {
    showErrorMessage(form, 'An error occurred. Please try again later.');
    console.error('Form submission error:', error);

  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

function showSuccessMessage(form, message) {
  let messageDiv = form.parentNode.querySelector('.success-message');
  if (!messageDiv) {
    messageDiv = document.createElement('div');
    messageDiv.className = 'success-message fade-in';
    form.parentNode.insertBefore(messageDiv, form);
  }
  messageDiv.textContent = message;
  messageDiv.style.display = 'block';

  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

function showErrorMessage(form, message) {
  let messageDiv = form.parentNode.querySelector('.error-message');
  if (!messageDiv) {
    messageDiv = document.createElement('div');
    messageDiv.className = 'error-message fade-in';
    form.parentNode.insertBefore(messageDiv, form);
  }
  messageDiv.textContent = message;
  messageDiv.style.display = 'block';
}

/* ================================================================
   5. SCROLL ANIMATIONS
   ================================================================ */
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections for animation
  document.querySelectorAll('.card, .section').forEach(el => {
    observer.observe(el);
  });
}

/* ================================================================
   6. PARALLAX EFFECT
   ================================================================ */
function initializeParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', function() {
    parallaxElements.forEach(el => {
      const scrollPosition = window.scrollY;
      const parallaxValue = scrollPosition * 0.5;
      el.style.transform = `translateY(${parallaxValue}px)`;
    });
  });
}

/* ================================================================
   7. UTILITY FUNCTIONS
   ================================================================ */

/**
 * Format phone number
 */
function formatPhoneNumber(input) {
  input.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value.length <= 3) {
        value = value;
      } else if (value.length <= 6) {
        value = value.slice(0, 3) + '-' + value.slice(3);
      } else {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
      }
    }
    e.target.value = value;
  });
}

/**
 * Copy to clipboard
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!');
  });
}

/**
 * Show notification
 */
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--success);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 9999;
    animation: slideInRight 0.3s ease-in-out;
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Lazy load images
 */
function initializeLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('lazy-loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

/**
 * Initialize lazy loading on page load
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLazyLoad);
} else {
  initializeLazyLoad();
}

/* ================================================================
   8. EXPORT FOR USE IN OTHER MODULES
   ================================================================ */
window.MarineEngineeringUI = {
  validateForm,
  submitForm,
  showNotification,
  copyToClipboard,
  debounce,
  throttle,
  isInViewport
};
