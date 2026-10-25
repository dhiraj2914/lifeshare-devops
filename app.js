// ==========================================================================
// Application State & Configuration
// ==========================================================================
const CONFIG = {
  // Default coordinates (Hyderabad, India - matching student/mentor locations)
  defaultCoords: { lat: 17.385044, lng: 78.486671 },
  // Local storage keys
  storageKeys: {
    donors: 'lifeshare_registered_donors',
    requests: 'lifeshare_blood_requests',
    theme: 'lifeshare_theme'
  }
};

let appState = {
  userLocation: null, // { lat: number, lng: number }
  donors: [],         // Array of donor objects
  hospitals: [],      // Array of hospital objects
  requests: [],       // Array of blood request objects
  map: null,          // Google Map instance
  markers: [],        // Active google.maps.Marker instances
  radiusCircle: null, // Google maps circle overlay
  infoWindow: null,   // Shared infoWindow instance
  currentTab: 'dashboard'
};

// ==========================================================================
// Mock Database (Default Seed Data)
// ==========================================================================
const DEFAULT_HOSPITALS = [
  { id: 'h1', name: 'NIMS (Nijams Institute of Medical Sciences)', lat: 17.4140, lng: 78.4552, type: 'hospital', bloodStock: { 'O+': 15, 'O-': 2, 'A+': 18, 'B+': 20, 'AB-': 1 }, phone: '+91 40 2348 9000', address: 'Punjagutta, Hyderabad' },
  { id: 'h2', name: 'Apollo Hospitals', lat: 17.4172, lng: 78.4116, type: 'hospital', bloodStock: { 'O+': 25, 'O-': 8, 'A+': 30, 'B+': 12, 'AB-': 3 }, phone: '+91 40 2360 7777', address: 'Jubilee Hills, Hyderabad' },
  { id: 'h3', name: 'Care Hospitals', lat: 17.4093, lng: 78.4485, type: 'hospital', bloodStock: { 'O+': 10, 'O-': 1, 'A+': 12, 'B+': 8, 'AB-': 0 }, phone: '+91 40 3041 8888', address: 'Banjara Hills, Hyderabad' },
  { id: 'h4', name: 'Yashoda Hospital', lat: 17.4416, lng: 78.4988, type: 'hospital', bloodStock: { 'O+': 22, 'O-': 5, 'A+': 16, 'B+': 15, 'AB-': 2 }, phone: '+91 40 4567 4567', address: 'Secunderabad, Hyderabad' },
  { id: 'h5', name: 'Osmania General Hospital', lat: 17.3776, lng: 78.4746, type: 'hospital', bloodStock: { 'O+': 40, 'O-': 3, 'A+': 25, 'B+': 32, 'AB-': 0 }, phone: '+91 40 2460 0122', address: 'Afzal Gunj, Hyderabad' },
  { id: 'h6', name: 'Gandhi Medical College & Hospital', lat: 17.4243, lng: 78.5034, type: 'hospital', bloodStock: { 'O+': 35, 'O-': 4, 'A+': 28, 'B+': 26, 'AB-': 4 }, phone: '+91 40 2750 5566', address: 'Musheerabad, Secunderabad' }
];

const DEFAULT_DONORS = [
  { id: 'd1', name: 'Athreya Ram Sharma', bloodGroup: 'O+', lat: 17.3912, lng: 78.4720, type: 'donor', phone: '+91 94401 23456', email: 'athreya@lifeshare.org', available: true },
  { id: 'd2', name: 'Boddu Dhiraj Guru Ram', bloodGroup: 'A+', lat: 17.3750, lng: 78.4900, type: 'donor', phone: '+91 98480 98765', email: 'dhiraj@lifeshare.org', available: true },
  { id: 'd3', name: 'Bonala Sagar', bloodGroup: 'B+', lat: 17.4120, lng: 78.4610, type: 'donor', phone: '+91 91770 12345', email: 'sagar@lifeshare.org', available: true },
  { id: 'd4', name: 'Yasa Rithwik Reddy', bloodGroup: 'AB-', lat: 17.4250, lng: 78.4350, type: 'donor', phone: '+91 88970 54321', email: 'rithwik@lifeshare.org', available: true },
  { id: 'd5', name: 'Arjun Verma', bloodGroup: 'O-', lat: 17.3995, lng: 78.4550, type: 'donor', phone: '+91 99887 76655', email: 'arjun@gmail.com', available: true },
  { id: 'd6', name: 'Priya Naidu', bloodGroup: 'A-', lat: 17.4320, lng: 78.4820, type: 'donor', phone: '+91 98660 11223', email: 'priya@gmail.com', available: true },
  { id: 'd7', name: 'Karthik Rao', bloodGroup: 'O+', lat: 17.3560, lng: 78.4520, type: 'donor', phone: '+91 95530 44556', email: 'karthik@yahoo.com', available: true },
  { id: 'd8', name: 'Sneha Patel', bloodGroup: 'B-', lat: 17.4520, lng: 78.4710, type: 'donor', phone: '+91 91234 56789', email: 'sneha@outlook.com', available: false },
  { id: 'd9', name: 'Ravi Teja', bloodGroup: 'AB+', lat: 17.3620, lng: 78.5210, type: 'donor', phone: '+91 80080 12121', email: 'ravi@gmail.com', available: true }
];

