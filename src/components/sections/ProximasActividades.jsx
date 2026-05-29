import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import actividades from '../../data/actividades';
import { formatFechaLarga, esFechaPasada } from '../../utils/formatDate';
import styles from './ProximasActividades.module.css';

const badgeMap = {
  abierto: { text: '¡Inscríbete!', class: styles.badgeAbierto },
  proximamente: { text: 'Próximamente', class: styles.badgeProximamente },
  finalizado: { text: 'Finalizado', class: styles.badgeFinalizado },
};

const ProximasActividades = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="actividades" ref={sectionRef}>
      <SectionTitle
        decorativeText="Únete"
        title="Próximas Actividades"
        subtitle="Talleres, círculos y encuentros para conectar y transformar"
      />

      <div className={styles.timeline}>
        {actividades.map((act, index) => {
          const pasada = esFechaPasada(act.fecha);
          const estado = pasada ? 'finalizado' : act.estado;
          const badge = badgeMap[estado];

          return (
            <div
              key={act.id}
              className={`${styles.item} animate-on-scroll delay-${index + 1}`}
            >
              <div className={`${styles.dot} ${estado === 'proximamente' ? styles.dotProximamente : ''}`} />
              <div className={styles.card}>
                <div className={styles.header}>
                  <span className={styles.fecha}>
                    📅 {formatFechaLarga(act.fecha)} — {act.hora}
                  </span>
                  <span className={`${styles.badge} ${badge.class}`}>
                    {badge.text}
                  </span>
                </div>
                <h3 className={styles.titulo}>{act.titulo}</h3>
                <p className={styles.descripcion}>{act.descripcion}</p>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>📍 {act.lugar}</span>
                  <span className={styles.metaItem}>🖥️ {act.modalidad}</span>
                  <span className={styles.metaItem}>💰 {act.precio}</span>
                </div>
                {!pasada && act.cuposDisponibles > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span className={styles.cupos}>
                      🎫 {act.cuposDisponibles} cupos disponibles
                    </span>
                    <Button variant="primary" size="sm">
                      Inscribirme ✨
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProximasActividades;
