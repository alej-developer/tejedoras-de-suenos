import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import styles from './Hero.module.css';

const Hero = () => {
  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bgImage}>
        <img 
          src="/assets/images/hero_bg.png" 
          alt="" 
          aria-hidden="true"
          loading="eager"
        />
      </div>
      <div className={styles.bgOverlay} />
      <div className={styles.particles} aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={styles.particle} style={{ '--i': i }} />
        ))}
      </div>

      <div className={styles.content}>
        <span className={styles.decorativeText}>Bienvenida a</span>
        <h1 className={styles.title}>
          Tejedoras<br />
          <span className={styles.titleAccent}>de Sueños</span>
        </h1>
        <p className={styles.lema}>
          🌸 Juntas somos poder y magia para transformar el mundo 🌸
        </p>
        <p className={styles.subtitle}>
          Terapia angelical, psicoterapia y empoderamiento femenino<br />
          <span className={styles.location}>Pereira, Risaralda — Colombia</span>
        </p>
        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={scrollToServices}>
            Descubre nuestros servicios
          </Button>
          <Link to="/agendar">
            <Button 
              variant="outline" 
              size="lg" 
              style={{ 
                borderColor: 'rgba(255,253,249,0.4)', 
                color: 'var(--color-white)',
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.08)'
              }}
            >
              ✨ Agenda tu cita
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
        <span className={styles.scrollText}>Descubre más</span>
        <span className={styles.scrollArrow}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    </section>
  );
};

export default Hero;
