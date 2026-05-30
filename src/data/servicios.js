// Datos de servicios basados en el Instagram @tejedorasdesuenos1
// Terapia Angelical (Diana Guzmán) + Psicoterapia (Diana Cano)

const servicios = [
  {
    id: 'terapia-angelical',
    nombre: 'Terapia Angelical',
    descripcionCorta: 'Conecta con la energía de los ángeles para sanar y encontrar tu camino de luz.',
    descripcion: 'La Terapia Angelical es un proceso de sanación profunda donde nos conectamos con la energía de los ángeles para liberar bloqueos emocionales, sanar heridas del pasado y abrir nuevos caminos de luz en tu vida. Cada sesión es única y personalizada según tus necesidades.',
    duracion: '60 minutos',
    modalidad: 'Presencial / Virtual',
    precio: 'Consultar',
    icono: 'angel',
    imagen: '/assets/images/service_angelical.png',
    beneficios: [
      'Liberación de bloqueos emocionales',
      'Paz interior y claridad mental',
      'Guía espiritual personalizada',
      'Sanación de relaciones',
      'Conexión con tu propósito de vida'
    ]
  },
  {
    id: 'psicoterapia',
    nombre: 'Psicoterapia',
    descripcionCorta: 'Acompañamiento profesional para tu bienestar emocional y crecimiento personal.',
    descripcion: 'Sesiones de psicoterapia con enfoque humanista e integrativo. Un espacio seguro y confidencial donde trabajamos juntas para comprender tus emociones, superar dificultades y construir el bienestar que mereces.',
    duracion: '60 minutos',
    modalidad: 'Presencial / Virtual',
    precio: 'Consultar',
    icono: 'therapy',
    imagen: '/assets/images/service_psicoterapia.png',
    beneficios: [
      'Manejo de ansiedad y estrés',
      'Autoconocimiento profundo',
      'Sanación emocional',
      'Herramientas para el día a día',
      'Espacio seguro y confidencial'
    ]
  },
  {
    id: 'talleres-empoderamiento',
    nombre: 'Talleres de Empoderamiento',
    descripcionCorta: 'Despierta tu poder interior junto a otras mujeres en espacios de sororidad.',
    descripcion: 'Los talleres de empoderamiento son espacios sagrados donde mujeres se reúnen para compartir, sanar y crecer juntas. A través de dinámicas grupales, meditaciones y ejercicios de autoconocimiento, descubrirás la fuerza y la magia que llevas dentro.',
    duracion: '3 horas',
    modalidad: 'Presencial / Grupal',
    precio: 'Consultar',
    icono: 'hands',
    imagen: '/assets/images/service_empowerment.png',
    beneficios: [
      'Sororidad y comunidad',
      'Herramientas de autoconocimiento',
      'Despertar del poder femenino',
      'Sanación colectiva',
      'Red de apoyo entre mujeres'
    ]
  },
  {
    id: 'meditacion-guiada',
    nombre: 'Meditación Guiada',
    descripcionCorta: 'Encuentra paz interior y conecta con tu ser más profundo.',
    descripcion: 'Las sesiones de meditación guiada están diseñadas para ayudarte a encontrar un espacio de calma en medio del caos cotidiano. Utilizamos visualizaciones, sonidos sanadores y técnicas de respiración para llevar tu mente y cuerpo a un estado de profunda relajación y conexión.',
    duracion: '45 minutos',
    modalidad: 'Presencial / Virtual / Grupal',
    precio: 'Consultar',
    icono: 'lotus',
    imagen: '/assets/images/service_meditation.png',
    beneficios: [
      'Reducción del estrés',
      'Mejora de la concentración',
      'Conexión con el yo interior',
      'Mejor calidad de sueño',
      'Mayor autoconciencia'
    ]
  },
  {
    id: 'circulos-mujeres',
    nombre: 'Círculos de Mujeres',
    descripcionCorta: 'Encuentros sagrados donde tejemos juntas nuestros sueños y sanamos en comunidad.',
    descripcion: 'Los círculos de mujeres son rituales ancestrales de encuentro y sanación colectiva. Nos reunimos para celebrar los ciclos de la naturaleza, compartir nuestras historias y sostenernos mutuamente en el camino de transformación.',
    duracion: '2-3 horas',
    modalidad: 'Presencial',
    precio: 'Aporte voluntario',
    icono: 'circle',
    imagen: '/assets/images/gallery_1.png',
    beneficios: [
      'Conexión con otras mujeres',
      'Rituales de luna llena y nueva',
      'Sanación colectiva',
      'Espacio seguro de expresión',
      'Reconexión con lo sagrado femenino'
    ]
  }
];

export default servicios;