const DEFAULT_REQUESTS = [
  { id: 'r1', patientName: 'Srinivas Rao', bloodGroup: 'O-', urgency: 'Critical', hospitalName: 'NIMS, Punjagutta', lat: 17.4140, lng: 78.4552, contact: '+91 98850 12345', message: 'Required for heart bypass operation tomorrow morning. Need 2 units.' },
  { id: 'r2', patientName: 'Md. Saleem', bloodGroup: 'AB-', urgency: 'Critical', hospitalName: 'Osmania Hospital, Afzal Gunj', lat: 17.3776, lng: 78.4746, contact: '+91 90001 90002', message: 'Patient in emergency ward. Sepsis complication. Immediate replacement needed.' },
  { id: 'r3', patientName: 'G. Lakshmi', bloodGroup: 'A+', urgency: 'Urgent', hospitalName: 'Apollo Hospitals, Jubilee Hills', lat: 17.4172, lng: 78.4116, contact: '+91 91100 91100', message: 'Post-pregnancy surgery requirement. Scheduled for this evening.' },
  { id: 'r4', patientName: 'B. Venkat', bloodGroup: 'B+', urgency: 'Routine', hospitalName: 'Care Hospitals, Banjara Hills', lat: 17.4093, lng: 78.4485, contact: '+91 93939 12345', message: 'Platelet transfusion scheduled for Friday.' }
];

// ==========================================================================
// Initialization & Loading State
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadData();
  setupNavigation();
  setupForms();
  updateStats();
  renderRequestsBoard();
  loadGmapsScript(); // Dynamically load Google Maps script
  populatePortalSelect(); // Populate the health portal selector
});

// Theme Selector
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem(CONFIG.storageKeys.theme);
  
  if (storedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  toggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem(CONFIG.storageKeys.theme, 'light');
      toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      showToast('Switched to Light Theme', 'info');
      if (appState.map) {
        appState.map.setOptions({ styles: [] });
      }
    } else {
      document.body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem(CONFIG.storageKeys.theme, 'dark');
      toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      showToast('Switched to Dark Theme', 'info');
      if (appState.map) {
        appState.map.setOptions({ styles: getDarkMapStyle() });
      }
    }
  });
}

// State Data Loading/Saving
function loadData() {
  const localDonors = localStorage.getItem(CONFIG.storageKeys.donors);
  if (localDonors) {
    try {
      appState.donors = JSON.parse(localDonors);
    } catch (e) {
      appState.donors = [...DEFAULT_DONORS];
    }
  } else {
    appState.donors = [...DEFAULT_DONORS];
    localStorage.setItem(CONFIG.storageKeys.donors, JSON.stringify(appState.donors));
  }

  appState.hospitals = [...DEFAULT_HOSPITALS];

  const localRequests = localStorage.getItem(CONFIG.storageKeys.requests);
  if (localRequests) {
    try {
      appState.requests = JSON.parse(localRequests);
    } catch (e) {
      appState.requests = [...DEFAULT_REQUESTS];
    }
  } else {
    appState.requests = [...DEFAULT_REQUESTS];
    localStorage.setItem(CONFIG.storageKeys.requests, JSON.stringify(appState.requests));
  }
  populatePortalSelect(); // Populate portal selector on load
}

function saveDonors() {
  localStorage.setItem(CONFIG.storageKeys.donors, JSON.stringify(appState.donors));
}

function saveRequests() {
  localStorage.setItem(CONFIG.storageKeys.requests, JSON.stringify(appState.requests));
}

// Navigation Tab Management
function setupNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || 'dashboard';
    if (['dashboard', 'finder', 'register', 'request', 'requests-board', 'project-details'].includes(hash)) {
      switchTab(hash, false);
    }
  });

  const initialHash = window.location.hash.substring(1) || 'dashboard';
  switchTab(initialHash, false);
}

