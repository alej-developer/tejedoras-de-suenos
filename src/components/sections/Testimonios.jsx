import { useState, useEffect, useCallback } from 'react';
import SectionTitle from '../ui/SectionTitle';
import testimonios from '../../data/testimonios';
import styles from './Testimonios.module.css';

const Testimonios = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % testimonios.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + testimonios.length) % testimonios.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      className={styles.section}
      id="testimonios"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SectionTitle
        decorativeText="Experiencias"
        title="Testimonios"
        subtitle="Lo que dicen quienes han vivido la experiencia de Tejedoras de Sueños"
      />

      <div className={styles.carousel}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonios.map((testimonio) => (
            <div key={testimonio.id} className={styles.slide}>
              <div className={styles.card}>
                <span className={styles.quoteIcon}>"</span>
                <div className={styles.stars}>
                  {'⭐'.repeat(testimonio.estrellas)}
                </div>
                <p className={styles.text}>{testimonio.texto}</p>
                <p className={styles.authorName}>{testimonio.nombre}</p>
                <p className={styles.authorService}>{testimonio.servicio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={prev} aria-label="Testimonio anterior">
            ←
          </button>
          <div className={styles.dots}>
            {testimonios.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Ver testimonio ${i + 1}`}
              />
            ))}
          </div>
          <button className={styles.arrowBtn} onClick={next} aria-label="Siguiente testimonio">
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
