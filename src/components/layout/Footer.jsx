import { Link } from 'react-router-dom';
import { Flower2, Instagram, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/tejedorasdesuenos1';
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '573001234567';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <div className={styles.brandName}>
              <Flower2 size={24} strokeWidth={1.5} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Tejedoras de Sueños
            </div>
            <p className={styles.brandDescription}>
              Sanación, espiritualidad y empoderamiento femenino.
              Un espacio donde tejemos juntas los sueños que transforman el mundo.
            </p>
            <div className={styles.socialLinks}>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Síguenos en Instagram"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Contáctanos por WhatsApp"
              >
                <MessageCircle size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className={styles.linksSection}>
            <h3>Enlaces</h3>
            <Link to="/" className={styles.footerLink}>Inicio</Link>
            <Link to="/catalogo" className={styles.footerLink}>Tienda</Link>
            <Link to="/blog" className={styles.footerLink}>Blog</Link>
            <Link to="/agendar" className={styles.footerLink}>Agendar Cita</Link>
          </div>

          <div className={styles.contactSection}>
            <h3>Contacto</h3>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><MapPin size={18} strokeWidth={1.5} /></span>
              <span>Pereira, Risaralda</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><Instagram size={18} strokeWidth={1.5} /></span>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                @tejedorasdesuenos1
              </a>
            </div>
          </div>
        </div>

        <hr className={styles.dividerLine} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Tejedoras de Sueños. Todos los derechos reservados.
          </p>
          <p className={styles.quote}>
            Juntas somos poder y magia <Sparkles size={16} strokeWidth={1.5} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'text-bottom' }} />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
