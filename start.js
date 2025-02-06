document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const muteButton = document.getElementById('mute-button');
    const audio = document.getElementById('background-music');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const valentineText = document.getElementById('valentine-text');
    const teddyLeft = document.getElementById('teddy-left');
    const teddyRight = document.getElementById('teddy-right');

    // Array to store heart elements for interaction
    let hearts = [];
    let fadeCount = 0; // Counter for fade animations

    // Function to create interactive hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartContainer.appendChild(heart);
        hearts.push(heart); // Add to array for interaction
        setTimeout(() => {
            hearts = hearts.filter(h => h !== heart);
            heart.remove();
        }, 5000); // Remove heart after animation
    }

    // Create fading hearts in the background
    function createFadeHeart() {
        const fadeHeart = document.createElement('div');
        fadeHeart.className = 'fade-heart';
        fadeHeart.style.left = `${Math.random() * 100}vw`;
        fadeHeart.style.top = `${Math.random() * 100}vh}`;
        heartContainer.appendChild(fadeHeart);
        setTimeout(() => fadeHeart.remove(), 3000); 
    }

    // Hearts follow mouse cursor
    document.addEventListener('mousemove', (e) => {
        hearts.forEach(heart => {
            const x = e.clientX;
            const y = e.clientY;
            const dx = (x - heart.offsetLeft) * 0.02;
            const dy = (y - heart.offsetTop) * 0.02;
            heart.style.left = `${heart.offsetLeft + dx}px`;
            heart.style.top = `${heart.offsetTop + dy}px`;
        });
    });
    
    // Function to handle teddy bear fade animations
    function fadeInOutTeddy(teddy) {
        if (fadeCount < 500) { // Three fades for better control
            teddy.style.opacity = '1';
            setTimeout(() => {
                teddy.style.opacity = '0';
                setTimeout(() => fadeInOutTeddy(teddy), 1000); // Fade out then back in
            }, 1000);
        } else {
            teddy.style.opacity = '1'; // Keep visible after three fades
        }
        fadeCount++;
    }

    // Generate hearts at an interval
    setInterval(createHeart, 100);
    setInterval(createFadeHeart, 200);

    // Check if teddy bears exist before animating
    if (teddyLeft && teddyRight) {
        fadeInOutTeddy(teddyLeft);
        fadeInOutTeddy(teddyRight);
    } else {
        console.error('One or both teddy bear elements are missing from the DOM.');
    }

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

    // Button functionalities
    yesButton.addEventListener('click', () => {
        yesButton.textContent = '😊ILY';
        yesButton.style.width = '150px';
        
        // Display romantic message
        const romanticMessage = document.createElement('p');
        romanticMessage.textContent = "Every moment with you feels like a fairytale come true. I love you more than words can express.";
        romanticMessage.style.color = 'black';
        romanticMessage.style.fontSize = '1.5em';
        romanticMessage.style.position = 'absolute';
        romanticMessage.style.top = '10%';
        romanticMessage.style.left = '50%';
        romanticMessage.style.transform = 'translate(-50%, -50%)';
        romanticMessage.style.display = 'none'; // Initially hidden
        romanticMessage.style.opacity = '0'; // Start with opacity 0 for fade in
        document.body.appendChild(romanticMessage);
        
        // Fade in the message
        romanticMessage.style.display = 'block';
        setTimeout(() => {
            romanticMessage.style.opacity = '1';
            romanticMessage.style.transition = 'opacity 1s';
        }, 100);
        
        // Remove message after 4 seconds
        setTimeout(() => {
            romanticMessage.style.opacity = '0';
            setTimeout(() => {
                romanticMessage.remove(); // Ensure it's fully faded out before removal
                // Redirect after the message has been removed
                window.location.href = 'sweet-reply.html'; 
            }, 1000);
        }, 6000);
    });

    noButton.addEventListener('mouseenter', moveButton);

    function moveButton() {
        const screenWidth = window.innerWidth - noButton.offsetWidth;
        const screenHeight = window.innerHeight - noButton.offsetHeight;
        
        noButton.style.left = `${Math.random() * screenWidth}px`;
        noButton.style.top = `${Math.random() * screenHeight}px`;
        noButton.classList.add('wiggle');
        noButton.addEventListener('animationend', () => {
            noButton.classList.remove('wiggle');
        }, { once: true });

        // Create and animate a heart
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${noButton.offsetLeft + noButton.offsetWidth / 2}px`;
        heart.style.top = `${noButton.offsetTop + noButton.offsetHeight / 2}px`;
        document.body.appendChild(heart);
        heart.addEventListener('animationend', () => {
            heart.remove();
        }, { once: true });

        // Add crying emojis
        for (let i = 0; i < 5; i++) {
            const emoji = document.createElement('span');
            emoji.textContent = '😢';
            emoji.className = 'crying-emoji';
            emoji.style.left = `${Math.random() * 100}vw`;
            emoji.style.top = `${Math.random() * 100}vh}`;
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 5000); // Remove emoji after animation
        }
    }

    // Dynamic text effect
    valentineText.addEventListener('mouseenter', () => {
        valentineText.classList.add('hover-effect');
    });
    valentineText.addEventListener('mouseleave', () => {
        valentineText.classList.remove('hover-effect');
    });

    // Start music
    audio.play();
});
