// Utilidades para formato de fechas en español

const meses = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

const mesesCortos = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
];

const diasSemana = [
  'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
];

const diasSemanaCortos = [
  'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'
];

/**
 * Formatea una fecha en formato largo: "29 de mayo de 2026"
 */
export const formatFechaLarga = (fechaStr) => {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();
  return `${dia} de ${mes} de ${anio}`;
};

/**
 * Formatea una fecha en formato corto: "29 may 2026"
 */
export const formatFechaCorta = (fechaStr) => {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const dia = fecha.getDate();
  const mes = mesesCortos[fecha.getMonth()];
  const anio = fecha.getFullYear();
  return `${dia} ${mes} ${anio}`;
};

/**
 * Formatea una fecha con día de la semana: "jueves, 29 de mayo de 2026"
 */
export const formatFechaConDia = (fechaStr) => {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const diaSem = diasSemana[fecha.getDay()];
  return `${diaSem}, ${formatFechaLarga(fechaStr)}`;
};

/**
 * Obtiene el nombre del mes
 */
export const getNombreMes = (mesIndex) => meses[mesIndex];

/**
 * Obtiene los nombres cortos de los días de la semana
 */
export const getDiasSemanaCortos = () => diasSemanaCortos;

/**
 * Verifica si una fecha ya pasó
 */
export const esFechaPasada = (fechaStr) => {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return fecha < hoy;
};

/**
 * Calcula días restantes hasta una fecha
 */
export const diasHasta = (fechaStr) => {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const diff = fecha - hoy;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export { meses, diasSemana, diasSemanaCortos };
