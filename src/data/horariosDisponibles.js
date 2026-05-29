// Configuración de horarios disponibles para citas
// Estos horarios se pueden personalizar según la agenda de Diana

const horariosDisponibles = {
  // Horarios por día de la semana (0 = Domingo, 6 = Sábado)
  horariosPorDia: {
    0: null, // Domingo — no disponible
    1: { inicio: '09:00', fin: '18:00' }, // Lunes
    2: { inicio: '09:00', fin: '18:00' }, // Martes
    3: { inicio: '09:00', fin: '18:00' }, // Miércoles
    4: { inicio: '09:00', fin: '18:00' }, // Jueves
    5: { inicio: '09:00', fin: '18:00' }, // Viernes
    6: { inicio: '09:00', fin: '13:00' }, // Sábado
  },

  // Intervalo entre citas en minutos
  intervaloMinutos: 60,

  // Tiempo de descanso entre citas en minutos
  descansoMinutos: 15,

  // Días festivos o bloqueados (formato YYYY-MM-DD)
  diasBloqueados: [
    '2026-01-01', // Año Nuevo
    '2026-01-12', // Reyes Magos (festivo Colombia)
    '2026-03-23', // San José
    '2026-04-09', // Jueves Santo
    '2026-04-10', // Viernes Santo
    '2026-05-01', // Día del Trabajo
    '2026-06-29', // San Pedro y San Pablo
    '2026-07-20', // Independencia
    '2026-08-07', // Batalla de Boyacá
    '2026-08-17', // Asunción de la Virgen
    '2026-10-12', // Día de la Raza
    '2026-11-02', // Todos los Santos
    '2026-11-16', // Independencia de Cartagena
    '2026-12-08', // Inmaculada Concepción
    '2026-12-25', // Navidad
  ],

  // Máximo de días en el futuro para agendar
  maxDiasFuturo: 60,
};

/**
 * Genera los slots de tiempo disponibles para un día específico
 * @param {number} diaSemana - Día de la semana (0-6)
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {number} duracionServicio - Duración del servicio en minutos
 * @returns {Array} Array de slots {hora: string, disponible: boolean}
 */
export const generarSlots = (diaSemana, fecha, duracionServicio = 60) => {
  const config = horariosDisponibles.horariosPorDia[diaSemana];
  if (!config) return [];

  const slots = [];
  const [horaInicio, minInicio] = config.inicio.split(':').map(Number);
  const [horaFin, minFin] = config.fin.split(':').map(Number);

  let horaActual = horaInicio;
  let minActual = minInicio;

  const totalMinFin = horaFin * 60 + minFin;

  while (true) {
    const totalMinActual = horaActual * 60 + minActual;
    const totalMinFinSlot = totalMinActual + duracionServicio;

    if (totalMinFinSlot > totalMinFin) break;

    const horaStr = `${String(horaActual).padStart(2, '0')}:${String(minActual).padStart(2, '0')}`;
    slots.push({
      hora: horaStr,
      disponible: true
    });

    // Avanzar al siguiente slot
    const siguienteMin = totalMinActual + duracionServicio + horariosDisponibles.descansoMinutos;
    horaActual = Math.floor(siguienteMin / 60);
    minActual = siguienteMin % 60;
  }

  return slots;
};

/**
 * Verifica si una fecha está bloqueada
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {boolean}
 */
export const esDiaBloqueado = (fecha) => {
  return horariosDisponibles.diasBloqueados.includes(fecha);
};

/**
 * Verifica si una fecha está dentro del rango permitido
 * @param {Date} fecha
 * @returns {boolean}
 */
export const esFechaValida = (fecha) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const maxFecha = new Date(hoy);
  maxFecha.setDate(maxFecha.getDate() + horariosDisponibles.maxDiasFuturo);
  return fecha >= hoy && fecha <= maxFecha;
};

export default horariosDisponibles;
