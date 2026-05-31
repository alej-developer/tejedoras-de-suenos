import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'citas';

/**
 * Guarda una nueva cita en Firestore
 */
export const guardarCita = async (cita) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...cita,
      creadaEn: Timestamp.now()
    });
    return {
      ...cita,
      id: docRef.id
    };
  } catch (error) {
    console.error("Error al guardar la cita: ", error);
    throw new Error("No se pudo guardar la cita. Inténtalo de nuevo más tarde.");
  }
};

/**
 * Verifica si un slot específico está ocupado consultando a Firestore
 */
export const esSlotOcupado = async (fecha, hora) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("fecha", "==", fecha), 
      where("hora", "==", hora)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error al verificar disponibilidad: ", error);
    // En caso de error, preferimos bloquear el slot por seguridad o lanzar el error
    throw new Error("Error al verificar disponibilidad.");
  }
};

/**
 * Obtiene las citas de un día específico
 */
export const obtenerCitasPorDia = async (fecha) => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where("fecha", "==", fecha));
    const querySnapshot = await getDocs(q);
    
    const citas = [];
    querySnapshot.forEach((doc) => {
      citas.push({ id: doc.id, ...doc.data() });
    });
    
    return citas;
  } catch (error) {
    console.error("Error al obtener citas por día: ", error);
    return [];
  }
};

/**
 * Genera un mensaje de WhatsApp formateado con los datos de la cita
 */
export const generarMensajeWhatsApp = (cita) => {
  const mensaje = `*Nueva cita - Tejedoras de Sueños*

📋 *Servicio:* ${cita.servicio}
📅 *Fecha:* ${cita.fechaFormateada}
🕐 *Hora:* ${cita.hora}

👤 *Nombre:* ${cita.nombre}
📱 *Teléfono:* ${cita.telefono}
📧 *Email:* ${cita.email}

${cita.nota ? `📝 *Nota:* ${cita.nota}` : ''}

_Cita agendada desde la web de Tejedoras de Sueños_`;

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
