document.addEventListener('DOMContentLoaded', () => {
    // Sistema de partículas completo
    class ParticleNetwork {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.particleCount = window.innerWidth < 768 ? 50 : 150;
            
            this.init();
            this.animate();
            window.addEventListener('resize', this.handleResize.bind(this));
        }

        init() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            
            for(let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.5 + 0.1
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if(particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if(particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
                
                this.ctx.fillStyle = `rgba(100, 255, 218, ${particle.alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            });
            
            requestAnimationFrame(this.animate.bind(this));
        }

        handleResize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.particles = [];
            this.init();
        }
    }

    // Inicialización completa
    const particleCanvas = document.querySelector('.network-canvas');
    new ParticleNetwork(particleCanvas);

    // Sistema de proyectos GitHub mejorado
    const loadGitHubProjects = async () => {
        try {
            const response = await fetch('https://api.github.com/users/JernelOlart/repos?sort=updated&per_page=4');
            const repos = await response.json();
            const grid = document.querySelector('.projects-grid');
            
            grid.innerHTML = repos.filter(repo => !repo.fork).map(repo => `
                <div class="project-card" data-aos="custom-fade">
                    <div class="project-header">
                        <i class="fab fa-github"></i>
                        <h3>${repo.name}</h3>
                    </div>
                    <p>${repo.description || 'Proyecto de desarrollo tecnológico'}</p>
                    <div class="project-meta">
                        <span class="language">${repo.language || 'Multiplataforma'}</span>
                        <span class="stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="repo-link">
                        Ver código fuente <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
        }
    };

    // Menú móvil completo
    const burgerMenu = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('toggle');
    });

    // Sistema de animaciones al scroll
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out-quad'
    });

    // Carga inicial
    loadGitHubProjects();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});