document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECCIÓN DE ELEMENTOS
    // Obtenemos todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    // Obtenemos todas las secciones de contenido
    const sections = document.querySelectorAll('.content-section');

    // 2. CONFIGURACIÓN DEL INTERSECTION OBSERVER
    const observerOptions = {
        // root: null significa que observaremos las intersecciones en relación a la viewport.
        root: null,
        // rootMargin: '0px' - Margen alrededor del 'root'.
        // threshold: 0.5 significa que la función se disparará cuando el 50% de la sección esté visible.
        // Un valor más bajo (como 0.2) puede funcionar si las secciones son muy largas.
        threshold: 0.2 
    };

    // 3. FUNCIÓN DE CALLBACK DEL OBSERVADOR
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (correspondingLink) {
                if (entry.isIntersecting) {
                    // Si la sección está intersectando (visible):
                    
                    // Primero, limpiamos el 'active' de todos los enlaces
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Luego, activamos solo el enlace correspondiente
                    correspondingLink.classList.add('active');
                }
                // Nota: No necesitamos un 'else' aquí porque la limpieza se hace dentro del 'if (entry.isIntersecting)'
                // al empezar a observar la nueva sección. Esto evita que la navegación quede vacía.
            }
        });
    };

    // 4. CREACIÓN Y ASIGNACIÓN DEL OBSERVADOR
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Asignamos el observador a cada sección
    sections.forEach(section => {
        observer.observe(section);
    });

    // 5. FUNCIÓN DE SMOOTH SCROLL (Opcional, si CSS no es suficiente)
    // Aunque usamos 'scroll-behavior: smooth' en CSS, esto asegura compatibilidad
    // y maneja cualquier necesidad de animación personalizada al hacer clic.
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Previene el comportamiento de anclaje por defecto (salto brusco)
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
