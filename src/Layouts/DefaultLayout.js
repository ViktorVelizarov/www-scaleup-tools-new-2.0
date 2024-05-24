import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Consent from '@/components/Consent/Consent';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Consent/>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
