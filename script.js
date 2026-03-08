// ==================== BOOTSTRAP NAVBAR ACTIVE STATE ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close navbar if open on mobile
                const navbar = document.querySelector('.navbar-collapse');
                if (navbar && navbar.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    toggler.click();
                }
            }
        }
    });
});

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .portfolio-card, .timeline-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== CONTACT FORM HANDLER ==================== 
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form inputs
        const inputs = this.querySelectorAll('input[type="text"], input[type="email"], textarea');
        let allFilled = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                allFilled = false;
            }
        });

        if (!allFilled) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && !isValidEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== NAVBAR BACKGROUND ON SCROLL ==================== 
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        navbar.classList.add('shadow-sm');
    } else {
        navbar.style.boxShadow = '';
        navbar.classList.remove('shadow-sm');
    }
});

// ==================== COUNTER ANIMATION ==================== 
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Animate stats when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true');
            const numbers = entry.target.querySelectorAll('.stat-card h3');
            numbers.forEach(num => {
                const text = num.textContent.replace(/\D/g, '');
                const target = parseInt(text) || 0;
                if (target > 0) {
                    animateCounter(num, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => statsObserver.observe(card));

// ==================== BACK TO TOP BUTTON ==================== 
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.setAttribute('type', 'button');
    document.body.appendChild(button);

    function showButton() {
        if (window.scrollY > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    }

    window.addEventListener('scroll', showButton);

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBackToTopButton);
} else {
    createBackToTopButton();
}