function switchTab(tabId, updateHash = true) {
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  const targetPanel = document.getElementById(tabId);
  if (targetPanel) {
    targetPanel.classList.add('active');
    appState.currentTab = tabId;
  }

  const targetLink = document.querySelector(`.nav-link[href="#${tabId}"]`);
  if (targetLink) {
    targetLink.classList.add('active');
  }

  if (updateHash) {
    window.location.hash = tabId;
  }

  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  if (navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  window.scrollTo(0, 0);
}

// Toast System
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '<i class="fa-solid fa-circle-check text-success"></i>';
  if (type === 'danger') {
    icon = '<i class="fa-solid fa-circle-exclamation text-danger"></i>';
  } else if (type === 'info') {
    icon = '<i class="fa-solid fa-circle-info text-primary"></i>';
  }

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s reverse forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// Stats Board Updating
function updateStats() {
  const activeDonors = appState.donors.filter(d => d.available).length;
  document.getElementById('statDonorsCount').textContent = activeDonors;
  document.getElementById('statHospitalsCount').textContent = appState.hospitals.length;
  const activeReqs = appState.requests.filter(r => r.urgency === 'Critical' || r.urgency === 'Urgent').length;
  document.getElementById('statActiveRequests').textContent = activeReqs;
}

// ==========================================================================
// Forms Actions & GPS Triggers
// ==========================================================================
function setupForms() {}

function detectDonorLocation() {
  const statusEl = document.getElementById('donorLocationStatus');
  statusEl.textContent = 'Locating...';
  statusEl.className = 'location-status text-primary';

  if (!navigator.geolocation) {
    statusEl.textContent = 'Geolocation not supported';
    statusEl.className = 'location-status text-danger';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      document.getElementById('donorLat').value = lat.toFixed(6);
      document.getElementById('donorLng').value = lng.toFixed(6);
      statusEl.textContent = 'GPS Coords Synced';
      statusEl.className = 'location-status text-success';
      showToast('GPS coordinates fetched successfully!', 'success');
    },
    (error) => {
      statusEl.textContent = 'Permission Denied / Timeout';
      statusEl.className = 'location-status text-danger';
      showToast('Could not fetch location. Please enter coordinates manually.', 'danger');
    },
    { enableHighAccuracy: true, timeout: 5000 }
  );
}

function detectRequestLocation() {
  const statusEl = document.getElementById('reqLocationStatus');
  statusEl.textContent = 'Locating...';
  statusEl.className = 'location-status text-primary';

  if (!navigator.geolocation) {
    statusEl.textContent = 'Geolocation not supported';
    statusEl.className = 'location-status text-danger';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      document.getElementById('reqLat').value = lat.toFixed(6);
      document.getElementById('reqLng').value = lng.toFixed(6);
      statusEl.textContent = 'GPS Coords Synced';
      statusEl.className = 'location-status text-success';
      showToast('Hospital GPS coordinates acquired!', 'success');
    },
    (error) => {
      statusEl.textContent = 'Permission Denied / Timeout';
      statusEl.className = 'location-status text-danger';
      showToast('Location acquisition failed. Enter manually.', 'danger');
    },
    { enableHighAccuracy: true, timeout: 5000 }
  );
}

function handleDonorRegistration(event) {
  event.preventDefault();
  
  const name = document.getElementById('donorName').value.trim();
  const bloodGroup = document.getElementById('donorBloodGroup').value;
  const phone = document.getElementById('donorPhone').value.trim();
  const email = document.getElementById('donorEmail').value.trim();
  const lat = parseFloat(document.getElementById('donorLat').value);
  const lng = parseFloat(document.getElementById('donorLng').value);

  if (!name || !bloodGroup || !phone || !email || isNaN(lat) || isNaN(lng)) {
    showToast('Please fill out all required fields correctly.', 'danger');
    return;
  }

  const newDonor = {
    id: 'donor_' + Date.now(),
    name,
    bloodGroup,
    lat,
    lng,
    type: 'donor',
    phone,
    email,
    available: true
  };

  appState.donors.push(newDonor);
  saveDonors();
  updateStats();
  populatePortalSelect(); // Sync selector in Donor Portal dropdown
  
  document.getElementById('donorForm').reset();
  showToast(`Thank you ${name}! You are registered as an active donor.`, 'success');
  
  setTimeout(() => {
    switchTab('finder');
    if (appState.map) appState.map.panTo({ lat, lng });
    applyFilters();
  }, 1000);
}

function handleBloodRequest(event) {
  event.preventDefault();

  const patientName = document.getElementById('reqPatientName').value.trim();
  const bloodGroup = document.getElementById('reqBloodGroup').value;
  const urgency = document.getElementById('reqUrgency').value;
  const hospitalName = document.getElementById('reqHospital').value.trim();
  const contact = document.getElementById('reqContact').value.trim();
  const lat = parseFloat(document.getElementById('reqLat').value);
  const lng = parseFloat(document.getElementById('reqLng').value);
  const message = document.getElementById('reqMessage').value.trim();

  if (!patientName || !bloodGroup || !urgency || !hospitalName || !contact || isNaN(lat) || isNaN(lng)) {
    showToast('Please fill out all required fields.', 'danger');
    return;
  }

  const newRequest = {
    id: 'req_' + Date.now(),
    patientName,
    bloodGroup,
    urgency,
    hospitalName,
    lat,
    lng,
    contact,
    message
  };

  appState.requests.unshift(newRequest);
  saveRequests();
  updateStats();
  renderRequestsBoard();

  document.getElementById('requestForm').reset();
  showToast(`Emergency broadcast posted for ${patientName} (${bloodGroup})!`, 'success');

  setTimeout(() => {
    switchTab('requests-board');
  }, 1000);
}

