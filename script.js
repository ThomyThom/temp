document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburger
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Rolagem Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Animação de contagem dos números
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

    const handleIntersectionStats = (entries, observer) => {
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

    const observerStats = new IntersectionObserver(handleIntersectionStats, { threshold: 0.5 });
    observerStats.observe(statsSection);

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

    // Função para abrir o WhatsApp
    window.abrirWhatsApp = function() {
        const telefone = '5511981057075';
        const mensagem = 'Olá, gostaria de agendar uma consulta jurídica.';
        const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }
});