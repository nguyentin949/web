document.addEventListener('DOMContentLoaded', () => {
    // --- Music Control ---
    const musicButton = document.getElementById('musicButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicIcon = musicButton.querySelector('i');

    let isPlaying = false; 

    musicButton.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
            document.body.classList.remove('cream-theme');
        } else {
            backgroundMusic.play().catch(e => {
                console.log("Autoplay prevented:", e);
            });
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
            document.body.classList.add('cream-theme');
        }
        isPlaying = !isPlaying;
    });

    // --- Hiệu ứng Particles.js ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#ffffff", "#ffcc00", "#ff0077", "#00bfff", "#a855f7"] },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
                "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 5, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
            },
            "retina_detect": true
        });
    }

    // --- Hiệu ứng Confetti ---
    const confettiContainer = document.getElementById('confetti-container');
    const confettiColors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#fff", "#ffa500"];

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confettiContainer.appendChild(confetti);

        const size = Math.random() * 10 + 5;
        confetti.style.setProperty('--size', `${size}px`);
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        const duration = Math.random() * 2 + 3;
        const delay = Math.random() * 0.5;
        const translateX = (Math.random() - 0.5) * 50;
        const rotate = Math.random() * 1080 + 360;
        const borderRadius = Math.random() > 0.5 ? '50%' : '0';

        confetti.style.setProperty('--duration', `${duration}s`);
        confetti.style.setProperty('--delay', `${delay}s`);
        confetti.style.setProperty('--translateX', `${translateX}vw`);
        confetti.style.setProperty('--rotate', `${rotate}deg`);
        confetti.style.setProperty('--border-radius', borderRadius);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
    setInterval(createConfetti, 100);

    // --- Hiệu ứng Falling Elements (Ngôi sao/Tuyết rơi) ---
    const fallingElementsContainer = document.getElementById('falling-elements-container');
    const fallingElements = ['✨', '🌟', '💖', '💫'];
    const fallingColors = ["#fff", "#ffcc00", "#ff0077", "#a855f7"];

    if (fallingElementsContainer) {
        function createFallingElement() {
            const element = document.createElement('span');
            element.classList.add('falling-element');
            element.textContent = fallingElements[Math.floor(Math.random() * fallingElements.length)];
            fallingElementsContainer.appendChild(element);

            const size = Math.random() * 1.5 + 0.8;
            element.style.setProperty('--size', `${size}em`);
            element.style.left = `${Math.random() * 100}vw`;
            element.style.top = `-10vh`;
            element.style.color = fallingColors[Math.floor(Math.random() * fallingColors.length)];
            
            const duration = Math.random() * 5 + 8;
            const delay = Math.random() * 5;
            const drift = (Math.random() - 0.5) * 200;

            element.style.setProperty('--duration', `${duration}s`);
            element.style.setProperty('--delay', `${delay}s`);
            element.style.setProperty('--drift', `${drift}px`);

            element.addEventListener('animationend', () => {
                element.remove();
            });
        }
        setInterval(createFallingElement, 200);
    }


    // --- Hiệu ứng Sparkle Cursor ---
    const cursorSparklesContainer = document.getElementById('cursor-sparkles');
    const sparkleColors = ["#fff", "#ffcc00", "#ff0077", "#00bfff", "#a855f7"];

    if (cursorSparklesContainer) {
        document.addEventListener('mousemove', (e) => {
            for (let i = 0; i < 2; i++) {
                const sparkle = document.createElement('div');
                sparkle.classList.add('cursor-sparkle');
                cursorSparklesContainer.appendChild(sparkle);

                const size = Math.random() * 8 + 3;
                sparkle.style.width = `${size}px`;
                sparkle.style.height = `${size}px`;
                sparkle.style.left = `${e.clientX + (Math.random() - 0.5) * 10}px`;
                sparkle.style.top = `${e.clientY + (Math.random() - 0.5) * 10}px`;
                sparkle.style.backgroundColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
                
                const duration = Math.random() * 0.8 + 0.4;
                sparkle.style.setProperty('--duration', `${duration}s`);

                sparkle.addEventListener('animationend', () => {
                    sparkle.remove();
                });
            }
        });
    }

    // --- Hiệu ứng tương tác cho decorative-icons (giữ nguyên từ trước) ---
    const decorativeIcons = document.querySelectorAll('.decorative-icons');
    decorativeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.style.transform = 'scale(1.5)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 200);
        });
    });
});