function triggerQuickSearch() {
  const bloodGroup = document.getElementById('quickBloodGroup').value;
  const searchType = document.getElementById('quickSearchType').value;

  const filterBloodGroup = document.getElementById('filterBloodGroup');
  const filterType = document.getElementById('filterType');

  if (filterBloodGroup) filterBloodGroup.value = bloodGroup;
  if (filterType) filterType.value = searchType;

  switchTab('finder');

  if (!appState.userLocation) {
    getUserLocation();
  } else {
    applyFilters();
  }
}

function renderRequestsBoard() {
  const grid = document.getElementById('requestsGrid');
  grid.innerHTML = '';

  if (appState.requests.length === 0) {
    grid.innerHTML = `<div class="no-results py-5 col-12"><i class="fa-solid fa-circle-check text-success" style="font-size: 3rem;"></i><p class="mt-3">No active emergency requests reported.</p></div>`;
    return;
  }

  appState.requests.forEach(req => {
    const card = document.createElement('div');
    const badgeClass = req.urgency === 'Critical' ? 'badge-critical' : (req.urgency === 'Urgent' ? 'badge-urgent' : 'badge-routine');
    card.className = `request-card glass-panel card-hover ${req.urgency === 'Critical' ? 'critical-need' : ''}`;
    card.innerHTML = `
      <div class="request-card-meta"><span class="request-badge ${badgeClass}">${req.urgency}</span><span class="result-bg-badge">${req.bloodGroup}</span></div>
      <h3>Req: ${req.patientName}</h3>
      <div class="request-meta-item"><i class="fa-solid fa-hospital text-danger"></i> <span>${req.hospitalName}</span></div>
      <div class="request-meta-item"><i class="fa-solid fa-phone text-success"></i> <span>${req.contact}</span></div>
      ${req.message ? `<div class="request-message-box">"${req.message}"</div>` : ''}
      <div class="request-footer" style="flex-wrap: wrap; gap: 8px;">
        <button class="btn btn-secondary btn-sm" onclick="locateRequestOnMap(${req.lat}, ${req.lng}, '${req.patientName}')"><i class="fa-solid fa-map-pin"></i> Pin</button>
        <button class="btn btn-primary btn-sm btn-sms" onclick="sendSMS('${req.contact}', '${req.patientName}', '${req.bloodGroup}')"><i class="fa-solid fa-message"></i> SMS</button>
        <button class="btn btn-primary btn-sm btn-whatsapp" onclick="shareOnWhatsApp('${req.contact}', '${req.patientName}', '${req.hospitalName}', '${req.bloodGroup}')"><i class="fa-brands fa-whatsapp"></i> WhatsApp</button>
        <button class="btn btn-primary btn-sm" onclick="dialNumber('${req.contact}', '${req.patientName}')"><i class="fa-solid fa-phone-flip"></i> Call</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function dialNumber(phoneNumber, targetName) {
  window.location.href = `tel:${phoneNumber}`;
}

// ==========================================================================
// Settings and API Key manager
// ==========================================================================
function loadGmapsScript() {
  const storedKey = localStorage.getItem('lifeshare_gmaps_api_key') || '';
  document.getElementById('gmapsApiKey').value = storedKey;
  if (!storedKey) {
    document.getElementById('gmapsKeyWarning').style.display = 'block';
  } else {
    document.getElementById('gmapsKeyWarning').style.display = 'none';
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${storedKey}&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    showToast('Failed to load Google Maps script. Check network connection or API Key.', 'danger');
  };
  document.head.appendChild(script);
}

function toggleMapSettings() {
  const modal = document.getElementById('mapSettingsModal');
  modal.classList.toggle('open');
}

function saveMapSettings() {
  const keyInput = document.getElementById('gmapsApiKey').value.trim();
  localStorage.setItem('lifeshare_gmaps_api_key', keyInput);
  showToast('API Key saved! Reloading map application...', 'success');
  toggleMapSettings();
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

function shareOnWhatsApp(phone, patient, hospital, bloodGroup) {
  const text = `Emergency Blood Request! Patient: ${patient} needs ${bloodGroup} blood at ${hospital}. Contact: ${phone}. Reference Location map link: https://maps.google.com/?q=${appState.userLocation ? appState.userLocation.lat : 17.3850},${appState.userLocation ? appState.userLocation.lng : 78.4867}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
}

function sendSMS(phone, patient, bloodGroup) {
  const body = `Hi, I saw your urgent blood request for ${bloodGroup} for patient ${patient}. I can help coordinate delivery.`;
  window.open(`sms:${phone}?body=${encodeURIComponent(body)}`, '_blank');
}

// ==========================================================================
// Google Maps Custom Styling Definitions (Charcoal Dark Theme)
// ==========================================================================
function getDarkMapStyle() {
  return [
    { elementType: "geometry", stylers: [{ color: "#1a1f29" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#1a1f29" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#748296" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#0f1522" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#111622" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1e2536" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#222a3d" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ff2e54", weight: 0.5, opacity: 0.1 }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#161c28" }] },
    { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d111c" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4b5563" }] },
    { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#0d111c" }] }
  ];
}

function getDonorIcon(bloodGroup) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <path d="M20 2C11.16 2 4 9.16 4 18c0 10.3 16 20 16 20s16-9.7 16-20c0-8.84-7.16-16-16-16z" fill="#ff2e54"/>
    <circle cx="20" cy="16" r="9" fill="#ffffff"/>
    <text x="20" y="19.5" font-family="Outfit, sans-serif" font-weight="800" font-size="10" fill="#ff2e54" text-anchor="middle">${bloodGroup}</text>
  </svg>`;
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40)
  };
}

function getHospitalIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <path d="M20 2C11.16 2 4 9.16 4 18c0 10.3 16 20 16 20s16-9.7 16-20c0-8.84-7.16-16-16-16z" fill="#3b82f6"/>
    <circle cx="20" cy="16" r="9" fill="#ffffff"/>
    <path d="M16 11h2v4h4v-4h2v10h-2v-4h-4v4h-2z" fill="#3b82f6"/>
  </svg>`;
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40)
  };
}

function getUserIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <circle cx="20" cy="20" r="16" fill="#10b981" fill-opacity="0.15"/>
    <circle cx="20" cy="20" r="10" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="20" cy="20" r="5" fill="#10b981"/>
  </svg>`;
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 20)
  };
}

// ==========================================================================
// GPS & Maps Logic (Google Maps API integration)
// ==========================================================================
function initMap() {
  if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
    console.error('Google Maps script not loaded fully.');
    return;
  }

  // Create shared InfoWindow instance
  appState.infoWindow = new google.maps.InfoWindow();

  const startingPos = CONFIG.defaultCoords;
  const mapElement = document.getElementById('map');

  appState.map = new google.maps.Map(mapElement, {
    center: startingPos,
    zoom: 13,
    styles: document.body.classList.contains('dark-theme') ? getDarkMapStyle() : [],
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    clickableIcons: false
  });

  // Map Click Listener to manually drop pin (essential for custom reference locks)
  appState.map.addListener('click', (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    appState.userLocation = { lat, lng };
    
    const coordsBadge = document.getElementById('coordsBadge');
    coordsBadge.innerHTML = `<i class="fa-solid fa-map-pin text-success"></i> Manual Pin: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    
    seedMockDataAroundCoords(lat, lng);
    applyFilters();
    showToast('Reference location set by map click!', 'info');
  });

  // Start with filters applied
  applyFilters();
}

