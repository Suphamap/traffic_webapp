// Google Maps JavaScript
let map;
let trafficLayer;
let userMarker;
let watchId;

// Initialize Google Maps
function initMap() {
    // Default location (13°51'06.9"N 100°34'21.1"E)
    const defaultLocation = { lat: 13.8519, lng: 100.5725 };
    
    // Initialize map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: defaultLocation,
        mapTypeId: 'roadmap',
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ],
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true
    });

    // Initialize traffic layer
    trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // Set up event listeners
    setupEventListeners();
    
    // Add a marker at the default location
    addDefaultLocationMarker();
}

// Add marker at default location
function addDefaultLocationMarker() {
    const locationStatus = document.getElementById('locationStatus');
    const defaultLocation = { lat: 13.8519, lng: 100.5725 };
    
    // Add location marker
    userMarker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: 'ตำแหน่งที่เลือก (13°51\'06.9"N 100°34\'21.1"E)',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#FF5722',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3
        },
        animation: google.maps.Animation.DROP
    });

    // Update location status
    locationStatus.innerHTML = '📍 แสดงตำแหน่งที่กำหนด';
    locationStatus.className = 'location-status success';
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">ตำแหน่งที่กำหนด</h3>
                <p style="margin: 0; color: #666;">
                    พิกัด: 13°51'06.9"N 100°34'21.1"E<br>
                    ละติจูด: ${defaultLocation.lat.toFixed(6)}<br>
                    ลองจิจูด: ${defaultLocation.lng.toFixed(6)}
                </p>
            </div>
        `
    });

    userMarker.addListener('click', () => {
        infoWindow.open(map, userMarker);
    });
}

// Get user's current location (removed functionality)
function getCurrentLocation() {
    const locationStatus = document.getElementById('locationStatus');
    
    // Just refresh the default location
    locationStatus.innerHTML = '<span class="loading-spinner"></span> กำลังรีเฟรชแผนที่...';
    locationStatus.className = 'location-status';
    
    // Simulate loading time
    setTimeout(() => {
        const defaultLocation = { lat: 13.8519, lng: 100.5725 };
        map.setCenter(defaultLocation);
        map.setZoom(15);
        
        locationStatus.innerHTML = '📍 แสดงตำแหน่งที่กำหนด';
        locationStatus.className = 'location-status success';
    }, 1000);
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    errorText.textContent = message;
    errorElement.style.display = 'block';
}

// Hide error message
function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.style.display = 'none';
}

// Setup event listeners
function setupEventListeners() {
    // Locate button (now refresh button)
    const locateBtn = document.getElementById('locateBtn');
    locateBtn.addEventListener('click', () => {
        getCurrentLocation();
    });
    
    // Traffic toggle
    const trafficToggle = document.getElementById('trafficToggle');
    trafficToggle.addEventListener('click', () => {
        if (trafficLayer.getMap()) {
            trafficLayer.setMap(null);
            trafficToggle.classList.remove('active');
            trafficToggle.innerHTML = '<span>🚦</span> แสดงการจราจร';
        } else {
            trafficLayer.setMap(map);
            trafficToggle.classList.add('active');
            trafficToggle.innerHTML = '<span>🚦</span> ซ่อนการจราจร';
        }
    });
    
    // Map type selector
    const mapTypeSelect = document.getElementById('mapType');
    mapTypeSelect.addEventListener('change', (e) => {
        map.setMapTypeId(e.target.value);
    });
    
    // Retry button
    const retryBtn = document.getElementById('retryBtn');
    retryBtn.addEventListener('click', () => {
        hideError();
        getCurrentLocation();
    });
    
    // Close error on click outside
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.addEventListener('click', (e) => {
        if (e.target === errorMessage) {
            hideError();
        }
    });
}

// Handle page unload (removed location watching cleanup)
window.addEventListener('beforeunload', () => {
    // No cleanup needed anymore
});

// Handle API load errors
window.addEventListener('error', (e) => {
    if (e.message.includes('Google Maps')) {
        showError('ไม่สามารถโหลด Google Maps ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
    }
});
