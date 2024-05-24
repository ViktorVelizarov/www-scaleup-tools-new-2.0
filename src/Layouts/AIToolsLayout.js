import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
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
