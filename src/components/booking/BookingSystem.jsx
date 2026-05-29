import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useBooking from '../../hooks/useBooking';
import Button from '../ui/Button';
import CalendarPicker from './CalendarPicker';
import TimeSlotSelector from './TimeSlotSelector';
import BookingConfirmation from './BookingConfirmation';
import servicios from '../../data/servicios';
import { formatFechaConDia } from '../../utils/formatDate';
import styles from './BookingSystem.module.css';

import imgAngelical from '/assets/images/service_angelical.png';
import imgEnergy from '/assets/images/service_energy.png';
import imgAkashic from '/assets/images/service_akashic.png';
import imgMeditation from '/assets/images/service_meditation.png';
import imgEmpowerment from '/assets/images/service_empowerment.png';

const iconMap = {
  angel: <img src={imgAngelical} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}} />,
  energy: <img src={imgEnergy} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}} />,
  book: <img src={imgAkashic} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}} />,
  lotus: <img src={imgMeditation} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}} />,
  hands: <img src={imgEmpowerment} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}} />,
};

const pasoLabels = ['Servicio', 'Fecha', 'Hora', 'Confirmar'];

const BookingSystem = () => {
  const [searchParams] = useSearchParams();
  const booking = useBooking();

  useEffect(() => {
    const servicioParam = searchParams.get('servicio');
    if (servicioParam && !booking.servicioSeleccionado) {
      booking.seleccionarServicio(servicioParam);
      if (booking.pasoActual === 0) booking.siguiente();
    }
  }, [searchParams]);

  const renderProgress = () => (
    <div className={styles.progress}>
      {pasoLabels.map((label, i) => (
        <div key={i} style={{ display: 'contents' }}>
          {i > 0 && (
            <div className={`${styles.stepLine} ${i <= booking.pasoActual ? styles.stepLineCompleted : ''}`} />
          )}
          <div className={`${styles.step} ${i === booking.pasoActual ? styles.stepActive : ''} ${i < booking.pasoActual ? styles.stepCompleted : ''}`}>
            <div className={styles.stepCircle}>
              {i < booking.pasoActual ? '✓' : i + 1}
            </div>
            <span className={styles.stepLabel}>{label}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderServicioStep = () => (
    <>
      <h2 className={styles.title}>Elige tu servicio</h2>
      <p className={styles.subtitle}>¿Qué experiencia te gustaría vivir?</p>
      <div className={styles.serviceGrid}>
        {servicios.map((s) => (
          <button
            key={s.id}
            className={`${styles.serviceCard} ${booking.servicioSeleccionado?.id === s.id ? styles.serviceCardSelected : ''}`}
            onClick={() => booking.seleccionarServicio(s.id)}
            type="button"
          >
            <div className={styles.serviceIcon} style={{ width: '60px', height: '60px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {iconMap[s.icono]}
            </div>
            <div className={styles.serviceName}>{s.nombre}</div>
            <div className={styles.serviceDuration}>🕐 {s.duracion}</div>
          </button>
        ))}
      </div>
      {booking.errores.servicio && <p className={styles.errorText}>{booking.errores.servicio}</p>}
    </>
  );

  const renderFechaStep = () => (
    <>
      <h2 className={styles.title}>Elige una fecha</h2>
      <p className={styles.subtitle}>Selecciona el día para tu sesión de {booking.servicioSeleccionado?.nombre}</p>
      <CalendarPicker
        selectedDate={booking.fechaSeleccionada}
        onSelectDate={booking.seleccionarFecha}
      />
      {booking.errores.fecha && <p className={styles.errorText}>{booking.errores.fecha}</p>}
    </>
  );

  const renderHoraStep = () => (
    <>
      <h2 className={styles.title}>Elige un horario</h2>
      <p className={styles.subtitle}>
        {booking.fechaSeleccionada && formatFechaConDia(booking.fechaSeleccionada)}
      </p>
      {booking.cargando ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-primary)' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid rgba(184,134,11,0.2)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p>Consultando disponibilidad...</p>
        </div>
      ) : (
        <TimeSlotSelector
          slots={booking.obtenerSlotsDisponibles()}
          selectedSlot={booking.horaSeleccionada}
          onSelectSlot={booking.seleccionarHora}
          duracion={booking.servicioSeleccionado?.duracion}
        />
      )}
      {booking.errores.hora && <p className={styles.errorText}>{booking.errores.hora}</p>}
    </>
  );

  const renderConfirmacionStep = () => (
    <>
      <h2 className={styles.title}>Confirma tu cita</h2>
      <p className={styles.subtitle}>Revisa los datos y completa tu información</p>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Servicio</span>
          <span className={styles.summaryValue}>{booking.servicioSeleccionado?.nombre}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Fecha</span>
          <span className={styles.summaryValue}>{formatFechaConDia(booking.fechaSeleccionada)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Hora</span>
          <span className={styles.summaryValue}>{booking.horaSeleccionada}</span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre completo *</label>
        <input
          className={`${styles.input} ${booking.errores.nombre ? styles.inputError : ''}`}
          value={booking.datosCliente.nombre}
          onChange={(e) => booking.actualizarDatosCliente('nombre', e.target.value)}
          placeholder="Tu nombre completo"
        />
        {booking.errores.nombre && <p className={styles.errorText}>{booking.errores.nombre}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Teléfono *</label>
        <input
          className={`${styles.input} ${booking.errores.telefono ? styles.inputError : ''}`}
          value={booking.datosCliente.telefono}
          onChange={(e) => booking.actualizarDatosCliente('telefono', e.target.value)}
          placeholder="300 123 4567"
          type="tel"
        />
        {booking.errores.telefono && <p className={styles.errorText}>{booking.errores.telefono}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email *</label>
        <input
          className={`${styles.input} ${booking.errores.email ? styles.inputError : ''}`}
          value={booking.datosCliente.email}
          onChange={(e) => booking.actualizarDatosCliente('email', e.target.value)}
          placeholder="tu@email.com"
          type="email"
        />
        {booking.errores.email && <p className={styles.errorText}>{booking.errores.email}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Nota adicional (opcional)</label>
        <textarea
          className={styles.textarea}
          value={booking.datosCliente.nota}
          onChange={(e) => booking.actualizarDatosCliente('nota', e.target.value)}
          placeholder="¿Hay algo que quieras que sepa antes de tu cita?"
        />
      </div>
    </>
  );

  if (booking.citaConfirmada) {
    return (
      <div className={styles.container}>
        <BookingConfirmation
          cita={booking.citaConfirmada}
          onWhatsApp={booking.enviarWhatsApp}
          onDownloadICS={booking.descargarICS}
          onReset={booking.reiniciar}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {renderProgress()}

      <div className={styles.content}>
        {booking.paso === 'servicio' && renderServicioStep()}
        {booking.paso === 'fecha' && renderFechaStep()}
        {booking.paso === 'hora' && renderHoraStep()}
        {booking.paso === 'confirmacion' && renderConfirmacionStep()}
      </div>

      <div className={styles.actions}>
        {booking.pasoActual > 0 ? (
          <Button variant="ghost" onClick={booking.anterior}>← Atrás</Button>
        ) : <div />}

        {booking.paso === 'confirmacion' ? (
          <Button variant="primary" onClick={booking.confirmarCita} disabled={booking.cargando}>
             {booking.cargando ? 'Confirmando...' : 'Confirmar Cita'}
          </Button>
        ) : (
          <Button variant="primary" onClick={booking.siguiente} disabled={booking.cargando}>
            Siguiente →
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingSystem;
