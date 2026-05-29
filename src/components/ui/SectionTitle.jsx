import styles from './SectionTitle.module.css';

const SectionTitle = ({ decorativeText, title, subtitle, id }) => {
  return (
    <div className={`${styles.sectionTitle} animate-on-scroll`} id={id}>
      {decorativeText && (
        <span className={styles.decorative}>{decorativeText}</span>
      )}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.divider}>
        <span className={styles.line}></span>
        <span className={styles.flower}>✿</span>
        <span className={styles.line}></span>
      </div>
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
