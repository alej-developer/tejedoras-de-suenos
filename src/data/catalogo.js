// Catálogo de productos físicos (placeholder)

const catalogo = [
  {
    id: 'agenda-lunar-2026',
    nombre: 'Agenda Lunar 2026',
    descripcion: 'Agenda diseñada con las fases lunares, espacios para intenciones diarias, afirmaciones y seguimiento de tu ciclo personal. Tu compañera de viaje espiritual.',
    precio: 85000,
    moneda: 'COP',
    categoria: 'Agendas',
    disponible: true,
    destacado: true,
    imagen: null
  },
  {
    id: 'cuarzo-rosa',
    nombre: 'Cristal de Cuarzo Rosa',
    descripcion: 'Piedra del amor incondicional. Ideal para abrir el chakra del corazón, sanar relaciones y cultivar el amor propio.',
    precio: 35000,
    moneda: 'COP',
    categoria: 'Cristales',
    disponible: true,
    destacado: true,
    imagen: null
  },
  {
    id: 'amatista',
    nombre: 'Cristal de Amatista',
    descripcion: 'Piedra de la espiritualidad y la intuición. Protege contra energías negativas y facilita la meditación y el sueño reparador.',
    precio: 40000,
    moneda: 'COP',
    categoria: 'Cristales',
    disponible: true,
    destacado: false,
    imagen: null
  },
  {
    id: 'kit-meditacion',
    nombre: 'Kit de Meditación Esencial',
    descripcion: 'Incluye vela aromática de lavanda, incienso de sándalo, cristal de cuarzo transparente y guía de meditación impresa.',
    precio: 65000,
    moneda: 'COP',
    categoria: 'Kits',
    disponible: true,
    destacado: true,
    imagen: null
  },
  {
    id: 'aceite-lavanda',
    nombre: 'Aceite Esencial de Lavanda',
    descripcion: 'Aceite 100% natural para aromaterapia. Promueve la relajación, alivia el estrés y favorece un sueño reparador.',
    precio: 28000,
    moneda: 'COP',
    categoria: 'Aceites',
    disponible: true,
    destacado: false,
    imagen: null
  },
  {
    id: 'amuleto-proteccion',
    nombre: 'Amuleto de Protección',
    descripcion: 'Amuleto artesanal cargado con intención de protección. Combina ojo turco, cuarzo negro y nudo celta. Cada pieza es única.',
    precio: 45000,
    moneda: 'COP',
    categoria: 'Amuletos',
    disponible: true,
    destacado: true,
    imagen: null
  },
  {
    id: 'vela-intencion',
    nombre: 'Vela de Intención',
    descripcion: 'Vela artesanal de cera de soja con hierbas y cristales seleccionados según tu intención: amor, abundancia, protección o sanación.',
    precio: 32000,
    moneda: 'COP',
    categoria: 'Velas',
    disponible: true,
    destacado: false,
    imagen: null
  },
  {
    id: 'diario-gratitud',
    nombre: 'Diario de Gratitud',
    descripcion: 'Cuaderno con prompts diarios de gratitud, reflexiones semanales y ejercicios de manifestación. 365 páginas de transformación.',
    precio: 55000,
    moneda: 'COP',
    categoria: 'Agendas',
    disponible: true,
    destacado: false,
    imagen: null
  }
];

export const categorias = ['Todas', 'Agendas', 'Cristales', 'Kits', 'Aceites', 'Amuletos', 'Velas'];

export const formatPrecio = (precio) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(precio);
};

export default catalogo;
