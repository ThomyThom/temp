// Função para abrir o WhatsApp
function abrirWhatsApp() {
    const telefone = '5511981057075';
    const mensagem = 'Olá, gostaria de agendar uma consulta jurídica.';
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

// Animação dos números na seção de estatísticas
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounter = (counter, target) => {
        const duration = 2000;
        const start = performance.now();
        const startValue = parseInt(counter.textContent) || 0;
        
        const updateCount = (timestamp) => {
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            const value = Math.floor(startValue + percentage * (target - startValue));
            
            if (value >= target) {
                if (target === 100) {
                    counter.textContent = '100%';
                } else {
                    counter.textContent = `${target}+`;
                }
            } else {
                counter.textContent = value;
                requestAnimationFrame(updateCount);
            }
        };
        requestAnimationFrame(updateCount);
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                hasAnimated = true;
                observer.unobserve(statsSection);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    observer.observe(statsSection);
});

// Animação de fade-in das seções
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('is-visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});