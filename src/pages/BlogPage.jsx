import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import blogPosts from '../data/blog';
import { formatFechaLarga } from '../utils/formatDate';

const BlogPage = () => {
  return (
    <main style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)', paddingBottom: '4rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle
          decorativeText="Reflexiones"
          title="Blog"
          subtitle="Artículos de bienestar, espiritualidad y empoderamiento para nutrir tu alma"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {blogPosts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'var(--color-white)',
                borderRadius: '1.5rem',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(61,44,46,0.08)',
                transition: 'all 0.3s',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(61,44,46,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, var(--color-secondary-light), var(--color-accent-light))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  flexShrink: 0,
                }}>
                  📝
                </div>
                <div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-secondary)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}>
                    {post.categoria}
                  </span>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    margin: '0.25rem 0 0.5rem',
                    color: 'var(--color-text)',
                  }}>
                    {post.titulo}
                  </h2>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-light)',
                    lineHeight: 1.6,
                    marginBottom: '0.5rem',
                  }}>
                    {post.extracto}
                  </p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-lighter)' }}>
                    {formatFechaLarga(post.fecha)} · {post.autor}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-lighter)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</p>
            <p>Pronto habrá artículos aquí. ¡Vuelve pronto!</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/"><Button variant="ghost">← Volver al inicio</Button></Link>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
