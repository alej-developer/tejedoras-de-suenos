import styles from './SectionTitle.module.css';

const SectionTitle = ({ decorativeText, title, subtitle, id }) => {
  return (
    <div className={`${styles.wrapper} animate-on-scroll`} id={id}>
      {decorativeText && (
        <span className={styles.decorativeText}>{decorativeText}</span>
      )}
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.underline} aria-hidden="true" />
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
