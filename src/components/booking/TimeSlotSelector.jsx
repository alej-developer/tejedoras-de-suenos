import styles from './TimeSlotSelector.module.css';

const TimeSlotSelector = ({ slots, selectedSlot, onSelectSlot, duracion }) => {
  if (!slots || slots.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📅</span>
        <p>No hay horarios disponibles para este día.</p>
        <p>Por favor, selecciona otra fecha.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.info}>
        Cada sesión dura {duracion || '60 minutos'}. Selecciona tu horario preferido:
      </p>

      <div className={styles.grid}>
        {slots.map((slot) => (
          <button
            key={slot.hora}
            className={[
              styles.slot,
              selectedSlot === slot.hora ? styles.selected : '',
              !slot.disponible ? styles.disabled : '',
            ].filter(Boolean).join(' ')}
            onClick={() => slot.disponible && onSelectSlot(slot.hora)}
            disabled={!slot.disponible}
            type="button"
            aria-label={`${slot.hora} ${slot.disponible ? 'disponible' : 'no disponible'}`}
          >
            {slot.hora}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
