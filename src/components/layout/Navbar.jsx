import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flower2, Camera, CalendarPlus } from 'lucide-react';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/tejedorasdesuenos1';

  const navItems = [
    { label: 'Inicio', href: '#hero', isSection: true },
    { label: 'Sobre mí', href: '#sobre-mi', isSection: true },
    { label: 'Servicios', href: '#servicios', isSection: true },
    { label: 'Tienda', to: '/catalogo' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contacto', href: '#contacto', isSection: true },
  ];

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} id="navbar">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <Flower2 className={styles.logoIcon} size={24} strokeWidth={1.5} />
            Tejedoras de Sueños
          </Link>

          <nav className={styles.nav} aria-label="Navegación principal">
            {navItems.map((item) => (
              item.isSection ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.navLink}
                  onClick={(e) => scrollToSection(e, item.href.slice(1))}
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.to} className={styles.navLink}>
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className={styles.socialLinks}>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
              title="Instagram"
            >
              <Camera size={20} strokeWidth={1.5} />
            </a>
          </div>

          <div className={styles.ctaNav}>
            <Button variant="primary" size="sm" onClick={() => window.location.href = '/agendar'}>
              Agendar Cita
            </Button>
          </div>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlayVisible : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu */}
      <nav
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Menú móvil"
      >
        {navItems.map((item) => (
          item.isSection ? (
            <a
              key={item.label}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={(e) => scrollToSection(e, item.href.slice(1))}
            >
              {item.label}
            </a>
          ) : (
            <Link key={item.label} to={item.to} className={styles.mobileNavLink}>
              {item.label}
            </Link>
          )
        ))}

        <div className={styles.mobileSocial}>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <Camera size={18} strokeWidth={1.5} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Instagram
          </a>
        </div>

        <div className={styles.mobileCta}>
          <Button variant="primary" fullWidth onClick={() => { setMenuOpen(false); window.location.href = '/agendar'; }}>
            <CalendarPlus size={18} strokeWidth={1.5} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Agendar Cita
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
