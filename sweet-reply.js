document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const muteButton = document.getElementById('mute-button');
    const audio = document.getElementById('background-music');
    const backButton = document.getElementById('back-button');

    // Function to create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }

    // Generate hearts at an interval
    setInterval(createHeart, 100);

    // Audio control
    muteButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            muteButton.textContent = 'Mute';
        } else {
            audio.pause();
            muteButton.textContent = 'Unmute';
        }
    });

    // Back button functionality
    backButton.addEventListener('click', () => {
        window.history.back(); // Go back to the previous page
    });

    // Start music
    audio.play();
});