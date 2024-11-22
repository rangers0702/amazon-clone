// Safe Zone Settings (New Delhi, India as the center)
const safeZoneCenter = { lat: 28.6139, lon: 77.2090 };  // New Delhi coordinates
const safeZoneRadius = 10;  // Radius of safe zone in km

// DOM Elements
const statusElement = document.getElementById("status");
const latitudeElement = document.getElementById("latitude");
const longitudeElement = document.getElementById("longitude");
const alertElement = document.getElementById("alert");
const getLocationButton = document.getElementById("get-location");
const locationInfoElement = document.getElementById("location-info");
const itineraryBtn = document.getElementById("manage-itinerary-btn");
const incidentAlertElement = document.getElementById("incident-alerts");
const riskManagementElement = document.getElementById("risk-management");
const insuranceBtn = document.getElementById("insurance-btn");
const chatbotInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatbotBox = document.getElementById("chatbox");

// Function to calculate distance between two geographical points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to check if the current location is within the safe zone
function isInSafeZone(lat, lon) {
    const distance = calculateDistance(lat, lon, safeZoneCenter.lat, safeZoneCenter.lon);
    return distance <= safeZoneRadius;
}

// Function to handle geolocation retrieval
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        statusElement.textContent = "Geolocation is not supported by this browser.";
    }
}

// Display the position and check if it's within the safe zone
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Update the latitude and longitude on the page
    latitudeElement.textContent = lat.toFixed(4);
    longitudeElement.textContent = lon.toFixed(4);
    
    // Show the location info
    locationInfoElement.classList.remove("hidden");

    // Check if the location is within the safe zone
    const inSafeZone = isInSafeZone(lat, lon);
    
    if (inSafeZone) {
        statusElement.textContent = "You are within a safe zone.";
        statusElement.style.color = "green";
        alertElement.classList.add("hidden");
    } else {
        statusElement.textContent = "You are outside the safe zone!";
        statusElement.style.color = "red";
        alertElement.classList.remove("hidden");
    }
}

// Handle geolocation errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            statusElement.textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            statusElement.textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            statusElement.textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            statusElement.textContent = "An unknown error occurred.";
            break;
    }
}

// Event listener for the "Get Current Location" button
getLocationButton.addEventListener("click", getLocation);

// Event listener for managing itinerary
itineraryBtn.addEventListener("click", () => {
    alert("Itinerary management feature coming soon!");
});

// Event listener for insurance
insuranceBtn.addEventListener("click", () => {
    alert("Get a quote for your travel insurance from our partner providers.");
});

// Event listener for chatbot interaction
sendBtn.addEventListener("click", () => {
    const userQuestion = chatbotInput.value;
    if (userQuestion.trim()) {
        const botResponse = "I can assist you with your travel safety needs!";
        const newMessage = `<p><strong>You:</strong> ${userQuestion}</p><p><strong>Bot:</strong> ${botResponse}</p>`;
        chatbotBox.innerHTML += newMessage;
        chatbotBox.scrollTop = chatbotBox.scrollHeight;
        chatbotInput.value = "";
    }
});