// Trigger Browser GPS Geolocation
function getUserLocation() {
  const coordsBadge = document.getElementById('coordsBadge');
  
  if (!navigator.geolocation) {
    showToast('Geolocation is not supported by your browser.', 'danger');
    appState.userLocation = CONFIG.defaultCoords;
    coordsBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-danger"></i> Mock GPS Active: Central Hyderabad`;
    applyFilters();
    return;
  }

  showToast('Requesting GPS coordinates...', 'info');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      appState.userLocation = { lat, lng };
      coordsBadge.innerHTML = `<i class="fa-solid fa-location-crosshairs text-success"></i> GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      
      if (appState.map) {
        appState.map.setCenter({ lat, lng });
        appState.map.setZoom(13);
      }
      showToast('GPS coordinates locked!', 'success');
      
      seedMockDataAroundCoords(lat, lng);
      applyFilters();
    },
    (error) => {
      console.warn('Geolocation error: ' + error.message);
      showToast('GPS access denied. Using default Hyderabad coordinates.', 'info');
      
      appState.userLocation = CONFIG.defaultCoords;
      coordsBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-warning"></i> Mock GPS Centered (17.3850, 78.4867)`;
      
      if (appState.map) {
        appState.map.setCenter(CONFIG.defaultCoords);
        appState.map.setZoom(13);
      }
      applyFilters();
    },
    { enableHighAccuracy: true, timeout: 6000 }
  );
}

