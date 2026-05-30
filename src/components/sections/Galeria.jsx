import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import styles from './Galeria.module.css';

const galeriaItems = [
  { id: 1, img: '/assets/images/service_meditation.png', label: 'Sesión de meditación guiada', cat: 'Sesiones' },
  { id: 2, img: '/assets/images/service_empowerment.png', label: 'Taller de empoderamiento femenino', cat: 'Talleres' },
  { id: 3, img: '/assets/images/product_crystals.png', label: 'Cristales y herramientas de sanación', cat: 'Herramientas' },
  { id: 4, img: '/assets/images/gallery_1.png', label: 'Círculo sagrado de mujeres', cat: 'Círculos' },
  { id: 5, img: '/assets/images/gallery_2.png', label: 'Naturaleza y conexión espiritual', cat: 'Naturaleza' },
  { id: 6, img: '/assets/images/service_psicoterapia.png', label: 'Espacio de psicoterapia', cat: 'Sesiones' },
  { id: 7, img: '/assets/images/service_angelical.png', label: 'Terapia angelical', cat: 'Sesiones' },
  { id: 8, img: '/assets/images/hero_bg.png', label: 'Conexión con la naturaleza', cat: 'Naturaleza' },
  { id: 9, img: '/assets/images/product_amulets.png', label: 'Amuletos y piezas artesanales', cat: 'Herramientas' },
];

const Galeria = () => {
  const [lightboxItem, setLightboxItem] = useState(null);
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="galeria" ref={sectionRef}>
      <SectionTitle
        decorativeText="Momentos mágicos"
        title="Galería"
        subtitle="Momentos de sanación, encuentros y conexión en nuestro camino juntas"
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
            <img src={item.img} alt={item.label} className={styles.galleryImage} loading="lazy" />
            <div className={styles.overlay}>
              <span className={styles.overlayCategory}>{item.cat}</span>
              <span className={styles.overlayLabel}>{item.label}</span>
            </div>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
          <div className={styles.lightboxContent}>
            <img src={lightboxItem.img} alt={lightboxItem.label} className={styles.lightboxImage} />
            <p className={styles.lightboxCaption}>{lightboxItem.label}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;
