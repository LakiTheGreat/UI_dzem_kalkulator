import Footer from './components/Footer';
import DesktopNav from './components/navigation/DesktopNav';
import MobileNav from './components/navigation/MobileNav';
import useResponsive from './hooks/useResponsive';

function App() {
  const isMobile = useResponsive('down', 'sm');

  return (
    <>
      {isMobile ? <MobileNav /> : <DesktopNav />}
      <Footer />
    </>
  );
}

export default App;
