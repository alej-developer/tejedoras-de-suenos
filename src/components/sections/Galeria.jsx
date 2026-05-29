import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import styles from './Galeria.module.css';

const galeriaItems = [
  { id: 1, emoji: '🧘‍♀️', label: 'Sesión de meditación', ar: '4/3' },
  { id: 2, emoji: '🌸', label: 'Taller de empoderamiento', ar: '1' },
  { id: 3, emoji: '🔮', label: 'Cristales y herramientas', ar: '3/4' },
  { id: 4, emoji: '🕯️', label: 'Espacio de sanación', ar: '4/3' },
  { id: 5, emoji: '👩‍👩‍👧‍👧', label: 'Círculo de mujeres', ar: '1' },
  { id: 6, emoji: '✨', label: 'Ritual de luna llena', ar: '3/4' },
  { id: 7, emoji: '📿', label: 'Amuletos artesanales', ar: '1' },
  { id: 8, emoji: '🌿', label: 'Conexión con la naturaleza', ar: '4/3' },
  { id: 9, emoji: '💜', label: 'Terapia angelical', ar: '3/4' },
];

const Galeria = () => {
  const [lightboxItem, setLightboxItem] = useState(null);
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="galeria" ref={sectionRef}>
      <SectionTitle
        decorativeText="Momentos mágicos"
        title="Galería"
        subtitle="Algunos momentos de nuestros encuentros, talleres y sesiones"
      />

      <div className={styles.grid}>
        {galeriaItems.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.item} animate-on-scroll delay-${(index % 5) + 1}`}
            onClick={() => setLightboxItem(item)}
            role="button"
            tabIndex={0}
            aria-label={`Ver ${item.label}`}
            onKeyDown={(e) => e.key === 'Enter' && setLightboxItem(item)}
          >
            <div
              className={styles.imagePlaceholder}
              style={{ '--ar': item.ar }}
            >
              {item.emoji}
            </div>
            <div className={styles.overlay}>🔍</div>
          </div>
        ))}
      </div>

      {lightboxItem && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-label={lightboxItem.label}
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxItem(null)}
            aria-label="Cerrar"
          >
            ✕
          </button>
          <div className={styles.lightboxContent}>
            {lightboxItem.emoji}
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;
