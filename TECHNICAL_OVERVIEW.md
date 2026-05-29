# 🌸 Tejedoras de Sueños — Technical Overview & Architecture

> **Nota para Reclutadores / Technical Reviewers**: Este documento fue creado específicamente para detallar la arquitectura, las decisiones técnicas y las soluciones implementadas en el MVP de *Tejedoras de Sueños*. Demuestra capacidades de desarrollo frontend moderno, arquitectura de estado y diseño UI/UX.

## 🎯 Resumen del Proyecto

**Tejedoras de Sueños** es una plataforma de bienestar holístico construida como un Single Page Application (SPA). El objetivo principal del MVP es ofrecer una experiencia de usuario inmersiva, gestionar un catálogo de productos, un blog basado en Markdown, y un **sistema integral de agendamiento de citas sin depender de librerías externas pesadas**.

---

## 🏗️ Arquitectura y Stack Tecnológico

El proyecto está diseñado siguiendo principios de modularidad y separación de responsabilidades.

- **Framework**: React 18 + Vite (Elegido por su rapidez de compilación HMR y empaquetado optimizado).
- **Enrutamiento**: React Router v6 (Manejo de rutas declarativas con `BrowserRouter`).
- **Estilos**: CSS Modules Vanilla (CSS puro encapsulado por componente para evitar colisiones globales sin añadir dependencias como Tailwind, demostrando dominio de CSS profundo).
- **Gestión de Estado**: Custom Hooks + Contexto Local (Manejo del estado complejo del wizard de citas encapsulado en `useBooking.js`).
- **Renderizado Markdown**: `react-markdown` + `remark-gfm` (Para el motor de blog ligero).

---

## 💡 Decisiones Técnicas Destacadas

### 1. Sistema de Reservas Personalizado (Custom Booking Engine)
En lugar de incrustar iFrames de terceros (como Calendly), se desarrolló un motor de reservas "in-house" con un Wizard de 4 pasos.
- **`useBooking.js`**: Un Custom Hook robusto que gestiona el estado de los pasos, la selección de fecha/hora, la validación de formularios y la generación de carga útil.
- **Validación de Horarios**: Algoritmos personalizados para generar *slots* de tiempo dinámicos (`generarSlots`), evaluar solapamientos, bloquear días pasados y excluir días configurados como festivos.
- **Persistencia Temporal (MVP)**: Utilización de la API de `localStorage` (`bookingStorage.js`) para persistir la sesión de reserva, simulando la latencia y la estructura que tendrá una base de datos real (Firebase/Supabase) en la Fase 2.
- **Integración fluida**: Generación automática de archivos `.ics` para calendarios locales y enlaces profundos (Deep Links) hacia WhatsApp web con mensajes codificados en URI.

### 2. Motor de Blog con Markdown
Para mantener el proyecto libre de costos de servidor y base de datos en su etapa inicial, se implementó una arquitectura **Git-based CMS**.
- Los artículos se escriben como simples archivos `.md` con sintaxis GFM (GitHub Flavored Markdown).
- React dinámicamente lee y formatea el contenido en la página, permitiendo renderizar listas, negritas, enlaces y estructuras complejas de forma nativa e inyectando estilos locales.

### 3. Sistema de Diseño (Design System) Local
Se construyó un sistema de diseño desde cero en `index.css`:
- **CSS Variables**: Fuerte uso de `--variables` para paletas de colores (primario, secundario, acentos), tipografía y medidas de espaciado (`--space-X`), permitiendo un futuro refactor hacia "Dark Mode" de forma trivial.
- **Responsive Fluid**: Media queries bien definidos para soportar dispositivos móviles (Mobile-First approach en componentes clave) e implementaciones de UI como Grids y Flexbox.
- **Animaciones sin JS**: Componentes como `FloatingParticles` y `SectionDivider` usan animaciones `@keyframes` puras e intersecciones de opacidad (con `aria-hidden`) que respetan la preferencia `prefers-reduced-motion` del SO, optimizando los cuadros por segundo (60fps).

### 4. Seguridad y Buenas Prácticas
- **Data sensible segregada**: Números de teléfono y tokens están extraídos a variables de entorno (`.env`), garantizando que el repositorio público se mantenga sanitizado (`.env.example` incluido en el control de versiones).
- **Accesibilidad (A11y)**: Uso de atributos ARIA (`aria-label`, `aria-hidden`), roles semánticos (`role="dialog"`) y controles de enfoque para usuarios que navegan por teclado en el carrusel de testimonios y los modales (Lightboxes).
- **SEO Ready**: Etiquetas meta estáticas, Open Graph (OG), Twitter Cards y Microdatos `Schema.org` insertados directamente en el `index.html` para un posicionamiento rápido en buscadores.

---

## 📂 Estructura de Directorios

La estructura fue ideada para ser escalable horizontalmente:

```text
src/
├── components/
│   ├── booking/        # Lógica y UI del wizard de agendamiento
│   ├── layout/         # Componentes marco (Navbar, Footer)
│   ├── sections/       # Secciones modulares del Home (Hero, Contacto, etc.)
│   └── ui/             # "Dumb components" reutilizables (Button, Card)
├── data/               # Origen de datos (Mock BD) para servicios, blog y catálogo
├── hooks/              # Lógica de negocio extraída (useBooking, useScrollAnimation)
├── pages/              # Vistas principales de React Router
└── utils/              # Helpers puros (fechas, parseos, storage)
```

## 🚀 Próximos Pasos (Escalabilidad)
1. **Migración a Backend**: Sustituir el adaptador `localStorage` de `bookingStorage.js` por endpoints asíncronos hacia una BD serverless (PostgreSQL/Supabase).
2. **Pasarela de Pagos**: Conectar la vista de catálogo con la API de MercadoPago o Stripe.

---
*Gracias por revisar mi trabajo. Si deseas discutir sobre la arquitectura, patrones de diseño en React o la lógica implementada, estaré encantado de conversar en una entrevista técnica.*
