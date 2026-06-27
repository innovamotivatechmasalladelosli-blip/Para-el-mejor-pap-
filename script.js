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

    let mouseXSmooth = 0;
    let mouseYSmooth = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Suavizado del cursor
        mouseXSmooth += (mouseX - mouseXSmooth) * 0.3;
        mouseYSmooth += (mouseY - mouseYSmooth) * 0.3;

        cursor.style.left = mouseXSmooth + 'px';
        cursor.style.top = mouseYSmooth + 'px';

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
        cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(0.7)';
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

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ===== NAVEGACIÓN ACTIVA =====
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
    const confettiCount = 150;
    const colors = ['#ff6b5b', '#ff8a7b', '#ffb3a7', '#f4a261', '#e76f51', '#2a9d8f'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        const size = Math.random() * 14 + 6;
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight / 2;
        const duration = Math.random() * 4 + 2.5;
        const xMove = (Math.random() - 0.5) * 600;
        const rotation = Math.random() * 720;
        const delay = Math.random() * 0.4;

        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() * 0.8 + 0.4;
        confetti.style.boxShadow = `0 0 ${Math.random() * 12 + 6}px currentColor`;

        document.body.appendChild(confetti);

        const keyframes = [
            {
                transform: `translate(0, 0) rotate(0deg) scale(1)`,
                opacity: 1
            },
            {
                transform: `translate(${xMove}px, ${window.innerHeight + 100}px) rotate(${rotation}deg) scale(0.3)`,
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

// ===== CREAR PARTÍCULAS DE EXPLOSIÓN =====
function createExplosionParticles() {
    const balloonWrapper = document.getElementById('balloonWrapper');
    if (!balloonWrapper) return;

    const rect = balloonWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particleCount = 60;
    const colors = ['#ff6b5b', '#ff8a7b', '#ffb3a7', '#f4a261', '#e76f51'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '16px';
        particle.style.height = '16px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '999';
        particle.style.boxShadow = `0 0 30px currentColor`;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 14 + Math.random() * 12;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let x = centerX;
        let y = centerY;
        let life = 1;

        const animate = () => {
            x += vx;
            y += vy;
            vy += 0.5; // Gravedad
            life -= 0.016;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;
            particle.style.transform = `scale(${life * 0.9})`;

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
        osc1.frequency.setValueAtTime(280, audioContext.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.25);

        gain1.gain.setValueAtTime(0.4, audioContext.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);

        osc1.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + 0.25);

        // Sonido secundario
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();

        osc2.connect(gain2);
        gain2.connect(audioContext.destination);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(550, audioContext.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.2);

        gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        osc2.start(audioContext.currentTime);
        osc2.stop(audioContext.currentTime + 0.2);
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

    if (!mainBalloon || !popButton || !popMessage) return;

    // Animar desaparición del globo
    mainBalloon.animate([
        {
            transform: 'scale(1) rotate(0deg)',
            opacity: 1
        },
        {
            transform: 'scale(0) rotate(180deg)',
            opacity: 0
        }
    ], {
        duration: 500,
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
    popButton.style.opacity = '0.5';
    
    const buttonText = popButton.querySelector('.button-text');
    if (buttonText) {
        buttonText.textContent = '¡Globo Reventado!';
    }

    // Vibración
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 150, 50, 100]);
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
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// ===== PARALLAX MEJORADO =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.bg-sphere');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach((element, index) => {
            const speed = 0.4 + (index * 0.1);
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

    // Fade in inicial
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // Asegurar que los elementos iniciales sean visibles si la animación falla
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.style.opacity = '1';

    console.log('✨ Página rediseñada y lista ✨');
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});
