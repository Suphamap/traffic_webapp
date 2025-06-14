// Forecast page JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and interactions
    initializeAnimations();
    initializeDemoPlayer();
});

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.feature-card, .step-item, .demo-section, .cta-section');
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// Demo video player functionality
function initializeDemoPlayer() {
    // Add smooth scroll to demo section
    const demoLinks = document.querySelectorAll('a[href="#demo"]');
    demoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const demoSection = document.querySelector('.demo-section');
            if (demoSection) {
                demoSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
}

// Play demo function (can be expanded to show actual video)
function playDemo() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const playBtn = document.querySelector('.play-btn');
    
    // Add loading state
    playBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>กำลังโหลด...';
    playBtn.disabled = true;
    
    // Simulate video loading
    setTimeout(() => {
        // Show demo message (replace with actual video player logic)
        showDemoModal();
        
        // Reset button
        playBtn.innerHTML = '<i class="bi bi-play-fill me-2"></i>เล่นวิดีโอสาธิต';
        playBtn.disabled = false;
    }, 1500);
}

// Show demo modal (placeholder for actual video)
function showDemoModal() {
    const modalHTML = `
        <div class="demo-modal" id="demoModal">
            <div class="demo-modal-content">
                <div class="demo-modal-header">
                    <h3>การสาธิตระบบคาดการณ์จราจรล่วงหน้า</h3>
                    <button class="close-btn" onclick="closeDemoModal()">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="demo-modal-body">
                    <div class="demo-placeholder">
                        <i class="bi bi-camera-video"></i>
                        <h4>วิดีโอสาธิต</h4>
                        <p>นี่คือตำแหน่งที่จะแสดงวิดีโอสาธิตการทำงานของระบบ</p>
                        <div class="demo-features">
                            <div class="demo-feature">
                                <i class="bi bi-check-circle-fill"></i>
                                <span>การวิเคราะห์ข้อมูลจราจรแบบเรียลไทม์</span>
                            </div>
                            <div class="demo-feature">
                                <i class="bi bi-check-circle-fill"></i>
                                <span>การพยากรณ์สถานการณ์จราจรล่วงหน้า 30 นาที</span>
                            </div>
                            <div class="demo-feature">
                                <i class="bi bi-check-circle-fill"></i>
                                <span>การแสดงผลบนแผนที่แบบโต้ตอบ</span>
                            </div>
                            <div class="demo-feature">
                                <i class="bi bi-check-circle-fill"></i>
                                <span>ความแม่นยำสูงด้วยเทคโนโลยี AI</span>
                            </div>
                        </div>
                        <button class="try-now-btn" onclick="goToMap()">
                            <i class="bi bi-geo-alt-fill me-2"></i>ทดลองใช้งานจริง
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addModalStyles();
    
    // Show modal with animation
    setTimeout(() => {
        const modal = document.getElementById('demoModal');
        modal.classList.add('show');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close on backdrop click
    document.getElementById('demoModal').addEventListener('click', (e) => {
        if (e.target.id === 'demoModal') {
            closeDemoModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', handleEscapeKey);
}

// Close demo modal
function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            removeModalStyles();
        }, 300);
    }
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
}

// Handle escape key
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeDemoModal();
    }
}

// Go to traffic map
function goToMap() {
    window.location.href = 'traffic-map.html';
}

// Add modal styles
function addModalStyles() {
    const styles = `
        <style id="demoModalStyles">
            .demo-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                padding: 20px;
            }
            
            .demo-modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .demo-modal-content {
                background: white;
                border-radius: 20px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                transform: translateY(50px);
                transition: all 0.3s ease;
            }
            
            .demo-modal.show .demo-modal-content {
                transform: translateY(0);
            }
            
            .demo-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px 30px 0;
                border-bottom: 1px solid #eee;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            
            .demo-modal-header h3 {
                margin: 0;
                color: #2d3748;
                font-size: 1.5rem;
                font-weight: 700;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #666;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .close-btn:hover {
                background: #f0f0f0;
                color: #333;
            }
            
            .demo-modal-body {
                padding: 0 30px 30px;
            }
            
            .demo-placeholder {
                text-align: center;
                padding: 40px 20px;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border-radius: 15px;
                border: 2px dashed #dee2e6;
            }
            
            .demo-placeholder i {
                font-size: 4rem;
                color: #667eea;
                margin-bottom: 20px;
            }
            
            .demo-placeholder h4 {
                color: #2d3748;
                font-size: 1.8rem;
                margin-bottom: 15px;
                font-weight: 700;
            }
            
            .demo-placeholder > p {
                color: #6c757d;
                font-size: 1.1rem;
                margin-bottom: 30px;
                max-width: 500px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .demo-features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-bottom: 30px;
                text-align: left;
            }
            
            .demo-feature {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            .demo-feature i {
                color: #28a745;
                font-size: 1.2rem;
                min-width: 20px;
            }
            
            .demo-feature span {
                color: #495057;
                font-weight: 500;
            }
            
            .try-now-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
            }
            
            .try-now-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            }
            
            @media (max-width: 768px) {
                .demo-modal-header {
                    padding: 20px 20px 0;
                }
                
                .demo-modal-header h3 {
                    font-size: 1.3rem;
                }
                
                .demo-modal-body {
                    padding: 0 20px 20px;
                }
                
                .demo-placeholder {
                    padding: 30px 15px;
                }
                
                .demo-features {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Remove modal styles
function removeModalStyles() {
    const styles = document.getElementById('demoModalStyles');
    if (styles) {
        styles.remove();
    }
}

// Smooth scroll for anchor links
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

// Add scroll-triggered animations
const style = document.createElement('style');
style.textContent = `
    .feature-card, .step-item, .demo-section, .cta-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .feature-card.animate-in, .step-item.animate-in, .demo-section.animate-in, .cta-section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card.animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    .step-item.animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
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
`;
document.head.appendChild(style);
