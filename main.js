function toggleMute() {
    var video = document.getElementById('video');
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
}

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function showVideo() {
    var video = document.getElementById('video');
    var container = document.getElementById('container');
    video.style.display = 'block';
    container.style.display = 'none';
    delay(100).then(() => toggleMute());
}

let hasInteracted = false;

const fullscreenButton = document.getElementById('button');
const videoElement = document.getElementById('video');
const container = document.getElementById('container-video');

fullscreenButton.addEventListener('click', () => {
    hasInteracted = true;
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        container.style.display = 'block';
    } else {
        container.style.display = 'block';
    }
});

fullscreenButton.addEventListener('click', () => {
    hasInteracted = true;
});
videoElement.addEventListener('click', () => {
    hasInteracted = true;
});

window.onbeforeunload = function () {
    if (!hasInteracted) {
        return "Changes you made may not be saved.";
    }
};

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
