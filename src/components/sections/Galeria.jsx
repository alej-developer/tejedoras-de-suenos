import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import styles from './Galeria.module.css';

const galeriaItems = [
  { id: 1, img: '/assets/images/service_meditation.png', label: 'Sesión de meditación', ar: '4/3' },
  { id: 2, img: '/assets/images/service_empowerment.png', label: 'Taller de empoderamiento', ar: '1' },
  { id: 3, img: '/assets/images/product_crystals.png', label: 'Cristales y herramientas', ar: '3/4' },
  { id: 4, img: '/assets/images/gallery_1.png', label: 'Espacio de sanación', ar: '4/3' },
  { id: 5, img: '/assets/images/gallery_2.png', label: 'Cuencos tibetanos', ar: '1' },
  { id: 6, img: '/assets/images/service_akashic.png', label: 'Registros Akáshicos', ar: '3/4' },
  { id: 7, img: '/assets/images/product_amulets.png', label: 'Amuletos artesanales', ar: '1' },
  { id: 8, img: '/assets/images/product_oils.png', label: 'Conexión natural', ar: '4/3' },
  { id: 9, img: '/assets/images/service_angelical.png', label: 'Terapia angelical', ar: '3/4' },
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
              className={styles.imageContainer}
              style={{ '--ar': item.ar }}
            >
              <img src={item.img} alt={item.label} className={styles.galleryImage} />
            </div>
            <div className={styles.overlay}>Ver</div>
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
            <img src={lightboxItem.img} alt={lightboxItem.label} className={styles.lightboxImage} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;
