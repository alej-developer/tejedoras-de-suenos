import { useState } from 'react';
import { CheckCircle2, MessageCircle, Camera, Calendar, CalendarPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import servicios from '../../data/servicios';
import styles from './Contacto.module.css';

const Contacto = () => {
  const sectionRef = useScrollAnimation();
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '', email: '', servicio: '', mensaje: ''
  });

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '573001234567';
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/tejedorasdesuenos1';

  const handleSubmit = (e) => {
    e.preventDefault();
    // En MVP: abrir WhatsApp con el mensaje
    const msg = `Hola Diana\n\nMi nombre es ${formData.nombre}.\n${formData.servicio ? `Me interesa: ${formData.servicio}\n` : ''}${formData.mensaje ? `\nMensaje: ${formData.mensaje}` : ''}\n\nMi email: ${formData.email}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <section className={styles.section} id="contacto" ref={sectionRef}>
      <SectionTitle
        decorativeText="Hablemos"
        title="Contacto"
        subtitle="Estoy aquí para acompañarte. Escríbeme y conversemos"
      />

      <div className={styles.container}>
        <div className={`${styles.formCard} animate-on-scroll`}>
          {sent ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}><CheckCircle2 size={48} strokeWidth={1.5} /></div>
              <h3 className={styles.formTitle}>¡Mensaje enviado!</h3>
              <p className={styles.successText}>
                Gracias por escribirme. Te responderé lo antes posible.
              </p>
              <Button variant="outline" onClick={() => setSent(false)} style={{ marginTop: '1rem' }}>
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <>
              <h3 className={styles.formTitle}>Envíame un mensaje</h3>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="contact-nombre">Nombre</label>
                  <input
                    id="contact-nombre"
                    className={styles.input}
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    className={styles.input}
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="tu@email.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="contact-servicio">¿Qué te interesa?</label>
                  <select
                    id="contact-servicio"
                    className={styles.select}
                    value={formData.servicio}
                    onChange={(e) => setFormData({...formData, servicio: e.target.value})}
                  >
                    <option value="">Selecciona un servicio (opcional)</option>
                    {servicios.map(s => (
                      <option key={s.id} value={s.nombre}>{s.nombre}</option>
                    ))}
                    <option value="Productos">Productos / Tienda</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="contact-mensaje">Mensaje</label>
                  <textarea
                    id="contact-mensaje"
                    className={styles.textarea}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    placeholder="Cuéntame cómo puedo ayudarte..."
                  />
                </div>
                <Button type="submit" variant="primary" fullWidth>
                  <MessageCircle size={18} strokeWidth={1.5} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Enviar por WhatsApp
                </Button>
              </form>
            </>
          )}
        </div>

        <div className={`${styles.infoSide} animate-on-scroll delay-2`}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}><MessageCircle size={32} strokeWidth={1.5} /></div>
            <h3 className={styles.infoTitle}>WhatsApp Directo</h3>
            <p className={styles.infoText}>
              Escríbeme directamente y conversemos sobre cómo puedo acompañarte.
            </p>
            <Button
              variant="whatsapp"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola Diana, me gustaría saber más sobre tus servicios')}`}
              target="_blank"
            >
              Abrir WhatsApp
            </Button>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}><Camera size={32} strokeWidth={1.5} /></div>
            <h3 className={styles.infoTitle}>Instagram</h3>
            <p className={styles.infoText}>
              Sígueme para contenido diario de bienestar y espiritualidad.
            </p>
            <Button variant="outline" href={instagramUrl} target="_blank">
              @tejedorasdesuenos1
            </Button>
          </div>

          <div className={styles.agendarCard}>
            <div className={styles.infoIcon}><Calendar size={32} strokeWidth={1.5} /></div>
            <h3 className={styles.infoTitle}>Agenda tu Cita</h3>
            <p className={styles.agendarText}>
              Elige el servicio, fecha y hora que más te convenga.
            </p>
            <Link to="/agendar">
              <Button variant="primary" size="lg">
                <CalendarPlus size={18} strokeWidth={1.5} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Ir al sistema de citas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
