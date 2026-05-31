import { CheckCircle2, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import styles from './BookingConfirmation.module.css';

const BookingConfirmation = ({ cita, onWhatsApp, onDownloadICS, onReset }) => {
  return (
    <div className={styles.container}>
      <span className={styles.successIcon}><CheckCircle2 size={48} strokeWidth={1.5} /></span>
      <h2 className={styles.title}>¡Cita Agendada!</h2>
      <p className={styles.subtitle}>
        Tu cita ha sido registrada exitosamente. Diana te confirmará en las próximas horas.
      </p>

      <div className={styles.summary}>
        <div className={styles.row}>
          <span className={styles.label}>Servicio</span>
          <span className={styles.value}>{cita.servicio}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Fecha</span>
          <span className={styles.value}>{cita.fechaFormateada}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Hora</span>
          <span className={styles.value}>{cita.hora}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Nombre</span>
          <span className={styles.value}>{cita.nombre}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="whatsapp" fullWidth onClick={onWhatsApp}>
          💬 Confirmar por WhatsApp
        </Button>
        <Button variant="outline" fullWidth onClick={onDownloadICS}>
          📅 Agregar al calendario
        </Button>
      </div>

      <p className={styles.note}>
        <Sparkles size={16} strokeWidth={1.5} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom', color: 'var(--color-primary)' }} /> Diana te contactará para confirmar tu cita. ¡Nos vemos pronto!
      </p>

      <button className={styles.resetLink} onClick={onReset}>
        Agendar otra cita
      </button>
    </div>
  );
};

export default BookingConfirmation;
