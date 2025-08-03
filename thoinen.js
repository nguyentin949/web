const windCursor = document.getElementById('wind-cursor');
const candles = document.querySelectorAll('.candle');
const flameTool = document.getElementById('flame-tool');
const blowerTool = document.getElementById('blower-tool');
const fireworksTool = document.getElementById('fireworks-tool');
const body = document.body;
const fireworksSound = document.getElementById('fireworks-sound');
const fireworksContainer = document.querySelector('.fireworks-container');

let activeTool = null;

// Theo dõi trạng thái của từng ngọn nến
// true = sáng (không có class 'blown'), false = tắt (có class 'blown')
const candleStates = Array.from(candles).map(candle => {
    return {
        element: candle.querySelector('.flame'),
        isLit: !candle.querySelector('.flame').classList.contains('blown')
    };
});

let fireworksTriggeredLit = false; // Cờ cho trạng thái tất cả nến sáng
let fireworksTriggeredBlown = false; // Cờ cho trạng thái tất cả nến tắt

windCursor.style.display = 'none';

flameTool.addEventListener('click', () => {
    setActiveTool('flame');
});

blowerTool.addEventListener('click', () => {
    setActiveTool('blower');
});

fireworksTool.addEventListener('click', () => {
    setActiveTool('fireworks');
    createFireworks(); // Vẫn giữ chức năng bắn pháo hoa thủ công
});

function setActiveTool(tool) {
    body.classList.remove('flame-cursor', 'blower-cursor');
    flameTool.classList.remove('active');
    blowerTool.classList.remove('active');
    fireworksTool.classList.remove('active');

    if (tool === 'flame') {
        activeTool = 'flame';
        body.classList.add('flame-cursor');
        flameTool.classList.add('active');
    } else if (tool === 'blower') {
        activeTool = 'blower';
        body.classList.add('blower-cursor');
        blowerTool.classList.add('active');
    } else if (tool === 'fireworks') {
        activeTool = 'fireworks';
        fireworksTool.classList.add('active');
        // Sau khi bắn pháo hoa tự động, quay lại công cụ thổi để người dùng có thể thổi nến
        setTimeout(() => {
            setActiveTool('blower');
        }, 1500);
    } else {
        activeTool = null;
        body.style.cursor = 'default';
    }
}

function playFireworksSound() {
    if (fireworksSound) {
        fireworksSound.currentTime = 0;
        fireworksSound.play();
    }
}

function createRocket(x) {
    const rocket = document.createElement('div');
    rocket.classList.add('firework');
    rocket.style.left = `${x}px`;
    rocket.style.bottom = '0px';
    const color = getRandomColor();
    rocket.style.backgroundColor = color;
    rocket.style.width = '8px';
    rocket.style.height = '20px';
    rocket.style.borderRadius = '4px';
    fireworksContainer.appendChild(rocket);

    const targetY = Math.random() * 0.1 * window.innerHeight + 0.9 * window.innerHeight;
    const duration = Math.random() * 1000 + 1500;

    rocket.style.transition = `bottom ${duration}ms ease-out, transform 0.1s ease-in-out`;
    rocket.style.transform = 'scaleY(1)';

    setTimeout(() => {
        rocket.style.bottom = `${targetY}px`;
        rocket.style.transform = 'scaleY(0.5)';
        setTimeout(() => {
            const rect = rocket.getBoundingClientRect();
            explodeFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, color);
            rocket.remove();
        }, 1500);
    }, 50);
}


function createFireworks() {
    playFireworksSound();
    const numberOfFireworks = 15;
    const screenWidth = window.innerWidth;
    for (let i = 0; i < numberOfFireworks; i++) {
        const startX = Math.random() * screenWidth;
        createRocket(startX);
    }
}

function explodeFirework(x, y, color) {
    const numberOfParticles = 40;
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = color;
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 8 + 4;
        const size = Math.random() * 7 + 7;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.animation = `explode-particle ${Math.random() * 700 + 700}ms ease-out forwards`;

        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const gravity = 0.05;
        let time = 0;
        const animateParticle = () => {
            particle.style.left = `${x + vx * time}px`;
            particle.style.top = `${y + vy * time + 0.5 * gravity * time * time}px`;
            time += 0.7;
            if (time < 150) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        animateParticle();

        fireworksContainer.appendChild(particle);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters.charAt(Math.floor(Math.random() * 16));
    }
    return color;
}

// Hàm kiểm tra và bắn pháo hoa
function checkAndTriggerFireworks() {
    const allLit = candleStates.every(state => state.isLit);
    const allBlown = candleStates.every(state => !state.isLit);

    if (allLit && !fireworksTriggeredLit) {
        createFireworks();
        fireworksTriggeredLit = true;
        fireworksTriggeredBlown = false;
    } else if (allBlown && !fireworksTriggeredBlown) {
        createFireworks();
        fireworksTriggeredBlown = true;
        fireworksTriggeredLit = false;
    } else if (!allLit && !allBlown) {
        fireworksTriggeredLit = false;
        fireworksTriggeredBlown = false;
    }
}

candles.forEach((candle, index) => {
    const flame = candle.querySelector('.flame');

    flame.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeTool === 'blower' && !flame.classList.contains('blown')) {
            flame.classList.add('blown');
            candleStates[index].isLit = false;
            checkAndTriggerFireworks();
        } else if (activeTool === 'flame' && flame.classList.contains('blown')) {
            flame.classList.remove('blown');
            candleStates[index].isLit = true;
            checkAndTriggerFireworks();
        }
    });

    candle.addEventListener('click', () => {
        if (activeTool === 'blower' && flame && !flame.classList.contains('blown')) {
            flame.classList.add('blown');
            candleStates[index].isLit = false;
            checkAndTriggerFireworks();
        } else if (activeTool === 'flame' && flame && flame.classList.contains('blown')) {
            flame.classList.remove('blown');
            candleStates[index].isLit = true;
            checkAndTriggerFireworks();
        }
    });
});

// Thiết lập công cụ thổi mặc định khi tải trang
setActiveTool('blower');
const backButton = document.getElementById('back-button');

if (backButton) {
    backButton.addEventListener('click', () => {
        // Thay 'special_effect.html' bằng đường dẫn chính xác của trang bạn muốn quay lại
        window.location.href = 'special_effect.html';
    });
}