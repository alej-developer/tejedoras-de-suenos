# 🌸 Tejedoras de Sueños — Página Web

Sitio web de **Tejedoras de Sueños**, proyecto de bienestar holístico, terapia angelical y empoderamiento femenino liderado por Diana Guzmán en Pereira, Risaralda (Colombia).

## 🚀 Comenzar

### Requisitos
- Node.js 18+
- npm 9+

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
# Editar .env con los valores reales (número de WhatsApp, etc.)

# Iniciar servidor de desarrollo
npm run dev
```

### Construir para producción

```bash
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── booking/        # Sistema de reserva de citas
│   ├── layout/         # Navbar, Footer, SectionDivider
│   ├── sections/       # Secciones de la landing page
│   └── ui/             # Componentes reutilizables (Button, Card, etc.)
├── data/               # Datos estáticos (servicios, testimonios, catálogo, blog)
├── hooks/              # Hooks personalizados (useBooking, useScrollAnimation)
├── pages/              # Páginas del sitio
└── utils/              # Utilidades (formatDate, bookingStorage)
```

## 📝 Cómo agregar contenido

### Agregar un post al blog

1. Crear un archivo `.md` en `src/data/blog/posts/`
2. Agregar los metadatos al inicio del archivo (frontmatter)
3. Registrar el post en `src/data/blog/index.js`
4. Importar el contenido en `src/pages/BlogPostPage.jsx`

### Agregar un producto al catálogo

Editar `src/data/catalogo.js` y agregar un nuevo objeto al array.

### Modificar servicios

Editar `src/data/servicios.js`.

### Modificar horarios de citas

Editar `src/data/horariosDisponibles.js`.

## 🔒 Datos Sensibles

Los datos sensibles (teléfono, email, credenciales) **NO se almacenan en el repositorio**. Se gestionan mediante variables de entorno en el archivo `.env` (excluido del repositorio).

Consulta `.env.example` para ver las variables necesarias.

## 🛠️ Stack Tecnológico

- **Vite + React** — Framework y bundler
- **CSS Modules** — Estilos encapsulados
- **React Router v6** — Enrutamiento
- **react-markdown** — Renderizado de blog
- **Google Fonts** — Playfair Display, Nunito, Cormorant Garamond, Great Vibes

## 📱 Diseño Responsivo

El sitio está optimizado para:
- 📱 Móvil (< 768px)
- 📱 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🌐 Despliegue

Preparado para desplegar en **Vercel** o **Netlify** (gratis).

---

*Juntas somos poder y magia para transformar el mundo 🌸*
