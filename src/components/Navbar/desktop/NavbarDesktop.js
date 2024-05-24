import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navigationLinks } from '../navbarConsts';
import NavigationLink from '../NavigationLink/NavigationLink';
import Image from 'next/image';

const NavbarDesktop = () => {
  const [bgColor, setBgColor] = useState();
  const [textColor, setTextColor] = useState();
  const [logoColor, setLogoColor] = useState();
  const [hoverColor, setHoverColor] = useState();
  const [padding, setPadding] = useState();

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
  }, []);

  return (
    <div
      className={`${bgColor} ${padding} hidden md:block ease-in duration-300 w-full fixed left-0 top-0 z-20`}
    >
      <div className=' px-8 max-w-7xl m-[0_auto]'>
        <div className='flex items-center justify-between '>
          <Link href={'/'}>
            <Image
              src={'/static/logo1.png'}
              alt='Scaleup logo'
              className={`${logoColor}`}
              width={150}
              height={5}
            />
          </Link>
          <div className={`flex gap-8 items-center font-bold ${textColor} `}>
            {navigationLinks.map((item) => (
              <NavigationLink
                hoverColor={hoverColor}
                key={item.title}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
