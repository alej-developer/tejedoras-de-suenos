import styles from './Card.module.css';

const Card = ({
  children,
  variant = 'elevated',
  image,
  imageAlt = '',
  compact = false,
  className = '',
  onClick,
  id,
  ...props
}) => {
  const classes = [
    styles.card,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      id={id}
      {...props}
    >
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className={styles.cardImage}
          loading="lazy"
        />
      )}
      <div className={compact ? styles.cardBodyCompact : styles.cardBody}>
        {children}
      </div>
    </div>
  );
};

export default Card;
