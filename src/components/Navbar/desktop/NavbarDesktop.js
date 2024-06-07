// components/Navbar/desktop/NavbarDesktop.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageDropdown from '../LanguageDropdown'; // Adjust the import path as needed
import NavigationLink from '../NavigationLink/NavigationLink';



// Import translations
import enTranslations from '@/translations/en.json';
import skTranslations from '@/translations/sk.json';
import czTranslations from '@/translations/cz.json';

const translations = {
  en: enTranslations,
  sk: skTranslations,
  cz: czTranslations,
};

const NavbarDesktop = ({ selectedLanguage, setSelectedLanguage }) => {
  const [bgColor, setBgColor] = useState();
  const [textColor, setTextColor] = useState();
  const [logoColor, setLogoColor] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [padding, setPadding] = useState();
  const t = (key) => translations[selectedLanguage][key] || key; // Translation function

  const navigationLinks = [
    { title: t('navigation_home'), link: '/' },
    { title: t('navigation_ai_applications'), link: '/ai' },      
    { title: t('navigation_gpt_tools'), link: '/' },
    { title: t('navigation_ai_trends'), link: '/trends' },
    { title: t('navigation_events'), link: '/' },
    { title: t('navigation_contacts'), link: '/contact' },
  ];

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 100) {
        setBgColor('bg-white shadow-md');
        setTextColor('text-[#707070]');
        setLogoColor('fill-[#707070]');
        setHoverColor('hover:text-black');
        setPadding('py-4');
      } else {
        setBgColor('bg-transparent');
        setTextColor('text-white');
        setLogoColor('filter invert brightness-0');
        setHoverColor('hover:text-white');
        setPadding('py-8');
      }
    };
    changeColor();
    window.addEventListener('scroll', changeColor);

    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  return (
    <div
      className={`${bgColor} ${padding} hidden md:block ease-in duration-300 w-full fixed left-0 top-0 z-20`}
    >
      <div className='px-8 max-w-7xl m-[0_auto]'>
        <div className='flex items-center justify-between'>
          <Link href={'/'}>
            <Image
              src={'/static/logo1.png'}
              alt='Scaleup logo'
              className={`${logoColor}`}
              width={150}
              height={5}
            />
          </Link>
          <div className={`flex gap-8 items-center font-bold ${textColor}`}>
            {navigationLinks.map((item) => (
              <NavigationLink
                hoverColor={hoverColor}
                key={item.title}
                {...item}
              />
            ))}
            <LanguageDropdown value={selectedLanguage} onChange={handleLanguageChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
