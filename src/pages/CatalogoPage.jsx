import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import catalogo, { categorias, formatPrecio } from '../data/catalogo';

const pageStyle = {
  paddingTop: 'calc(var(--navbar-height) + 2rem)',
  paddingBottom: '4rem',
  minHeight: '100vh',
};

const CatalogoPage = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '573001234567';

  const filtrados = catalogo.filter(p => {
    const matchCategoria = categoriaActiva === 'Todas' || p.categoria === categoriaActiva;
    const matchBusqueda = !busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });



  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle
          decorativeText="Nuestra tienda"
          title="Catálogo"
          subtitle="Herramientas sagradas para acompañar tu camino de transformación"
        />

        {/* Filtros */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: `2px solid ${categoriaActiva === cat ? 'var(--color-primary)' : 'rgba(184,134,11,0.15)'}`,
                background: categoriaActiva === cat ? 'var(--color-primary)' : 'transparent',
                color: categoriaActiva === cat ? 'white' : 'var(--color-text)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div style={{ maxWidth: '400px', margin: '0 auto 2rem' }}>
          <input
            type="text"
            placeholder="🔍 Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '2px solid rgba(184,134,11,0.15)',
              background: 'var(--color-background)',
              fontSize: '1rem',
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
        </div>

        {/* Grid de productos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {filtrados.map(producto => (
            <div key={producto.id} style={{
              background: 'var(--color-white)',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(61,44,46,0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(61,44,46,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{
                aspectRatio: '1',
                background: 'var(--color-background)',
                overflow: 'hidden'
              }}>
                {producto.imagen && (
                  <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div style={{ padding: '1.25rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-secondary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {producto.categoria}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  margin: '0.5rem 0',
                }}>
                  {producto.nombre}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-light)',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                }}>
                  {producto.descripcion}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                  }}>
                    {formatPrecio(producto.precio)}
                  </span>
                  <Button
                    variant="whatsapp"
                    size="sm"
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola Diana 🌸 Me interesa: ${producto.nombre} (${formatPrecio(producto.precio)})`)}`}
                    target="_blank"
                  >
                    💬 Pedir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-lighter)' }}>
            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</p>
            <p>No se encontraron productos.</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/">
            <Button variant="ghost">← Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CatalogoPage;
