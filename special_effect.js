document.addEventListener('DOMContentLoaded', () => {
    const fireCursor = document.getElementById('fire-cursor-effect');
    const fireSpreadContainer = document.getElementById('fire-spread-container');
    const contentBoxContainer = document.getElementById('content-box-container');
    const closeBoxButton = document.getElementById('closeBoxButton');
    let hasClicked = false;

    document.addEventListener('mousemove', (e) => {
        fireCursor.style.left = `${e.clientX}px`;
        fireCursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('click', (e) => {
        if (!hasClicked) {
            hasClicked = true;
            const clickX = e.clientX;
            const clickY = e.clientY;

            for (let i = 0; i < 120; i++) {
                const particle = document.createElement('div');
                particle.className = 'fire-particle';
                particle.style.left = `${clickX}px`;
                particle.style.top = `${clickY}px`;
                const size = Math.random() * 50 + 20;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;

                const offsetX = (Math.random() - 0.5) * window.innerWidth * 1.2;
                const offsetY = (Math.random() - 0.5) * window.innerHeight * 1.2;
                
                particle.style.setProperty('--offsetX', `${offsetX}px`);
                particle.style.setProperty('--offsetY', `${offsetY}px`);

                particle.style.animationDelay = `${Math.random() * 0.8}s`; 
                const spreadDuration = Math.random() * 1.5 + 1.0;
                particle.style.setProperty('--spread-duration', `${spreadDuration}s`);
                particle.style.animationDuration = `var(--spread-duration), 0.3s`;

                fireSpreadContainer.appendChild(particle);

                particle.addEventListener('animationend', () => {
                    particle.remove();
                });
            }

            setTimeout(() => {
                contentBoxContainer.classList.add('visible');
            }, 800);
        }
    });

    closeBoxButton.addEventListener('click', (e) => {
        e.stopPropagation();
        contentBoxContainer.classList.remove('visible');
        hasClicked = false;
    });
});

function createEmberParticle() {
    const ember = document.createElement('div');
    ember.className = 'ember-particle';

    const size = Math.random() * 12 + 5;
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;

    const startX = Math.random() * window.innerWidth;
    ember.style.left = `${startX}px`;

    const finalXOffset = (Math.random() - 0.5) * 200;
    const finalYOffset = -(Math.random() * window.innerHeight * 0.7 + 50);

    ember.style.setProperty('--initial-x', `0px`);
    ember.style.setProperty('--final-x', `${finalXOffset}px`);
    ember.style.setProperty('--final-y', `${finalYOffset}px`);


    const emberDuration = Math.random() * 4 + 2;
    ember.style.setProperty('--ember-duration', `${emberDuration}s`);
    ember.style.animationDelay = `${Math.random() * 1}s`;

    document.body.appendChild(ember);

    ember.addEventListener('animationend', () => {
        ember.remove();
    });
}

setInterval(createEmberParticle, 100);
document.getElementById('goBackButton').addEventListener('click', function() {
    window.location.href = 'loichuc.html?msg=2';
});