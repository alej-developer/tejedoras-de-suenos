import styles from './FloatingParticles.module.css';

const FloatingParticles = () => {
  return (
    <div className={styles.container} aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className={`${styles.particle} ${i % 3 === 0 ? styles.star : ''}`}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
