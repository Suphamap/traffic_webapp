// Acknowledgments page JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and interactions
    initializeAnimations();
    initializeInteractions();
});

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.team-section, .tech-section, .sources-section, .thanks-section, .contact-section, .team-card, .tech-card, .source-card, .thanks-item'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize interactive elements
function initializeInteractions() {
    // Add click-to-copy functionality for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.querySelector('span').textContent;
            copyToClipboard(text, item);
        });
        
        // Add cursor pointer style
        item.style.cursor = 'pointer';
        
        // Add title attribute for better UX
        item.title = 'คลิกเพื่อคัดลอก';
    });

    // Add hover effects for cards
    addHoverEffects();
    
    // Add smooth scrolling for any anchor links
    addSmoothScrolling();
}

// Copy text to clipboard
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(element);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text, element);
    });
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, element) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback(element);
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy feedback
function showCopyFeedback(element) {
    const originalContent = element.innerHTML;
    const icon = element.querySelector('i').className;
    
    // Change content to show success
    element.innerHTML = `
        <i class="${icon}"></i>
        <span>คัดลอกแล้ว!</span>
    `;
    
    // Add success styling
    element.style.background = 'rgba(40, 167, 69, 0.2)';
    element.style.borderColor = '#28a745';
    
    // Reset after 2 seconds
    setTimeout(() => {
        element.innerHTML = originalContent;
        element.style.background = '';
        element.style.borderColor = '';
    }, 2000);
}

// Add enhanced hover effects
function addHoverEffects() {
    // Team cards hover effect
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Tech and source cards pulse effect
    const techCards = document.querySelectorAll('.tech-card, .source-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.tech-icon, .source-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.5)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.tech-icon, .source-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.boxShadow = '';
            }
        });
    });
}

// Add smooth scrolling for anchor links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add scroll-triggered animations with stagger effect
const style = document.createElement('style');
style.textContent = `
    .team-section, .tech-section, .sources-section, .thanks-section, .contact-section,
    .team-card, .tech-card, .source-card, .thanks-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .team-section.animate-in, .tech-section.animate-in, .sources-section.animate-in, 
    .thanks-section.animate-in, .contact-section.animate-in {
        opacity: 1;
        transform: translateY(0);
        animation: slideInUp 0.8s ease forwards;
    }
    
    .team-card.animate-in, .tech-card.animate-in, .source-card.animate-in, .thanks-item.animate-in {
        opacity: 1;
        transform: translateY(0);
        animation: slideInUp 0.6s ease forwards;
    }
    
    /* Stagger animation for cards */
    .team-card:nth-child(1).animate-in { animation-delay: 0.1s; }
    .team-card:nth-child(2).animate-in { animation-delay: 0.2s; }
    .team-card:nth-child(3).animate-in { animation-delay: 0.3s; }
    
    .tech-card:nth-child(1).animate-in { animation-delay: 0.1s; }
    .tech-card:nth-child(2).animate-in { animation-delay: 0.2s; }
    .tech-card:nth-child(3).animate-in { animation-delay: 0.3s; }
    .tech-card:nth-child(4).animate-in { animation-delay: 0.4s; }
    .tech-card:nth-child(5).animate-in { animation-delay: 0.5s; }
    .tech-card:nth-child(6).animate-in { animation-delay: 0.6s; }
    
    .source-card:nth-child(1).animate-in { animation-delay: 0.1s; }
    .source-card:nth-child(2).animate-in { animation-delay: 0.2s; }
    .source-card:nth-child(3).animate-in { animation-delay: 0.3s; }
    .source-card:nth-child(4).animate-in { animation-delay: 0.4s; }
    
    .thanks-item:nth-child(1).animate-in { animation-delay: 0.1s; }
    .thanks-item:nth-child(2).animate-in { animation-delay: 0.2s; }
    .thanks-item:nth-child(3).animate-in { animation-delay: 0.3s; }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Hover effects */
    .contact-item {
        transition: all 0.3s ease;
    }
    
    .contact-item:hover {
        transform: translateY(-3px) scale(1.02);
    }
    
    /* Card shine effect */
    .team-card, .tech-card, .source-card {
        position: relative;
        overflow: hidden;
    }
    
    .team-card::after, .tech-card::after, .source-card::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
        transform: rotate(45deg);
        transition: all 0.6s;
        opacity: 0;
    }
    
    .team-card:hover::after, .tech-card:hover::after, .source-card:hover::after {
        animation: shine 0.6s ease-in-out;
    }
    
    @keyframes shine {
        0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

// Easter egg: Konami code for special animation
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerSpecialAnimation();
        konamiCode = [];
    }
});

function triggerSpecialAnimation() {
    // Add confetti effect
    const colors = ['#667eea', '#764ba2', '#f093fb', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 100);
    }
    
    // Show thank you message
    setTimeout(() => {
        alert('ขอบคุณที่สนใจโครงการของเรา! 🎉');
    }, 1000);
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: 10px;
        height: 10px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: confettiFall 3s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);
