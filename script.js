// ===== CONFIGURACIÓN INICIAL =====
const sections = ['hero', 'uriel', 'vitoria', 'balloon'];
let currentSection = 0;
let balloonPopped = false;

// ===== NAVEGACIÓN FLOTANTE =====
function initFloatingNav() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    window.addEventListener('scroll', () => {
        let current = 0;
        
        sections.forEach((section, index) => {
            const element = document.getElementById(section);
            if (element) {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                
                if (window.pageYOffset >= elementTop - window.innerHeight / 2) {
                    current = index;
                }
            }
        });
        
        navDots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === current) {
                dot.classList.add('active');
            }
        });
    });
    
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const section = document.getElementById(sections[index]);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== ANIMACIÓN DE CONFETI MEJORADA =====
function createConfetti() {
    const confettiCount = 80;
    const colors = ['#667eea', '#764ba2', '#f5576c', '#ffd89b', '#19547b', '#ff6b6b', '#f4a460'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const size = Math.random() * 12 + 5;
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight / 2;
        const duration = Math.random() * 3 + 2.5;
        const xMove = (Math.random() - 0.5) * 300;
        const rotation = Math.random() * 360;
        
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        
        document.body.appendChild(confetti);
        
        // Animación mejorada del confeti
        const keyframes = [
            { 
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1
            },
            { 
                transform: `translate(${xMove}px, ${window.innerHeight + 50}px) rotate(${rotation}deg)`,
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

// ===== EXPLOSIÓN DEL GLOBO =====
function popBalloon() {
    if (balloonPopped) return;
    
    balloonPopped = true;
    
    const balloon = document.getElementById('balloon-main');
    const balloonMsg = document.getElementById('balloon-msg');
    const popButton = document.getElementById('popButton');
    const popMessage = document.getElementById('popMessage');
    
    // Efecto de explosión del globo
    balloon.style.animation = 'none';
    balloon.style.pointerEvents = 'none';
    
    // Crear partículas de explosión
    createBalloonParticles();
    
    // Animar la desaparición del globo
    balloon.animate([
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
    
    // Reproducir sonido de explosión
    playPopSound();
    
    // Crear confeti
    createConfetti();
    
    // Mostrar mensaje con animación
    popMessage.classList.add('show');
    
    // Cambiar estado del botón
    popButton.disabled = true;
    popButton.style.pointerEvents = 'none';
    popButton.animate([
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0.5, transform: 'scale(0.9)' }
    ], {
        duration: 500,
        fill: 'forwards'
    });
    
    popButton.innerHTML = '<span class="button-text">¡Globo reventado!</span> 🎉';
    
    // Vibración del dispositivo (si es soportada)
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

// ===== PARTÍCULAS DE EXPLOSIÓN =====
function createBalloonParticles() {
    const balloonMain = document.getElementById('balloon-main');
    const balloonRect = balloonMain.getBoundingClientRect();
    const centerX = balloonRect.left + balloonRect.width / 2;
    const centerY = balloonRect.top + balloonRect.height / 2;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '15px';
        particle.style.height = '15px';
        particle.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)';
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '999';
        particle.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 8 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = centerX;
        let y = centerY;
        let life = 1;
        
        const animate = () => {
            x += vx;
            y += vy;
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
        const oscillator1 = audioContext.createOscillator();
        const gainNode1 = audioContext.createGain();
        
        oscillator1.connect(gainNode1);
        gainNode1.connect(audioContext.destination);
        
        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator1.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
        
        gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator1.start(audioContext.currentTime);
        oscillator1.stop(audioContext.currentTime + 0.1);
        
        // Sonido secundario (más agudo)
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        
        oscillator2.type = 'triangle';
        oscillator2.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.08);
        
        gainNode2.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
        
        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.08);
    } catch (e) {
        console.log('Audio no disponible');
    }
}

// ===== EFECTO HOVER DEL GLOBO =====
function initBalloonHover() {
    const balloon = document.getElementById('balloon-main');
    
    if (balloon) {
        balloon.addEventListener('mouseenter', function() {
            if (!balloonPopped) {
                this.style.transform = 'scale(1.15)';
            }
        });
        
        balloon.addEventListener('mouseleave', function() {
            if (!balloonPopped) {
                this.style.transform = 'scale(1)';
            }
        });
    }
}

// ===== OBSERVADOR DE INTERSECCIÓN PARA ANIMACIONES =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas de dedicatorias
    document.querySelectorAll('.dedicatoria-card').forEach(card => {
        observer.observe(card);
    });
}

// ===== EFECTO PARALLAX =====
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection && scrolled < window.innerHeight) {
            const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
            parallaxElements.forEach((element, index) => {
                element.style.transform = `translateY(${scrolled * (0.3 + index * 0.1)}px)`;
            });
        }
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initFloatingNav();
    initBalloonHover();
    initIntersectionObserver();
    initParallax();
    
    // Evento del botón del globo
    const popButton = document.getElementById('popButton');
    if (popButton) {
        popButton.addEventListener('click', popBalloon);
    }
    
    // Efecto de clic en el globo
    const balloon = document.getElementById('balloon-main');
    if (balloon) {
        balloon.addEventListener('click', popBalloon);
    }
    
    // Animación de entrada suave
    document.body.style.opacity = '0';
    document.body.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 500,
        fill: 'forwards'
    });
    
    console.log('✨ Página del Día del Padre cargada correctamente ✨');
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
});
