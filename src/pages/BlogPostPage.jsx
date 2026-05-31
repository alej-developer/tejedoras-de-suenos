import { useParams, Link } from 'react-router-dom';
import { Leaf, CalendarPlus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Button from '../components/ui/Button';
import blogPosts from '../data/blog';
import { formatFechaLarga } from '../utils/formatDate';
import bienvenidaContent from '../data/blog/posts/bienvenida.md?raw';

// Map slugs to markdown content
const contentMap = {
  bienvenida: bienvenidaContent,
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <main style={{ paddingTop: 'calc(var(--navbar-height) + 4rem)', textAlign: 'center', minHeight: '100vh' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
          <Leaf size={48} strokeWidth={1.5} style={{ color: 'var(--color-primary)' }} />
        </div>
        <h2>Artículo no encontrado</h2>
        <p style={{ color: 'var(--color-text-light)', margin: '1rem 0 2rem' }}>
          El artículo que buscas no existe o fue eliminado.
        </p>
        <Link to="/blog"><Button variant="outline">← Volver al blog</Button></Link>
      </main>
    );
  }

  const rawContent = contentMap[slug] || '';
  // Remove frontmatter
  const content = rawContent.replace(/^---[\s\S]*?---\n*/, '');

  return (
    <main style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)', paddingBottom: '4rem', minHeight: '100vh' }}>
      <article style={{ maxWidth: '750px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--color-secondary)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            {post.categoria}
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            fontWeight: 700,
            margin: '0.5rem 0 1rem',
            lineHeight: 1.2,
          }}>
            {post.titulo}
          </h1>
          <p style={{ color: 'var(--color-text-lighter)', fontSize: '0.9rem' }}>
            {formatFechaLarga(post.fecha)} · {post.autor}
          </p>
        </div>

        {/* Content */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          lineHeight: 1.9,
          color: 'var(--color-text)',
        }}
          className="blog-content"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '2px solid rgba(184,134,11,0.1)',
          marginTop: '3rem',
          paddingTop: '2rem',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.5rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
            Con amor y luz
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/blog"><Button variant="ghost">← Volver al blog</Button></Link>
            <Link to="/agendar"><Button variant="primary"><CalendarPlus size={18} strokeWidth={1.5} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Agendar cita</Button></Link>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPostPage;
