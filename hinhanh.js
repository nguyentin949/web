document.addEventListener('DOMContentLoaded', () => {
    const displayImage = document.getElementById('displayImage');
    const prevImageBtn = document.getElementById('prevImageBtn');
    const nextImageBtn = document.getElementById('nextImageBtn');

    const images = [
        "tran.jpg", 
        "gift_icon.png", 
        "tran.jpg", 
        "podcast.png", 
        "tran.jpg" 
    ];
    let currentImageIndex = 0;

    function updateImage() {
        displayImage.src = images[currentImageIndex];
    }

    prevImageBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextImageBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });

    updateImage();

    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
        },
        "retina_detect": true
    });

    function createConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        if (!confettiContainer) return;
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confettiContainer.appendChild(confetti);
        }
    }
    createConfetti();

    function createFallingElement() {
        const container = document.getElementById('falling-elements-container');
        if (!container) return;
        const element = document.createElement('div');
        element.className = 'falling-element';
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDuration = Math.random() * 5 + 5 + 's';
        container.appendChild(element);
        element.addEventListener('animationend', () => element.remove());
    }
    setInterval(createFallingElement, 500);

    document.addEventListener('mousemove', (e) => {
        const sparklesContainer = document.getElementById('cursor-sparkles');
        if (!sparklesContainer) return;
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparklesContainer.appendChild(sparkle);
        sparkle.addEventListener('animationend', () => sparkle.remove());
    });
});