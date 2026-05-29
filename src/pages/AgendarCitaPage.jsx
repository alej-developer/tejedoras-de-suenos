import BookingSystem from '../components/booking/BookingSystem';
import SectionTitle from '../components/ui/SectionTitle';

const AgendarCitaPage = () => {
  return (
    <main style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)', paddingBottom: '4rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionTitle
          decorativeText="Tu bienestar comienza aquí"
          title="Agenda tu Cita"
          subtitle="Selecciona el servicio, fecha y hora que mejor se adapte a ti"
        />
        <BookingSystem />
      </div>
    </main>
  );
};

export default AgendarCitaPage;
