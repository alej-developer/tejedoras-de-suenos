import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import servicios from '../../data/servicios';
import styles from './Servicios.module.css';

const iconMap = {
  angel: '👼',
  energy: '✨',
  book: '📖',
  lotus: '🧘‍♀️',
  hands: '🤝',
};

const Servicios = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="servicios" ref={sectionRef}>
      <SectionTitle
        decorativeText="Lo que ofrezco"
        title="Mis Servicios"
        subtitle="Cada servicio está diseñado para acompañarte en tu proceso de sanación y transformación"
      />

      <div className={styles.grid}>
        {servicios.map((servicio, index) => (
          <div
            key={servicio.id}
            className={`${styles.card} animate-on-scroll delay-${index + 1}`}
          >
            <span className={styles.icon}>{iconMap[servicio.icono] || '✿'}</span>
            <h3 className={styles.cardTitle}>{servicio.nombre}</h3>
            <p className={styles.cardDescription}>{servicio.descripcionCorta}</p>
            <div className={styles.cardMeta}>
              <span className={styles.metaItem}>🕐 {servicio.duracion}</span>
              <span className={styles.metaItem}>📍 {servicio.modalidad}</span>
            </div>
            <div className={styles.cardAction}>
              <Link to={`/agendar?servicio=${servicio.id}`}>
                <Button variant="outline" size="sm">
                  Agendar cita →
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;
