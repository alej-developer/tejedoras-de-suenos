import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import FloatingParticles from '../ui/FloatingParticles';
import styles from './Hero.module.css';

const Hero = () => {
  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bgOverlay} />
      <FloatingParticles />



      <div className={styles.content}>
        <span className={styles.decorativeText}>Bienvenida a</span>
        <h1 className={styles.title}>Tejedoras de Sueños</h1>
          Juntas somos poder y magia para transformar el mundo
        </p>
        <p className={styles.subtitle}>
          Sanación angelical, empoderamiento femenino y bienestar holístico
          en Pereira, Risaralda
        </p>
        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={scrollToServices}>
            Conoce mis servicios
          </Button>
          <Link to="/agendar">
            <Button variant="outline" size="lg" style={{ borderColor: 'var(--color-primary-light)', color: 'var(--color-primary-light)' }}>
              Agenda tu cita
            </Button>
          </Link>
        </div>
      </div>

      <button
        className={styles.scrollIndicator}
        onClick={() => {
          const el = document.getElementById('sobre-mi');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        aria-label="Desplazar hacia abajo"
      >
        <span>Descubre más</span>
        <span className={styles.scrollArrow}>↓</span>
      </button>
    </section>
  );
};

export default Hero;
