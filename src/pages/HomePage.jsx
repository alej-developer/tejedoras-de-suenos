import Hero from '../components/sections/Hero';
import SobreMi from '../components/sections/SobreMi';
import Servicios from '../components/sections/Servicios';
import Testimonios from '../components/sections/Testimonios';
import Galeria from '../components/sections/Galeria';
import ProximasActividades from '../components/sections/ProximasActividades';
import CatalogoPreview from '../components/sections/CatalogoPreview';
import Contacto from '../components/sections/Contacto';
import SectionDivider from '../components/layout/SectionDivider';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <SectionDivider fromColor="#3D2C2E" toColor="#FFF8F0" />
      <SobreMi />
      <SectionDivider fromColor="#FFF8F0" toColor="#F5EDE4" />
      <Servicios />
      <SectionDivider fromColor="#F5EDE4" toColor="#FFF8F0" />
      <Testimonios />
      <SectionDivider fromColor="#FFF8F0" toColor="#F5EDE4" />
      <Galeria />
      <SectionDivider fromColor="#F5EDE4" toColor="#FFF8F0" />
      <ProximasActividades />
      <SectionDivider fromColor="#FFF8F0" toColor="#F5EDE4" />
      <CatalogoPreview />
      <SectionDivider fromColor="#F5EDE4" toColor="#FFF8F0" />
      <Contacto />
    </main>
  );
};

export default HomePage;