// Dynamic Mock Seeding near the coordinate anchor
function seedMockDataAroundCoords(lat, lng) {
  if (appState.donors.some(d => d.id.startsWith('rel_'))) return;

  const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  const firstNames = ['Ramesh', 'Sita', 'Vikram', 'Divya', 'Ananth', 'Keerthi', 'Syed', 'Nikhil'];
  const lastNames = ['Kumar', 'Reddy', 'Rao', 'Shastri', 'Begum', 'Prasad', 'Naidu', 'Sen'];

  for (let i = 0; i < 5; i++) {
    const latOffset = (Math.random() - 0.5) * 0.04;
    const lngOffset = (Math.random() - 0.5) * 0.04;
    const randBlood = bloodGroups[Math.floor(Math.random() * bloodGroups.length)];
    const randName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    
    appState.donors.push({
      id: `rel_d_${i}`,
      name: randName,
      bloodGroup: randBlood,
      lat: lat + latOffset,
      lng: lng + lngOffset,
      type: 'donor',
      phone: `+91 90000 ${10000 + i}`,
      email: `${randName.toLowerCase().replace(' ', '')}@gmail.com`,
      available: true
    });
  }

  const hospitalNames = ['City Emergency Center', 'Lifeline Speciality Clinic', 'Red Cross Depot'];
  for (let i = 0; i < 2; i++) {
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    
    appState.hospitals.push({
      id: `rel_h_${i}`,
      name: hospitalNames[i % hospitalNames.length],
      lat: lat + latOffset,
      lng: lng + lngOffset,
      type: 'hospital',
      bloodStock: { 'O+': 8, 'O-': 2, 'A+': 12, 'B+': 10, 'AB-': 1 },
      phone: `+91 40 5555 ${1000 + i}`,
      address: 'Near reference region'
    });
  }

  saveDonors();
  updateStats();
}

function panMapTo(lat, lng) {
  if (appState.map) {
    appState.map.panTo({ lat, lng });
  }
}

function updateRadiusLabel(val) {
  document.getElementById('radiusVal').textContent = val;
}

