// Radar page JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and interactions
    initializeAnimations();
    initializeImageViewer();
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

// Image viewer functionality
function initializeImageViewer() {
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

// Show radar image function
function showRadarImage() {
    const viewBtn = document.querySelector('.view-btn');
    
    // Add loading state
    viewBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>กำลังโหลด...';
    viewBtn.disabled = true;
    
    // Simulate image loading
    setTimeout(() => {
        // Show radar image modal
        showRadarModal();
        
        // Reset button
        viewBtn.innerHTML = '<i class="bi bi-eye-fill me-2"></i>ดูภาพเรดาร์';
        viewBtn.disabled = false;
    }, 1500);
}

// Show radar image modal
function showRadarModal() {
    const modalHTML = `
        <div class="radar-modal" id="radarModal">
            <div class="radar-modal-content">
                <div class="radar-modal-header">
                    <h3>ภาพเรดาร์การจราจรแบบเรียลไทม์</h3>
                    <button class="close-btn" onclick="closeRadarModal()">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="radar-modal-body">
                    <div class="radar-image-container">
                        <div class="radar-display">
                            <i class="bi bi-radar"></i>
                            <h4>ข้อมูลเรดาร์</h4>
                            <p>นี่คือตำแหน่งที่จะแสดงภาพเรดาร์การจราจรแบบเรียลไทม์</p>
                            <div class="radar-features">
                                <div class="radar-feature">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>ตรวจสอบความเร็วยานพาหนะแบบเรียลไทม์</span>
                                </div>
                                <div class="radar-feature">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>วิเคราะห์ความหนาแน่นการจราจร</span>
                                </div>
                                <div class="radar-feature">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>แสดงข้อมูลในรูปแบบภาพเรดาร์</span>
                                </div>
                                <div class="radar-feature">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>อัปเดตข้อมูลทุกวินาที</span>
                                </div>
                            </div>
                            <div class="radar-stats">
                                <div class="stat-item">
                                    <div class="stat-value">85</div>
                                    <div class="stat-label">ยานพาหนะ/นาที</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">45</div>
                                    <div class="stat-label">ความเร็วเฉลี่ย (กม./ชม.)</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">72%</div>
                                    <div class="stat-label">ความหนาแน่น</div>
                                </div>
                            </div>
                            <button class="try-now-btn" onclick="goToMap()">
                                <i class="bi bi-geo-alt-fill me-2"></i>ดูแผนที่จราจร
                            </button>
                        </div>
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
        const modal = document.getElementById('radarModal');
        modal.classList.add('show');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close on backdrop click
    document.getElementById('radarModal').addEventListener('click', (e) => {
        if (e.target.id === 'radarModal') {
            closeRadarModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', handleEscapeKey);
}

// Close radar modal
function closeRadarModal() {
    const modal = document.getElementById('radarModal');
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
        closeRadarModal();
    }
}

// Go to traffic map
function goToMap() {
    window.location.href = 'traffic-map.html';
}

// Add modal styles
function addModalStyles() {
    const styles = `
        <style id="radarModalStyles">
            .radar-modal {
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
            
            .radar-modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .radar-modal-content {
                background: white;
                border-radius: 20px;
                max-width: 900px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                transform: translateY(50px);
                transition: all 0.3s ease;
            }
            
            .radar-modal.show .radar-modal-content {
                transform: translateY(0);
            }
            
            .radar-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px 30px 0;
                border-bottom: 1px solid #eee;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            
            .radar-modal-header h3 {
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
            
            .radar-modal-body {
                padding: 0 30px 30px;
            }
            
            .radar-image-container {
                text-align: center;
            }
            
            .radar-display {
                padding: 40px 20px;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border-radius: 15px;
                border: 2px dashed #dee2e6;
            }
            
            .radar-display i {
                font-size: 4rem;
                color: #667eea;
                margin-bottom: 20px;
            }
            
            .radar-display h4 {
                color: #2d3748;
                font-size: 1.8rem;
                margin-bottom: 15px;
                font-weight: 700;
            }
            
            .radar-display > p {
                color: #6c757d;
                font-size: 1.1rem;
                margin-bottom: 30px;
                max-width: 500px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .radar-features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-bottom: 30px;
                text-align: left;
            }
            
            .radar-feature {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            .radar-feature i {
                color: #28a745;
                font-size: 1.2rem;
                min-width: 20px;
            }
            
            .radar-feature span {
                color: #495057;
                font-weight: 500;
            }
            
            .radar-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .stat-item {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            }
            
            .stat-value {
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 5px;
            }
            
            .stat-label {
                font-size: 0.9rem;
                opacity: 0.9;
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
                .radar-modal-header {
                    padding: 20px 20px 0;
                }
                
                .radar-modal-header h3 {
                    font-size: 1.3rem;
                }
                
                .radar-modal-body {
                    padding: 0 20px 20px;
                }
                
                .radar-display {
                    padding: 30px 15px;
                }
                
                .radar-features {
                    grid-template-columns: 1fr;
                }
                
                .radar-stats {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Remove modal styles
function removeModalStyles() {
    const styles = document.getElementById('radarModalStyles');
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
