// Forecast page JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and interactions
    initializeAnimations();
    initializeDemoPlayer();
    initializeStatusSystem();
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

// Status Management System
let autoRefreshInterval = null;
let isAutoRefreshActive = false;

// Initialize status system
function initializeStatusSystem() {
    // Load initial status
    updateTrafficStatus();
    updateWeatherStatusEnhanced(); // Use enhanced weather function
    updatePredictionStatus();
    
    // Set up periodic updates every 5 minutes
    setInterval(() => {
        if (isAutoRefreshActive) {
            refreshStatus();
        }
    }, 300000); // 5 minutes
}

// Traffic Status Management
function updateTrafficStatus() {
    const trafficStatusElement = document.getElementById('trafficStatus');
    const trafficTextElement = document.getElementById('trafficText');
    const trafficDetailsElement = document.getElementById('trafficDetails');
    const trafficTimeElement = document.getElementById('trafficTime');
    
    // Simulate traffic data fetch
    setTimeout(() => {
        const trafficConditions = [
            { status: 'good', text: 'การจราจรราบรื่น', color: 'good' },
            { status: 'moderate', text: 'การจราจรหนาแน่นปานกลาง', color: 'warning' },
            { status: 'heavy', text: 'การจราจรหนาแน่น', color: 'danger' },
            { status: 'congested', text: 'การจราจรติดขัด', color: 'danger' }
        ];
        
        // Simulate realistic traffic patterns based on time
        const currentHour = new Date().getHours();
        let trafficIndex;
        
        if ((currentHour >= 7 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 19)) {
            // Rush hours - heavier traffic
            trafficIndex = Math.floor(Math.random() * 2) + 2; // Index 2-3 (heavy/congested)
        } else if (currentHour >= 10 && currentHour <= 16) {
            // Daytime - moderate traffic
            trafficIndex = Math.floor(Math.random() * 2) + 1; // Index 1-2 (moderate/heavy)
        } else {
            // Night/early morning - lighter traffic
            trafficIndex = Math.floor(Math.random() * 2); // Index 0-1 (good/moderate)
        }
        
        const currentCondition = trafficConditions[trafficIndex];
        
        // Update status indicator
        const statusDot = trafficStatusElement.querySelector('.status-dot');
        statusDot.className = `status-dot ${currentCondition.color}`;
        trafficTextElement.textContent = currentCondition.text;
        
        // Update time
        const now = new Date();
        trafficTimeElement.textContent = `อัปเดตล่าสุด: ${now.toLocaleTimeString('th-TH')}`;
        
        // Store current status and update banner
        currentTrafficStatus = currentCondition;
        updateOverallStatusBanner(currentTrafficStatus, currentWeatherData);
        
        // Update overall status banner
        updateOverallStatusBanner(currentCondition, null);
        
    }, Math.random() * 2000 + 1000); // Random delay 1-3 seconds
}

// Weather Status Management
function updateWeatherStatus() {
    const weatherStatusElement = document.getElementById('weatherStatus');
    const weatherTextElement = document.getElementById('weatherText');
    const rainProbabilityElement = document.getElementById('rainProbability');
    const weatherTimeElement = document.getElementById('weatherTime');
    
    // Simulate weather API call
    setTimeout(() => {
        const weatherConditions = [
            { condition: 'sunny', text: 'อากาศแจ่มใส', color: 'good', rainChance: Math.floor(Math.random() * 20) },
            { condition: 'cloudy', text: 'มีเมฆมาก', color: 'warning', rainChance: Math.floor(Math.random() * 30) + 20 },
            { condition: 'rainy', text: 'ฝนตก', color: 'danger', rainChance: Math.floor(Math.random() * 30) + 70 },
            { condition: 'stormy', text: 'ฝนฟ้าคะนอง', color: 'danger', rainChance: Math.floor(Math.random() * 20) + 80 }
        ];
        
        // Simulate realistic weather patterns
        const randomWeatherIndex = Math.floor(Math.random() * weatherConditions.length);
        const currentWeather = weatherConditions[randomWeatherIndex];
        
        // Update status indicator
        const statusDot = weatherStatusElement.querySelector('.status-dot');
        statusDot.className = `status-dot ${currentWeather.color}`;
        weatherTextElement.textContent = currentWeather.text;
        
        // Update rain probability
        rainProbabilityElement.textContent = `โอกาสฝนตก: ${currentWeather.rainChance}%`;
        
        // Update time
        const now = new Date();
        weatherTimeElement.textContent = `อัปเดตล่าสุด: ${now.toLocaleTimeString('th-TH')}`;
        
        // Update overall status banner
        updateOverallStatusBanner(null, currentWeather);
        
    }, Math.random() * 2000 + 1500); // Random delay 1.5-3.5 seconds
}

