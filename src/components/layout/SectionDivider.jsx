import styles from './SectionDivider.module.css';

const SectionDivider = ({ fromColor = '#FFF8F0', toColor = '#F5EDE4', flip = false }) => {
  return (
    <div className={`${styles.divider} ${flip ? styles.flip : ''}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C360,60 1080,0 1440,40 L1440,60 L0,60 Z"
          fill={toColor}
        />
        <path
          d="M0,20 C480,60 960,10 1440,50 L1440,60 L0,60 Z"
          fill={toColor}
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
