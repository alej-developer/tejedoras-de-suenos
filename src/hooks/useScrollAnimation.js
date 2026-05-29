import { useEffect, useRef } from 'react';

/**
 * Hook que observa elementos y les agrega la clase 'is-visible' cuando entran al viewport
 * Usar con la clase CSS 'animate-on-scroll' en los elementos
 */
const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const {
      threshold = 0.15,
      rootMargin = '0px 0px -50px 0px',
      once = true
    } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    const element = ref.current;
    if (element) {
      // Observar el contenedor y todos sus hijos con la clase
      const animatedElements = element.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((el) => observer.observe(el));

      // También observar el propio elemento si tiene la clase
      if (element.classList.contains('animate-on-scroll')) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [options]);

  return ref;
};

export default useScrollAnimation;