// Prediction Status Management
function updatePredictionStatus() {
    const predictionStatusElement = document.getElementById('predictionStatus');
    const predictionTextElement = document.getElementById('predictionText');
    const nextUpdateElement = document.getElementById('nextUpdate');
    const accuracyElement = document.getElementById('accuracy');
    
    setTimeout(() => {
        const predictionStates = [
            { status: 'active', text: 'ระบบทำงานปกติ', color: 'good' },
            { status: 'processing', text: 'กำลังประมวลผล', color: 'warning' },
            { status: 'updating', text: 'กำลังอัปเดตข้อมูล', color: 'warning' }
        ];
        
        const currentPrediction = predictionStates[Math.floor(Math.random() * predictionStates.length)];
        
        // Update status indicator
        const statusDot = predictionStatusElement.querySelector('.status-dot');
        statusDot.className = `status-dot ${currentPrediction.color}`;
        predictionTextElement.textContent = currentPrediction.text;
        
        // Calculate next update time
        const nextUpdate = new Date();
        nextUpdate.setMinutes(nextUpdate.getMinutes() + 30);
        nextUpdateElement.textContent = `อัปเดตถัดไป: ${nextUpdate.toLocaleTimeString('th-TH')}`;
        
        // Random accuracy between 88-95%
        const accuracy = Math.floor(Math.random() * 8) + 88;
        accuracyElement.textContent = `ความแม่นยำ: ${accuracy}%`;
        
    }, Math.random() * 1000 + 500); // Random delay 0.5-1.5 seconds
}

// Update overall status banner
function updateOverallStatusBanner(trafficStatus, weatherData) {
    const summaryTrafficIcon = document.getElementById('summaryTrafficIcon');
    const summaryTrafficText = document.getElementById('summaryTrafficText');
    const summaryWeatherIcon = document.getElementById('summaryWeatherIcon');
    const summaryWeatherText = document.getElementById('summaryWeatherText');
    const summaryAlertIcon = document.getElementById('summaryAlertIcon');
    const summaryAlert = document.getElementById('summaryAlert');
    
    // Update traffic summary
    if (trafficStatus) {
        summaryTrafficIcon.className = `bi bi-car-front status-icon ${trafficStatus.color}`;
        summaryTrafficText.textContent = trafficStatus.text.replace(/[🟢🟡🟠🔴]/g, '').split('(')[0].trim();
    }
    
    // Update weather summary  
    if (weatherData) {
        summaryWeatherIcon.className = `bi bi-cloud-rain status-icon ${weatherData.color}`;
        summaryWeatherText.textContent = `${weatherData.rainChance}% ฝน`;
    }
    
    // Show alert if severe conditions
    let alertMessage = '';
    if (weatherData && weatherData.rainChance > 70) {
        alertMessage += 'ฝนหนัก ';
    }
    if (trafficStatus && (trafficStatus.color === 'danger')) {
        alertMessage += 'จราจรติดขัด ';
    }
    
    if (alertMessage) {
        summaryAlertIcon.style.display = 'block';
        summaryAlert.style.display = 'block';
        summaryAlert.textContent = `⚠️ ${alertMessage.trim()}`;
    } else {
        summaryAlertIcon.style.display = 'none';
        summaryAlert.style.display = 'none';
    }
}

// Store current status for banner updates
let currentTrafficStatus = null;
let currentWeatherData = null;

