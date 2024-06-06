// components/Navbar/Navbar.js
import NavbarDesktop from './desktop/NavbarDesktop';
import NavbarMobile from './mobile/NavbarMobile';

const Navbar = ({ selectedLanguage, setSelectedLanguage }) => {
  return (
    <>
      <NavbarDesktop selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      <NavbarMobile selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
    </>
  );
};

export default Navbar;
