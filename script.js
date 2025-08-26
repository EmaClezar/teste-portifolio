// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVEGAÇÃO E MENU HAMBURGER ==========
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle do menu hamburger
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fecha o menu quando clica em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Fecha o menu quando clica fora dele
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    
    // ========== SCROLL SUAVE E NAVEGAÇÃO ATIVA ==========
    
    // Adiciona classe ativa ao link da seção atual
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Atualiza o link ativo no scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    
    // ========== HEADER TRANSPARENTE NO SCROLL ==========
    
    const header = document.getElementById('header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    
    
    // ========== ANIMAÇÃO DAS BARRAS DE HABILIDADES ==========
    
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        const skillsSection = document.getElementById('skills');
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.offsetHeight;
        const scrollPos = window.scrollY + window.innerHeight;
        
        if (scrollPos >= skillsSectionTop + 200) {
            skillsAnimated = true;
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
    
    
    // ========== ANIMAÇÃO DE ENTRADA DOS ELEMENTOS ==========
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const elementsToAnimate = document.querySelectorAll('.skill-item, .project-card, .about-content');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    
    // ========== VALIDAÇÃO E ENVIO DO FORMULÁRIO ==========
    
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Validação em tempo real
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove mensagens de erro anteriores
        removeErrorMessage(field);
        field.classList.remove('error');
        
        // Validação por tipo de campo
        switch (field.type) {
            case 'text':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Este campo deve ter pelo menos 2 caracteres.';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, insira um email válido.';
                }
                break;
                
            default:
                if (field.tagName.toLowerCase() === 'textarea' && value.length < 10) {
                    isValid = false;
                    errorMessage = 'A mensagem deve ter pelo menos 10 caracteres.';
                }
        }
        
        if (value === '' && field.hasAttribute('required')) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        }
        
        if (!isValid) {
            field.classList.add('error');
            showErrorMessage(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeErrorMessage(field) {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Envio do formulário
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Valida todos os campos
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Simula envio do formulário
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Simula delay de envio
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem Enviada!';
                submitBtn.style.backgroundColor = '#10b981';
                
                // Limpa o formulário
                contactForm.reset();
                
                // Restaura o botão após 3 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    submitBtn.style.backgroundColor = '';
                }, 3000);
                
                // Mostra mensagem de sucesso
                showSuccessMessage();
                
            }, 2000);
        } else {
            // Foca no primeiro campo com erro
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
        }
    });
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background-color: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
                animation: fadeInUp 0.5s ease-out;
            ">
                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                Obrigado pela sua mensagem! Entrarei em contato em breve.
            </div>
        `;
        
        contactForm.appendChild(successDiv);
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    
    // ========== EFEITOS DE HOVER NOS PROJETOS ==========
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    
    // ========== SCROLL TO TOP ==========
    
    // Cria botão de voltar ao topo
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Mostra/esconde o botão baseado no scroll
    function toggleScrollTopBtn() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }
    
    window.addEventListener('scroll', toggleScrollTopBtn);
    
    // Funcionalidade do botão
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect no botão
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.backgroundColor = 'var(--secondary-color)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.backgroundColor = 'var(--primary-color)';
    });
    
    
    // ========== TYPING EFFECT NO HERO ==========
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const titles = [
        'Desenvolvedor Frontend Iniciante',
        'Apaixonado por Tecnologia',
        'Criador de Experiências Web',
        'Sempre Aprendendo'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000; // Pausa no final
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500; // Pausa antes de começar o próximo
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Inicia o efeito de digitação após um delay
    setTimeout(typeEffect, 1000);
    
    
    // ========== CONTADOR DE ESTATÍSTICAS (OPCIONAL) ==========
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    
    // ========== LAZY LOADING DE IMAGENS (SE HOUVER) ==========
    
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    
    // ========== PREVENÇÃO DE SPAM NO FORMULÁRIO ==========
    
    let lastSubmitTime = 0;
    const submitCooldown = 30000; // 30 segundos
    
    contactForm.addEventListener('submit', function(e) {
        const currentTime = Date.now();
        if (currentTime - lastSubmitTime < submitCooldown) {
            e.preventDefault();
            alert('Por favor, aguarde antes de enviar outra mensagem.');
            return;
        }
        lastSubmitTime = currentTime;
    });
    
    
    // ========== SMOOTH REVEAL ANIMATIONS ==========
    
    // Adiciona classe para elementos que devem aparecer com animação
    const revealElements = document.querySelectorAll('.hero-content, .about-text, .contact-info');
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
    
    
    // ========== CONSOLE MESSAGE ==========
    
    console.log(`
    🚀 Portfólio carregado com sucesso!
    
    Desenvolvido com:
    ✅ HTML5 semântico
    ✅ CSS3 moderno e responsivo  
    ✅ JavaScript vanilla
    ✅ Animações suaves
    ✅ Formulário validado
    ✅ Design mobile-first
    
    Pronto para impressionar recrutadores! 💼
    `);
    
});

// ========== FUNÇÕES UTILITÁRIAS ==========

// Debounce para otimizar eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce aos eventos de scroll
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
    updateHeaderOnScroll();
    animateSkillBars();
    toggleScrollTopBtn();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para mobile
if (isMobile()) {
    // Desabilita hover effects em mobile
    const hoverElements = document.querySelectorAll('.project-card, .skill-item');
    hoverElements.forEach(el => {
        el.style.transition = 'none';
    });
}

