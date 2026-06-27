// Función para crear confeti
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#ff6b6b', '#667eea', '#764ba2', '#ffd89b', '#19547b'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        
        document.body.appendChild(confetti);
        
        // Animar el confeti
        const duration = Math.random() * 3 + 2;
        const xMove = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translateY(${window.innerHeight + 20}px) translateX(${xMove}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remover el elemento después de la animación
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Función para hacer explotar el globo
function popBalloon() {
    const balloon = document.getElementById('balloon');
    const popButton = document.getElementById('popButton');
    const popMessage = document.getElementById('popMessage');
    
    // Crear efecto de explosión
    balloon.style.animation = 'none';
    balloon.style.transform = 'scale(0)';
    balloon.style.opacity = '0';
    
    // Reproducir sonido (opcional)
    playPopSound();
    
    // Mostrar mensaje
    popMessage.classList.add('show');
    
    // Crear confeti
    createConfetti();
    
    // Deshabilitar botón
    popButton.disabled = true;
    popButton.style.opacity = '0.5';
    popButton.style.cursor = 'not-allowed';
    
    // Cambiar texto del botón
    popButton.textContent = '¡Globo reventado! 🎉';
}

// Agregar evento al botón
document.getElementById('popButton').addEventListener('click', popBalloon);

// Función para reproducir sonido de explosión (usando Web Audio API)
function playPopSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Agregar efecto de hover al globo
const balloon = document.getElementById('balloon');
balloon.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.15)';
});

balloon.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// Animación de scroll para las dedicatorias
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas las dedicatorias
document.querySelectorAll('.dedicatoria').forEach(dedicatoria => {
    observer.observe(dedicatoria);
});

// Efecto de parallax en la sección del héroe
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-image');
    const scrollPosition = window.pageYOffset;
    
    if (scrollPosition < 500) {
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Agregar animación de entrada a los nombres
window.addEventListener('load', function() {
    const nombres = document.querySelectorAll('.nombre-text');
    nombres.forEach((nombre, index) => {
        nombre.style.animation = `fadeInScale 0.8s ease-out ${index * 0.3}s forwards`;
    });
});

console.log('✨ Página del Día del Padre cargada correctamente ✨');