// Filter calculations & marker draws
function applyFilters() {
  if (!appState.map) return;

  const bloodFilter = document.getElementById('filterBloodGroup').value;
  const typeFilter = document.getElementById('filterType').value;
  const radiusFilter = parseFloat(document.getElementById('filterRadius').value);

  // Clear existing Google markers
  appState.markers.forEach(m => m.setMap(null));
  appState.markers = [];

  if (appState.radiusCircle) {
    appState.radiusCircle.setMap(null);
    appState.radiusCircle = null;
  }

  const centerCoords = appState.userLocation || CONFIG.defaultCoords;

  // Add User Marker node
  if (appState.userLocation) {
    const userMarker = new google.maps.Marker({
      position: centerCoords,
      map: appState.map,
      icon: getUserIcon(),
      title: "Your Reference Location"
    });

    userMarker.addListener('click', () => {
      appState.infoWindow.setContent(`
        <div style="font-family: var(--font-family); color: var(--text-heading);">
          <h4 style="color: var(--accent-color); font-weight:700;">Your Reference Position</h4>
          <p style="font-size:0.85rem; margin-top:4px;">Radius queries are centered on this coordinate lock.</p>
        </div>
      `);
      appState.infoWindow.open(appState.map, userMarker);
    });

    appState.markers.push(userMarker);

    // Draw visual search radius circle
    appState.radiusCircle = new google.maps.Circle({
      strokeColor: '#ff2e54',
      strokeOpacity: 0.6,
      strokeWeight: 1.5,
      fillColor: '#ff2e54',
      fillOpacity: 0.03,
      map: appState.map,
      center: centerCoords,
      radius: radiusFilter * 1000 // meters
    });
  }

  const resultsList = document.getElementById('resultsList');
  resultsList.innerHTML = '';

  let matches = [];

  // Filter Donors
  if (typeFilter === 'all' || typeFilter === 'donors') {
    appState.donors.forEach(donor => {
      if (bloodFilter !== 'all' && donor.bloodGroup !== bloodFilter) return;
      if (!donor.available) return;

      const distance = calculateDistance(centerCoords.lat, centerCoords.lng, donor.lat, donor.lng);
      if (distance <= radiusFilter) {
        matches.push({ ...donor, distance });
      }
    });
  }

  // Filter Hospitals
  if (typeFilter === 'all' || typeFilter === 'hospitals') {
    appState.hospitals.forEach(hospital => {
      if (bloodFilter !== 'all') {
        const stock = hospital.bloodStock[bloodFilter] || 0;
        if (stock === 0) return;
      }

      const distance = calculateDistance(centerCoords.lat, centerCoords.lng, hospital.lat, hospital.lng);
      if (distance <= radiusFilter) {
        matches.push({ ...hospital, distance });
      }
    });
  }

  // Sort matches by distance
  matches.sort((a, b) => a.distance - b.distance);

  document.getElementById('resultsCount').textContent = matches.length;

  if (matches.length === 0) {
    resultsList.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-magnifying-glass-minus text-muted"></i>
        <p>No matching resources found within ${radiusFilter}km. Try expanding your search radius.</p>
      </div>
    `;
    return;
  }

  // Render matches
  matches.forEach(item => {
    let marker;
    let popupContent = '';

    if (item.type === 'donor') {
      marker = new google.maps.Marker({
        position: { lat: item.lat, lng: item.lng },
        map: appState.map,
        icon: getDonorIcon(item.bloodGroup),
        title: item.name
      });

      popupContent = `
        <div style="font-family: var(--font-family); min-width: 180px; color:#0f172a;">
          <h4 style="color: var(--primary-color); font-weight:700; margin-bottom: 4px;">Donor: ${item.name}</h4>
          <p style="font-size:0.85rem; color:#475569;"><strong>Blood Group:</strong> <span style="background:#ff2e54; color:white; padding: 1px 6px; border-radius: 4px; font-weight:bold;">${item.bloodGroup}</span></p>
          <p style="margin-top: 6px; font-size:0.85rem; color:#475569;"><strong>Phone:</strong> ${item.phone}</p>
          <p style="font-size:0.85rem; color:#475569;"><strong>Proximity:</strong> ${item.distance.toFixed(2)} km</p>
          <div style="margin-top: 10px; display:flex; gap:6px;">
            <a href="tel:${item.phone}" style="background:#ff2e54; color:white; padding:6px 10px; border-radius:4px; font-weight:600; font-size:0.75rem; text-decoration:none; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-phone"></i> Call</a>
            <a href="sms:${item.phone}" style="background:#3b82f6; color:white; padding:6px 10px; border-radius:4px; font-weight:600; font-size:0.75rem; text-decoration:none; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-comment-sms"></i> SMS</a>
          </div>
        </div>
      `;
    } else {
      marker = new google.maps.Marker({
        position: { lat: item.lat, lng: item.lng },
        map: appState.map,
        icon: getHospitalIcon(),
        title: item.name
      });

      let stockList = Object.entries(item.bloodStock)
        .map(([g, qty]) => `<li><strong>${g}:</strong> ${qty} units</li>`).join('');

      popupContent = `
        <div style="font-family: var(--font-family); min-width: 200px; color:#0f172a;">
          <h4 style="color: var(--secondary-color); font-weight:700; margin-bottom: 2px;">${item.name}</h4>
          <p style="font-size: 0.8rem; color:#64748b; margin-bottom:6px;">${item.address}</p>
          <div style="margin-top: 4px; font-size:0.8rem; color:#475569;">
            <strong>Blood Inventory Status:</strong>
            <ul style="padding-left:12px; margin-top:4px;">
              ${stockList}
            </ul>
          </div>
          <p style="margin-top: 6px; font-size:0.85rem; color:#475569;"><strong>Phone:</strong> ${item.phone}</p>
          <p style="font-size:0.85rem; color:#475569;"><strong>Proximity:</strong> ${item.distance.toFixed(2)} km</p>
          <a href="tel:${item.phone}" style="display:inline-block; margin-top:8px; background:#3b82f6; color:white; padding:6px 10px; border-radius:4px; font-weight:600; font-size:0.75rem; text-decoration:none;"><i class="fa-solid fa-phone"></i> Contact Hospital</a>
        </div>
      `;
    }

    marker.addListener('click', () => {
      appState.infoWindow.setContent(popupContent);
      appState.infoWindow.open(appState.map, marker);
    });

    appState.markers.push(marker);

    // Sidebar card layout
    const card = document.createElement('div');
    card.className = 'result-card';
    
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-contact')) return;

      document.querySelectorAll('.result-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      if (appState.map) {
        appState.map.panTo({ lat: item.lat, lng: item.lng });
        appState.infoWindow.setContent(popupContent);
        appState.infoWindow.open(appState.map, marker);
      }
    });

    if (item.type === 'donor') {
      card.innerHTML = `
        <div class="result-card-header">
          <span class="result-title">${item.name}</span>
          <span class="result-bg-badge">${item.bloodGroup}</span>
        </div>
        <div class="result-card-detail">
          <i class="fa-solid fa-circle pulse-green" style="color: var(--accent-color); font-size:0.6rem;"></i>
          <span>Available Now</span>
        </div>
        <div class="result-card-footer">
          <span class="result-distance"><i class="fa-solid fa-route"></i> ${item.distance.toFixed(2)} km</span>
          <button class="btn btn-primary btn-contact" onclick="dialNumber('${item.phone}', '${item.name}')">
            <i class="fa-solid fa-phone"></i> Call
          </button>
        </div>
      `;
    } else {
      const stockText = bloodFilter !== 'all' 
        ? `${item.bloodStock[bloodFilter]} bags of ${bloodFilter}`
        : `${Object.values(item.bloodStock).reduce((a, b) => a + b, 0)} bags in stock`;

      card.innerHTML = `
        <div class="result-card-header">
          <span class="result-title">${item.name}</span>
          <span class="result-bg-badge" style="background: var(--secondary-color);">${bloodFilter !== 'all' ? bloodFilter : 'HOSP'}</span>
        </div>
        <div class="result-card-detail">
          <i class="fa-solid fa-boxes-stacked" style="font-size:0.8rem;"></i>
          <span>${stockText}</span>
        </div>
        <div class="result-card-footer">
          <span class="result-distance" style="color: var(--secondary-color);"><i class="fa-solid fa-route"></i> ${item.distance.toFixed(2)} km</span>
          <button class="btn btn-secondary btn-contact" style="padding: 4px 10px;" onclick="dialNumber('${item.phone}', '${item.name}')">
            <i class="fa-solid fa-phone"></i> Contact
          </button>
        </div>
      `;
    }

    resultsList.appendChild(card);
  });
}

function locateRequestOnMap(lat, lng, label) {
  switchTab('finder');
  if (appState.map) {
    appState.map.panTo({ lat, lng });
    appState.map.setZoom(15);
    
    // Drop a temporary emergency marker
    const tempMarker = new google.maps.Marker({
      position: { lat, lng },
      map: appState.map,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
          <circle cx="20" cy="20" r="18" fill="#ef4444" fill-opacity="0.2"/>
          <circle cx="20" cy="20" r="10" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
        </svg>`),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20)
      },
      title: `Emergency Location: ${label}`
    });

    appState.infoWindow.setContent(`
      <div style="font-family: var(--font-family); color: #ef4444; max-width:180px;">
        <h4 style="font-weight:700;">Critical Alert: ${label}</h4>
        <p style="font-size:0.85rem; margin-top:4px; color:var(--text-main);">Coordinates requested here.</p>
      </div>
    `);
    appState.infoWindow.open(appState.map, tempMarker);

    setTimeout(() => {
      tempMarker.setMap(null);
    }, 12000);
  }
}

