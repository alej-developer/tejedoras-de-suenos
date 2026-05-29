// Helpers para persistir citas en localStorage (MVP)
// En Fase 2, estos helpers se reemplazarán por llamadas a un backend

const STORAGE_KEY = 'tejedoras_citas';

/**
 * Obtiene todas las citas guardadas
 */
export const obtenerCitas = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/**
 * Guarda una nueva cita
 */
export const guardarCita = (cita) => {
  const citas = obtenerCitas();
  const nuevaCita = {
    ...cita,
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    creadaEn: new Date().toISOString()
  };
  citas.push(nuevaCita);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(citas));
  return nuevaCita;
};

/**
 * Verifica si un slot específico está ocupado
 */
export const esSlotOcupado = (fecha, hora) => {
  const citas = obtenerCitas();
  return citas.some(cita => cita.fecha === fecha && cita.hora === hora);
};

/**
 * Obtiene las citas de un día específico
 */
export const obtenerCitasPorDia = (fecha) => {
  const citas = obtenerCitas();
  return citas.filter(cita => cita.fecha === fecha);
};

/**
 * Genera un mensaje de WhatsApp formateado con los datos de la cita
 */
export const generarMensajeWhatsApp = (cita) => {
  const mensaje = `✨ *Nueva cita - Tejedoras de Sueños* ✨

📋 *Servicio:* ${cita.servicio}
📅 *Fecha:* ${cita.fechaFormateada}
🕐 *Hora:* ${cita.hora}

👤 *Nombre:* ${cita.nombre}
📱 *Teléfono:* ${cita.telefono}
📧 *Email:* ${cita.email}

${cita.nota ? `📝 *Nota:* ${cita.nota}` : ''}

_Cita agendada desde la web de Tejedoras de Sueños_ 🌸`;

  return encodeURIComponent(mensaje);
};

/**
 * Genera un archivo .ics para agregar la cita al calendario
 */
export const generarICS = (cita) => {
  const [anio, mes, dia] = cita.fecha.split('-');
  const [hora, min] = cita.hora.split(':');
  
  const inicio = `${anio}${mes}${dia}T${hora}${min}00`;
  
  // Calcular hora de fin (duración por defecto: 1 hora)
  const horaFin = parseInt(hora) + 1;
  const fin = `${anio}${mes}${dia}T${String(horaFin).padStart(2, '0')}${min}00`;

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tejedoras de Sueños//Citas//ES
BEGIN:VEVENT
DTSTART:${inicio}
DTEND:${fin}
SUMMARY:${cita.servicio} - Tejedoras de Sueños
DESCRIPTION:Cita con Diana Guzmán\\nServicio: ${cita.servicio}
LOCATION:Pereira, Risaralda
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cita-tejedoras-${cita.fecha}.ics`;
  link.click();
  URL.revokeObjectURL(url);
};
