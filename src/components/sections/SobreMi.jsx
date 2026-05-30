import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import styles from './SobreMi.module.css';

const SobreMi = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="sobre-mi" ref={sectionRef}>
      <SectionTitle
        decorativeText="Conóceme"
        title="Sobre Mí"
        subtitle="La mujer detrás de Tejedoras de Sueños"
      />

      <div className={styles.container}>
        <div className={`${styles.imageWrapper} animate-on-scroll`}>
          <div className={styles.imageFrame}>
            <img src="/assets/images/diana_profile.png" alt="Diana Guzmán - Terapeuta Angelical" />
          </div>
          <div className={styles.decorElement} aria-hidden="true">
            <span className={styles.decorDot} />
            <span className={styles.decorDot} />
            <span className={styles.decorDot} />
          </div>
        </div>

        <div className={`${styles.textContent} animate-on-scroll delay-2`}>
          <div className={styles.nameBlock}>
            <p className={styles.name}>Diana Guzmán</p>
            <div className={styles.roleBadge}>
              <span className={styles.roleIcon}>🌸</span>
              <h3 className={styles.role}>Terapeuta Angelical</h3>
            </div>
          </div>

          <blockquote className={styles.quote}>
            "Juntas somos poder y magia para transformar el mundo"
          </blockquote>

          <p className={styles.bio}>
            Soy Diana, y mi misión es acompañar a mujeres en su camino de
            despertar espiritual y transformación personal. A través de la
            conexión con la energía angelical, facilito procesos de sanación
            profunda que te ayudan a reconectar con tu esencia y despertar
            el poder que llevas dentro.
          </p>
          <p className={styles.bio}>
            Desde Pereira, Risaralda, he tenido el privilegio de acompañar
            a cientos de mujeres en sus procesos de sanación, empoderamiento
            y crecimiento personal. Cada sesión es un espacio sagrado de
            amor y transformación.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>+1400</span>
              <span className={styles.statLabel}>Seguidoras en comunidad</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>+160</span>
              <span className={styles.statLabel}>Contenidos compartidos</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>Pereira</span>
              <span className={styles.statLabel}>Risaralda, Colombia</span>
            </div>
          </div>

          <div className={styles.values}>
            <span className={styles.valueTag}>✨ Sanación</span>
            <span className={styles.valueTag}>🌿 Espiritualidad</span>
            <span className={styles.valueTag}>💪 Empoderamiento</span>
            <span className={styles.valueTag}>💜 Sororidad</span>
            <span className={styles.valueTag}>🌸 Conexión</span>
          </div>

          <Button variant="primary" href="/agendar">
            Agenda una sesión conmigo ✨
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SobreMi;
