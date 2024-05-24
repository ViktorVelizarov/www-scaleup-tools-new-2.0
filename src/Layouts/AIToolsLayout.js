import Navbar from '@/components/Navbar2/Navbar';
import Footer from '@/components/Footer2/Footer';
import Consent from '@/components/Consent/Consent';


const AIToolsLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Consent/>
      <Footer />
    </div>
  );
};

export default AIToolsLayout;