// Refresh all status
function refreshStatus() {
    // Show loading state
    const allStatusDots = document.querySelectorAll('.status-dot');
    const allStatusTexts = document.querySelectorAll('#trafficText, #weatherText, #predictionText');
    
    allStatusDots.forEach(dot => {
        dot.className = 'status-dot loading';
    });
    
    allStatusTexts.forEach(text => {
        text.textContent = 'กำลังโหลด...';
    });
    
    // Update all status
    updateTrafficStatus();
    updateWeatherStatusEnhanced(); // Use enhanced weather function
    updatePredictionStatus();
    
    // Show feedback
    showStatusToast('กำลังอัปเดตสถานะ...', 'info');
}

// Toggle auto refresh
function toggleAutoRefresh() {
    const autoRefreshIcon = document.getElementById('autoRefreshIcon');
    const autoRefreshText = document.getElementById('autoRefreshText');
    const button = autoRefreshIcon.closest('button');
    
    isAutoRefreshActive = !isAutoRefreshActive;
    
    if (isAutoRefreshActive) {
        autoRefreshIcon.className = 'bi bi-pause-circle me-1';
        autoRefreshText.textContent = 'ปิดการอัปเดตอัตโนมัติ';
        button.classList.add('active');
        showStatusToast('เปิดการอัปเดตอัตโนมัติแล้ว', 'success');
    } else {
        autoRefreshIcon.className = 'bi bi-play-circle me-1';
        autoRefreshText.textContent = 'เปิดการอัปเดตอัตโนมัติ';
        button.classList.remove('active');
        showStatusToast('ปิดการอัปเดตอัตโนมัติแล้ว', 'info');
    }
}

