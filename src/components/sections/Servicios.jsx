import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import servicios from '../../data/servicios';
import styles from './Servicios.module.css';

const Servicios = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="servicios" ref={sectionRef}>
      <SectionTitle
        decorativeText="Lo que ofrecemos"
        title="Nuestros Servicios"
        subtitle="Cada servicio está diseñado para acompañarte en tu proceso de sanación y transformación"
      />

      <div className={styles.grid}>
        {servicios.map((servicio, index) => (
          <div
            key={servicio.id}
            className={`${styles.card} animate-on-scroll delay-${(index % 5) + 1}`}
          >
            <div className={styles.cardImageWrapper}>
              <img 
                src={servicio.imagen} 
                alt={servicio.nombre}
                className={styles.cardImage}
                loading="lazy"
              />
              <div className={styles.cardImageOverlay} />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{servicio.nombre}</h3>
              <p className={styles.cardDescription}>{servicio.descripcionCorta}</p>
              <div className={styles.cardMeta}>
                <span className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {servicio.duracion}
                </span>
                <span className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {servicio.modalidad}
                </span>
              </div>
              <div className={styles.cardAction}>
                <Link to={`/agendar?servicio=${servicio.id}`}>
                  <Button variant="outline" size="sm">
                    Agendar cita →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;
