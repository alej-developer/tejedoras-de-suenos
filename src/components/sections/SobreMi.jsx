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
            <div className={styles.imagePlaceholder}>🌸</div>
          </div>
          <div className={styles.decorCircle} aria-hidden="true" />
        </div>

        <div className={`${styles.textContent} animate-on-scroll delay-2`}>
          <p className={styles.name}>Diana Guzmán</p>
          <h3 className={styles.role}>🪽 Terapeuta Angelical</h3>

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

          <div className={styles.values}>
            <span className={styles.valueTag}>🌿 Sanación</span>
            <span className={styles.valueTag}>✨ Espiritualidad</span>
            <span className={styles.valueTag}>💪 Empoderamiento</span>
            <span className={styles.valueTag}>💜 Sororidad</span>
            <span className={styles.valueTag}>🌙 Conexión</span>
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
