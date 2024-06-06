// layouts/DefaultLayout.js
import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Consent from '@/components/Consent/Consent';

const DefaultLayout = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language state

  return (
    <div>
      <Navbar selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      {React.cloneElement(children, { selectedLanguage })} {/* Pass selectedLanguage to children */}
      <Consent />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
