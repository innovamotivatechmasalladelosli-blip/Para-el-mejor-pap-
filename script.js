// ===== CONFIGURACIÓN INICIAL =====
let balloonPopped = false;
let mouseX = 0;
let mouseY = 0;

// ===== CURSOR PERSONALIZADO =====
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';

        // Actualizar luz de fondo
        const lightSource = document.querySelector('.light-source');
        if (lightSource) {
            lightSource.style.setProperty('--mouse-x', (mouseX / window.innerWidth) * 100 + '%');
            lightSource.style.setProperty('--mouse-y', (mouseY / window.innerHeight) * 100 + '%');
        }
    });

    // Efecto de clic
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// ===== EFECTO 3D EN CARDS =====
function init3DCards() {
    const cards = document.querySelectorAll('.3d-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ===== NAVEGACIÓN ACTIVA =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== CREAR CONFETI =====
function createConfetti() {
    const confettiCount = 100;
    const colors = ['#d4af37', '#e94560', '#ff6b9d', '#0f3460', '#16213e'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        const size = Math.random() * 10 + 4;
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight / 2;
        const duration = Math.random() * 3 + 2;
        const xMove = (Math.random() - 0.5) * 400;
        const rotation = Math.random() * 720;

        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() * 0.8 + 0.2;

        document.body.appendChild(confetti);

        const keyframes = [
            {
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translate(${xMove}px, ${window.innerHeight + 100}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ];

        const animation = confetti.animate(keyframes, {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });

        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// ===== CREAR PARTÍCULAS DE EXPLOSIÓN =====
function createExplosionParticles() {
    const balloonWrapper = document.getElementById('balloonWrapper');
    const rect = balloonWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '12px';
        particle.style.height = '12px';
        particle.style.background = `hsl(${Math.random() * 60 + 350}, 100%, 50%)`;
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '999';
        particle.style.boxShadow = '0 0 20px currentColor';

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 10 + Math.random() * 8;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let x = centerX;
        let y = centerY;
        let life = 1;

        const animate = () => {
            x += vx;
            y += vy;
            vy += 0.3; // Gravedad
            life -= 0.02;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;
            particle.style.transform = `scale(${life})`;

            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }
}

// ===== SONIDO DE EXPLOSIÓN =====
function playPopSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Sonido principal
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();

        osc1.connect(gain1);
        gain1.connect(audioContext.destination);

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(250, audioContext.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.15);

        gain1.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        osc1.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + 0.15);

        // Sonido secundario
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();

        osc2.connect(gain2);
        gain2.connect(audioContext.destination);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(400, audioContext.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.1);

        gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio no disponible');
    }
}

// ===== REVENTAR GLOBO =====
function popBalloon() {
    if (balloonPopped) return;

    balloonPopped = true;

    const mainBalloon = document.getElementById('mainBalloon');
    const popButton = document.getElementById('popButton');
    const popMessage = document.getElementById('popMessage');

    // Animar desaparición del globo
    mainBalloon.animate([
        {
            transform: 'scale(1)',
            opacity: 1
        },
        {
            transform: 'scale(0)',
            opacity: 0
        }
    ], {
        duration: 300,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        fill: 'forwards'
    });

    // Efectos
    playPopSound();
    createExplosionParticles();
    createConfetti();

    // Mostrar mensaje
    popMessage.classList.add('show');

    // Deshabilitar botón
    popButton.disabled = true;
    popButton.style.pointerEvents = 'none';
    popButton.innerHTML = '<span>¡Globo Reventado!</span> 🎉';

    // Vibración
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card-wrapper').forEach(card => {
        observer.observe(card);
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    init3DCards();
    initNavigation();
    initScrollAnimations();

    // Eventos del globo
    const popButton = document.getElementById('popButton');
    const mainBalloon = document.getElementById('mainBalloon');

    if (popButton) {
        popButton.addEventListener('click', popBalloon);
    }

    if (mainBalloon) {
        mainBalloon.addEventListener('click', popBalloon);
    }

    // Fade in inicial
    document.body.style.opacity = '0';
    document.body.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 800,
        fill: 'forwards'
    });

    console.log('✨ Página profesional cargada correctamente ✨');
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});