// Show status toast notification
function showStatusToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.status-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `status-toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        padding: 15px 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide toast
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Enhanced Weather Prediction System
function getRealisticWeatherData() {
    const currentHour = new Date().getHours();
    const currentMonth = new Date().getMonth(); // 0-11
    const currentDay = new Date().getDay(); // 0-6 (Sunday-Saturday)
    
    // Base rain probability on season (Thailand weather patterns)
    let baseRainChance;
    if (currentMonth >= 4 && currentMonth <= 10) {
        // Rainy season (May-November)
        baseRainChance = 60;
    } else {
        // Dry season (December-April)
        baseRainChance = 15;
    }
    
    // Adjust for time of day
    if (currentHour >= 14 && currentHour <= 18) {
        // Afternoon thunderstorms are common in Thailand
        baseRainChance += 20;
    } else if (currentHour >= 6 && currentHour <= 10) {
        // Morning is typically drier
        baseRainChance -= 10;
    }
    
    // Add some randomness
    const finalRainChance = Math.max(0, Math.min(100, baseRainChance + (Math.random() * 30 - 15)));
    
    // Determine weather condition based on rain chance
    let weatherCondition;
    if (finalRainChance < 20) {
        weatherCondition = { condition: 'sunny', text: 'อากาศแจ่มใส ☀️', color: 'good' };
    } else if (finalRainChance < 50) {
        weatherCondition = { condition: 'cloudy', text: 'มีเมฆมาก โอกาสฝนน้อย ⛅', color: 'good' };
    } else if (finalRainChance < 75) {
        weatherCondition = { condition: 'rainy', text: 'โอกาสฝนตก 🌧️', color: 'warning' };
    } else {
        weatherCondition = { condition: 'stormy', text: 'ฝนฟ้าคะนอง ⛈️', color: 'danger' };
    }
    
    return {
        ...weatherCondition,
        rainChance: Math.round(finalRainChance)
    };
}

// Enhanced Traffic Prediction based on weather
function getTrafficImpactFromWeather(rainChance) {
    let trafficImpact = '';
    let trafficMultiplier = 1;
    
    if (rainChance > 70) {
        trafficImpact = ' (ฝนทำให้จราจรหนาแน่นขึ้น)';
        trafficMultiplier = 1.5;
    } else if (rainChance > 40) {
        trafficImpact = ' (อาจมีผลกระทบจากฝน)';
        trafficMultiplier = 1.2;
    }
    
    return { impact: trafficImpact, multiplier: trafficMultiplier };
}

// Update weather status with realistic data
function updateWeatherStatusEnhanced() {
    const weatherStatusElement = document.getElementById('weatherStatus');
    const weatherTextElement = document.getElementById('weatherText');
    const rainProbabilityElement = document.getElementById('rainProbability');
    const weatherTimeElement = document.getElementById('weatherTime');
    
    setTimeout(() => {
        const weatherData = getRealisticWeatherData();
        
        // Update status indicator
        const statusDot = weatherStatusElement.querySelector('.status-dot');
        statusDot.className = `status-dot ${weatherData.color}`;
        weatherTextElement.textContent = weatherData.text;
        
        // Update rain probability with additional info
        const rainText = `โอกาสฝนตก: ${weatherData.rainChance}%`;
        if (weatherData.rainChance > 70) {
            rainProbabilityElement.innerHTML = `${rainText} <br><small style="color: #ffcdd2;">⚠️ แนะนำให้เตรียมร่มและวางแผนเวลาเดินทาง</small>`;
        } else if (weatherData.rainChance > 40) {
            rainProbabilityElement.innerHTML = `${rainText} <br><small style="color: #fff3cd;">💡 ควรติดตามสภาพอากาศ</small>`;
        } else {
            rainProbabilityElement.textContent = rainText;
        }
        
        // Update time
        const now = new Date();
        weatherTimeElement.textContent = `อัปเดตล่าสุด: ${now.toLocaleTimeString('th-TH')}`;
        
        // Store current weather data and update banner
        currentWeatherData = weatherData;
        updateOverallStatusBanner(currentTrafficStatus, currentWeatherData);
        
        // Update traffic status based on weather
        updateTrafficWithWeatherImpact(weatherData.rainChance);
        
    }, Math.random() * 2000 + 1500);
}

// Update traffic status considering weather impact
function updateTrafficWithWeatherImpact(rainChance) {
    const trafficStatusElement = document.getElementById('trafficStatus');
    const trafficTextElement = document.getElementById('trafficText');
    const trafficTimeElement = document.getElementById('trafficTime');
    
    setTimeout(() => {
        const trafficConditions = [
            { status: 'good', text: 'การจราจรราบรื่น 🟢', color: 'good' },
            { status: 'moderate', text: 'การจราจรหนาแน่นปานกลาง 🟡', color: 'warning' },
            { status: 'heavy', text: 'การจราจรหนาแน่น 🟠', color: 'danger' },
            { status: 'congested', text: 'การจราจรติดขัด 🔴', color: 'danger' }
        ];
        
        // Get base traffic condition
        const currentHour = new Date().getHours();
        let trafficIndex;
        
        if ((currentHour >= 7 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 19)) {
            trafficIndex = Math.floor(Math.random() * 2) + 2; // Rush hours
        } else if (currentHour >= 10 && currentHour <= 16) {
            trafficIndex = Math.floor(Math.random() * 2) + 1; // Daytime
        } else {
            trafficIndex = Math.floor(Math.random() * 2); // Night/early morning
        }
        
        // Apply weather impact
        const weatherImpact = getTrafficImpactFromWeather(rainChance);
        if (weatherImpact.multiplier > 1 && trafficIndex < 3) {
            trafficIndex = Math.min(3, trafficIndex + 1); // Make traffic worse due to rain
        }
        
        const currentCondition = trafficConditions[trafficIndex];
        
        // Update status indicator
        const statusDot = trafficStatusElement.querySelector('.status-dot');
        statusDot.className = `status-dot ${currentCondition.color}`;
        trafficTextElement.textContent = currentCondition.text + weatherImpact.impact;
        
        // Update time
        const now = new Date();
        trafficTimeElement.textContent = `อัปเดตล่าสุด: ${now.toLocaleTimeString('th-TH')}`;
        
        // Store current status and update banner
        currentTrafficStatus = { ...currentCondition, text: currentCondition.text + weatherImpact.impact };
        updateOverallStatusBanner(currentTrafficStatus, currentWeatherData);
        
    }, Math.random() * 1000 + 500);
}

// Initialize status system when page loads
document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    initializeStatusSystem();
});
