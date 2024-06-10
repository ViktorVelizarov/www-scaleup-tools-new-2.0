import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import NavigationLink from '../NavigationLink/NavigationLink';
import LanguageDropdown from '../LanguageDropdown'; // Adjust the import path as needed

// Import translations
import enTranslations from '@/translations/en.json';
import skTranslations from '@/translations/sk.json';
import czTranslations from '@/translations/cz.json';

const translations = {
  en: enTranslations,
  sk: skTranslations,
  cz: czTranslations,
};

const NavbarMobile = ({ selectedLanguage, setSelectedLanguage }) => {
  const language = selectedLanguage || 'en';

  const [nav, setNav] = useState(false);
  const [bgColor, setBgColor] = useState();
  const [textColor, setTextColor] = useState();
  const [logoColor, setLogoColor] = useState();

  const t = (key) => translations["en"][key] || key;

  const navigationLinks = [
    { title: t('navigation_home'), link: '/' },
    { title: t('navigation_ai_applications'), link: '/ai' },
    { title: t('navigation_gpt_tools'), link: '/' },
    { title: t('navigation_ai_trends'), link: '/trends' },
    { title: t('navigation_events'), link: '/' },
    { title: t('navigation_contacts'), link: '/contact' },
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 100) {
        setBgColor('bg-white shadow-md');
        setTextColor('text-[#707070]');
        setLogoColor('');
      } else {
        setBgColor('bg-transparent');
        setTextColor('text-white');
        setLogoColor('filter invert brightness-0');
      }
    };
    changeColor();
    window.addEventListener('scroll', changeColor);

    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className={`md:hidden fixed left-0 top-0 w-full z-20 ease-in duration-200 ${bgColor}`}>
      <div className={`max-w-7xl m-[0_auto] flex justify-between items-center px-7 py-4 font-bold ${textColor}`}>
        <Link href='/#'>
          <Image
            src={'/static/logo1.png'}
            alt='SCALEUP logo'
            className={`${logoColor}`}
            width={'150'}
            height={'100'}
          />
        </Link>

        {/* Language Dropdown and Mobile Button */}
        <div className='flex items-center'>
          <LanguageDropdown selectedLanguage={selectedLanguage} onChange={handleLanguageChange} />
          <div className='pl-3' onClick={handleNav}>
            {nav ? (
              <AiOutlineClose className='text-white' size={30} />
            ) : (
              <AiOutlineMenu className={`${textColor}`} size={30} />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={nav ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-[#fb923c] text-white text-center ease-in duration-300 overflow-auto' : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen text-center ease-in duration-300'}>
          <div className='font-bold text-3xl w-full flex flex-col gap-9' onClick={handleNav}>
            {navigationLinks.map((item) => (
              <NavigationLink key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