// Math Formula: Haversine distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; 
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}



// ==========================================================================
// Donor Portal & Vitals Dashboard
// ==========================================================================
function populatePortalSelect() {
  const selectEl = document.getElementById('portalDonorSelect');
  if (!selectEl) return;

  selectEl.innerHTML = '<option value="" disabled selected>Choose a donor profile</option>';

  appState.donors.forEach(donor => {
    const opt = document.createElement('option');
    opt.value = donor.id;
    opt.textContent = `${donor.name} (${donor.bloodGroup})`;
    selectEl.appendChild(opt);
  });
}

function updatePortalDashboard(donorId) {
  const donor = appState.donors.find(d => d.id === donorId);
  if (!donor) return;

  // Seed metrics consistently based on donor name hashing
  let hash = 0;
  for (let i = 0; i < donor.name.length; i++) {
    hash = donor.name.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const sys = 112 + (hash % 14); // 112-126
  const dia = 72 + (hash % 10);  // 72-82
  const bp = `${sys}/${dia}`;

  const hgb = (12.8 + ((hash % 28) / 10)).toFixed(1); // 12.8 - 15.6
  const pulse = 64 + (hash % 18); // 64-82
  const chol = 155 + (hash % 65); // 155-220

  document.getElementById('vitalBP').innerHTML = `${bp} <span class="vital-unit">mmHg</span>`;
  document.getElementById('vitalHgb').innerHTML = `${hgb} <span class="vital-unit">g/dL</span>`;
  document.getElementById('vitalPulse').innerHTML = `${pulse} <span class="vital-unit">bpm</span>`;
  document.getElementById('vitalChol').innerHTML = `${chol} <span class="vital-unit">mg/dL</span>`;

  // Status updates
  const statusBPEl = document.getElementById('statusBP');
  if (sys > 120 || dia > 80) {
    statusBPEl.textContent = 'Prehypertension';
    statusBPEl.className = 'vital-status status-warning';
  } else {
    statusBPEl.textContent = 'Optimal';
    statusBPEl.className = 'vital-status status-normal';
  }

  const statusHgbEl = document.getElementById('statusHgb');
  statusHgbEl.textContent = 'Healthy';
  statusHgbEl.className = 'vital-status status-normal';

  const statusPulseEl = document.getElementById('statusPulse');
  statusPulseEl.textContent = 'Healthy';
  statusPulseEl.className = 'vital-status status-normal';

  const statusCholEl = document.getElementById('statusChol');
  if (chol > 200) {
    statusCholEl.textContent = 'Borderline High';
    statusCholEl.className = 'vital-status status-warning';
  } else {
    statusCholEl.textContent = 'Normal';
    statusCholEl.className = 'vital-status status-normal';
  }

  // Next eligible timeline status message
  const eligMessage = document.getElementById('eligibilityMessage');
  if (donor.available) {
    eligMessage.innerHTML = `<p class="status-msg text-success mt-2"><i class="fa-solid fa-circle-check"></i> Eligible to Donate today!</p>`;
  } else {
    eligMessage.innerHTML = `<p class="status-msg text-danger mt-2"><i class="fa-solid fa-circle-xmark"></i> Deferred (Recently Donated)</p><p style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">Eligible after 56 days rest window.</p>`;
  }
}
