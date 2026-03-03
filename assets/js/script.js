// ========================================
// Import Components
// ========================================
import { initFAQ, validateForm, showAlert } from './components.js';

// ========================================
// Wait for DOM to be ready
// ========================================
document.addEventListener('DOMContentLoaded', function() {

// ========================================
// DOM Elements
// ========================================
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contact-form');

// ========================================
// Header Scroll Effect (ĐÃ FIX LỖI)
// ========================================
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Back to top visibility (chỉ chạy nếu phần tử tồn tại)
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});


// ========================================
// Mobile Navigation
// ========================================
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
if (hamburger && navMenu) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
if (hamburger && navMenu) {
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// Active Navigation Link
// ========================================
const sections = document.querySelectorAll('section[id]');

function activeNavLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activeNavLink);

// ========================================
// Counter Animation
// ========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(number => {
    counterObserver.observe(number);
});

// ========================================
// Smooth Scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Contact Form Handling
// ========================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Validate
    if (!data.name || !data.phone) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        showNotification('Số điện thoại không hợp lệ!', 'error');
        return;
    }
    
    // Show success message (in real implementation, this would send to server)
    showNotification('Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.', 'success');
    this.reset();
    
    // Optional: Create Zalo/WhatsApp message
    const message = `Xin chào, tôi là ${data.name}. Tôi muốn được báo giá dịch vụ: ${data.service || 'Thu mua đồ cũ'}. Địa chỉ: ${data.address || 'Chưa cung cấp'}. Nội dung: ${data.message || 'Không có'}`;
    console.log('Form submitted:', data);
    console.log('Message:', message);
    });
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation keyframes if not exist
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0 5px;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ========================================
// Intersection Observer for animations
// ========================================
const animateElements = document.querySelectorAll('.service-card, .why-card, .process-item, .testimonial-card, .about-content, .about-image');

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateObserver.observe(element);
});

// ========================================
// Testimonials Auto-Scroll (Optional)
// ========================================
// Uncomment below for auto-scrolling testimonials
/*
const testimonialsSlider = document.querySelector('.testimonials-slider');
let isScrolling = false;

function autoScroll() {
    if (!isScrolling && window.innerWidth <= 768) {
        testimonialsSlider.scrollBy({
            left: testimonialsSlider.offsetWidth,
            behavior: 'smooth'
        });
        
        if (testimonialsSlider.scrollLeft + testimonialsSlider.offsetWidth >= testimonialsSlider.scrollWidth) {
            testimonialsSlider.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }
}

setInterval(autoScroll, 5000);

testimonialsSlider.addEventListener('mouseenter', () => isScrolling = true);
testimonialsSlider.addEventListener('mouseleave', () => isScrolling = false);
*/

// ========================================
// Initialize
// ========================================
// Second DOMContentLoaded Event (for initialization)
// ========================================
// Set first nav link as active only on homepage
if (navLinks.length > 0 && window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
    navLinks[0].classList.add('active');
}

// Trigger scroll event for header
window.dispatchEvent(new Event('scroll'));

// Initialize FAQ if exists
if (document.querySelector('.faq-item')) {
    initFAQ();
}

console.log('🚀 Website SMS Việt Nam đã sẵn sàng!');
}); // End DOMContentLoaded

// ========================================
// Service Worker Registration (Optional for PWA)
// ========================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}
*/
