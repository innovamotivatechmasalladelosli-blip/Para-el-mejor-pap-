// ===== CONFIGURACIÓN INICIAL =====
let balloonPopped = false;
let mouseX = 0;
let mouseY = 0;
let mobileMenuOpen = false;

// ===== CURSOR PERSONALIZADO MEJORADO =====
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.cursor-glow');

    if (!cursor || !cursorGlow) return;

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

    // Efecto de clic mejorado
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.6)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// ===== EFECTO 3D EN CARDS MEJORADO =====
function init3DCards() {
    const cards = document.querySelectorAll('.3d-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ===== NAVEGACIÓN ACTIVA MEJORADA =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Toggle menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mobileMenuOpen = !mobileMenuOpen;
            if (navLinksContainer) {
                navLinksContainer.classList.toggle('active');
            }
            navToggle.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOpen = false;
            if (navLinksContainer) {
                navLinksContainer.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });

    // Actualizar enlace activo al hacer scroll
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

    // Scroll suave
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

// ===== CREAR CONFETI MEJORADO =====
function createConfetti() {
    const confettiCount = 120;
    const colors = ['#d4af37', '#e94560', '#ff6b9d', '#0f3460', '#16213e', '#ffffff'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        const size = Math.random() * 12 + 5;
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight / 2;
        const duration = Math.random() * 3.5 + 2.5;
        const xMove = (Math.random() - 0.5) * 500;
        const rotation = Math.random() * 720;
        const delay = Math.random() * 0.3;

        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() * 0.9 + 0.3;
        confetti.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;

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
            fill: 'forwards',
            delay: delay * 1000
        });

        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

// ===== CREAR PARTÍCULAS DE EXPLOSIÓN MEJORADAS =====
function createExplosionParticles() {
    const balloonWrapper = document.getElementById('balloonWrapper');
    if (!balloonWrapper) return;

    const rect = balloonWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '14px';
        particle.style.height = '14px';
        particle.style.background = `hsl(${Math.random() * 60 + 340}, 100%, ${Math.random() * 30 + 50}%)`;
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '999';
        particle.style.boxShadow = `0 0 25px currentColor`;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 12 + Math.random() * 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let x = centerX;
        let y = centerY;
        let life = 1;

        const animate = () => {
            x += vx;
            y += vy;
            vy += 0.4; // Gravedad
            life -= 0.018;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;
            particle.style.transform = `scale(${life * 0.8})`;

            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }
}

// ===== SONIDO DE EXPLOSIÓN MEJORADO =====
function playPopSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Sonido principal - más profundo
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();

        osc1.connect(gain1);
        gain1.connect(audioContext.destination);

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(300, audioContext.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.2);

        gain1.gain.setValueAtTime(0.35, audioContext.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        osc1.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + 0.2);

        // Sonido secundario - más agudo
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();

        osc2.connect(gain2);
        gain2.connect(audioContext.destination);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(500, audioContext.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.15);

        gain2.gain.setValueAtTime(0.25, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.15);

        // Sonido de ruido blanco
        const bufferSize = audioContext.sampleRate * 0.1;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noiseSource = audioContext.createBufferSource();
        const noiseGain = audioContext.createGain();
        
        noiseSource.buffer = noiseBuffer;
        noiseSource.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        
        noiseGain.gain.setValueAtTime(0.15, audioContext.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        noiseSource.start(audioContext.currentTime);
    } catch (e) {
        console.log('Audio no disponible');
    }
}

// ===== REVENTAR GLOBO MEJORADO =====
function popBalloon() {
    if (balloonPopped) return;

    balloonPopped = true;

    const mainBalloon = document.getElementById('mainBalloon');
    const popButton = document.getElementById('popButton');
    const popMessage = document.getElementById('popMessage');

    if (!mainBalloon || !popButton || !popMessage) return;

    // Animar desaparición del globo
    mainBalloon.animate([
        {
            transform: 'scale(1) rotate(0deg)',
            opacity: 1
        },
        {
            transform: 'scale(0.1) rotate(180deg)',
            opacity: 0
        }
    ], {
        duration: 400,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        fill: 'forwards'
    });

    // Efectos
    playPopSound();
    createExplosionParticles();
    createConfetti();

    // Mostrar mensaje con animación
    popMessage.classList.add('show');

    // Deshabilitar botón
    popButton.disabled = true;
    popButton.style.pointerEvents = 'none';
    popButton.style.opacity = '0.6';
    
    const buttonText = popButton.querySelector('.button-text');
    if (buttonText) {
        buttonText.textContent = '¡Globo Reventado!';
    }

    // Vibración mejorada
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 150, 50, 100]);
    }
}

// ===== SCROLL ANIMATIONS MEJORADAS =====
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

// ===== PARALLAX MEJORADO =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.bg-sphere');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funciones
    initCustomCursor();
    init3DCards();
    initNavigation();
    initScrollAnimations();
    initParallax();

    // Eventos del globo
    const popButton = document.getElementById('popButton');
    const mainBalloon = document.getElementById('mainBalloon');

    if (popButton) {
        popButton.addEventListener('click', popBalloon);
    }

    if (mainBalloon) {
        mainBalloon.addEventListener('click', popBalloon);
    }

    // Fade in inicial mejorado
    document.body.style.opacity = '0';
    document.body.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 1000,
        fill: 'forwards',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    // Agregar listeners para interactividad
    document.addEventListener('click', (e) => {
        // Efecto de ripple en clics
        if (e.target.closest('.cta-button') || e.target.closest('.pop-button')) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
        }
    });

    console.log('✨ Página rediseñada y optimizada correctamente ✨');
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

// ===== ANIMACIÓN DE RIPPLE =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            width: 0;
            height: 0;
            opacity: 1;
        }
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
