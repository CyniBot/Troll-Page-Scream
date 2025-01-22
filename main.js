/* Toggle Button to Unmute the Video */
function toggleMute() {
    var video = document.getElementById('video');
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
}

/* Delay Function to Add SetTimeOut After Defined Interval */
function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/* Show Video Function to Add Display Property to Show the Video on Click of Button which will fulfill User Interaction Needs to Browser to Run the Video with Unmute State */
function showVideo() {
    var element = document.getElementById('video');
    var button = document.getElementById('container');
    element.style.display = 'block';
    button.style.display = 'none';
    delay(100).then(() => toggleMute());
}

const fullscreenButton = document.getElementById('button');
const content = document.getElementById('container-video');

fullscreenButton.addEventListener('click', () => {
    if (content.requestFullscreen) {
        content.requestFullscreen();
    } else if (content.mozRequestFullScreen) { // Firefox
        content.mozRequestFullScreen();
    } else if (content.webkitRequestFullscreen) { // Chrome, Safari and Opera
        content.webkitRequestFullscreen();
    } else if (content.msRequestFullscreen) { // Internet Explorer/Edge
        content.msRequestFullscreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        content.style.display = 'block';
    } else {
        content.style.display = 'block';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const counterElement = document.getElementById("counter");
    const messageElement = document.getElementById("recaptcha-container");
    const messageElementText = document.getElementById("text-captcha");

    let seconds = 3;

    function updateCounter() {
        counterElement.textContent = "Please allow up to " + seconds + " seconds...";
        seconds--;

        if (seconds < 0) {
            clearInterval(interval);
            counterElement.style.display = "none";
            messageElement.style.display = "flex";
            messageElementText.style.display = "flex";
        }
    }

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
});

/* Add "Changes you made may not be saved" warning */
let hasInteracted = false; // Track whether the user interacted

// Set hasInteracted to true when the user interacts
fullscreenButton.addEventListener('click', () => {
    hasInteracted = true;
});
document.getElementById('video').addEventListener('click', () => {
    hasInteracted = true;
});
document.getElementById('container').addEventListener('click', () => {
    hasInteracted = true;
});

// Warn the user when navigating away without interaction
window.onbeforeunload = function () {
    if (!hasInteracted) {
        return "Changes you made may not be saved.";
    }
};
