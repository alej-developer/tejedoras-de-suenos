import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import catalogo, { formatPrecio } from '../../data/catalogo';
import styles from './CatalogoPreview.module.css';

const emojiMap = {
  Agendas: '📓',
  Cristales: '💎',
  Kits: '🎁',
  Aceites: '🫧',
  Amuletos: '🧿',
  Velas: '🕯️',
};

const CatalogoPreview = () => {
  const sectionRef = useScrollAnimation();
  const destacados = catalogo.filter(p => p.destacado).slice(0, 4);

  return (
    <section className={styles.section} id="tienda" ref={sectionRef}>
      <SectionTitle
        decorativeText="Nuestra tienda"
        title="Productos Destacados"
        subtitle="Herramientas sagradas para acompañar tu camino de transformación"
      />

      <div className={styles.grid}>
        {destacados.map((producto, index) => (
          <div
            key={producto.id}
            className={`${styles.card} animate-on-scroll delay-${index + 1}`}
          >
            <div className={styles.imagePlaceholder}>
              {emojiMap[producto.categoria] || '✨'}
            </div>
            <div className={styles.body}>
              <span className={styles.categoria}>{producto.categoria}</span>
              <h3 className={styles.nombre}>{producto.nombre}</h3>
              <p className={styles.descripcion}>{producto.descripcion}</p>
              <div className={styles.footer}>
                <span className={styles.precio}>{formatPrecio(producto.precio)}</span>
                <Button
                  variant="whatsapp"
                  size="sm"
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '573001234567'}?text=${encodeURIComponent(`Hola Diana 🌸 Me interesa el producto: ${producto.nombre}`)}`}
                  target="_blank"
                >
                  💬 Pedir
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.verMas}>
        <Link to="/catalogo">
          <Button variant="outline" size="lg">
            Ver catálogo completo →
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CatalogoPreview;
