document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECCIÓN DE ELEMENTOS
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // 2. CONFIGURACIÓN DEL INTERSECTION OBSERVER
    const observerOptions = {
        // Un threshold de 0.2 (20% de la sección visible) es ideal para disparar la animación y el Scroll Spy.
        root: null,
        threshold: 0.2 
    };

    // 3. FUNCIÓN DE CALLBACK DEL OBSERVADOR (MEJORADA PARA INCLUIR ANIMACIONES)
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (correspondingLink) {
                if (entry.isIntersecting) {
                    // --- 1. LÓGICA DE SCROLL SPY (Resaltar Enlace) ---
                    // Limpiamos 'active' de todos
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    // Activamos el enlace correspondiente
                    correspondingLink.classList.add('active');

                    // --- 2. LÓGICA DE ANIMACIÓN (Activar is-visible) ---
                    // Buscamos todos los elementos con la clase 'animated-item' dentro de la sección visible
                    const elementsToAnimate = entry.target.querySelectorAll('.animated-item');
                    
                    elementsToAnimate.forEach((element, index) => {
                        // Aseguramos que la animación solo se añada si no la tiene
                        if (!element.classList.contains('is-visible')) {
                            element.classList.add('is-visible');
                            // Añadimos un pequeño retraso escalonado (0.2s * índice)
                            element.style.animationDelay = `${0.2 + (index * 0.2)}s`;
                        }
                    });

                    // Si quieres que las animaciones solo se vean la PRIMERA vez que entras a la sección,
                    // puedes descomentar la siguiente línea:
                    // observer.unobserve(entry.target); 
                }
            }
        });
    };

    // 4. CREACIÓN Y ASIGNACIÓN DEL OBSERVADOR
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 5. FUNCIÓN DE SMOOTH SCROLL (Desplazamiento Suave al hacer clic)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
