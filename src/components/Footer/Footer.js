import React from 'react';
import Link from 'next/link';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { TbMail } from 'react-icons/tb';

// Import translations
import enTranslations from '@/translations/en.json';
import skTranslations from '@/translations/sk.json';
import czTranslations from '@/translations/cz.json';

const translations = {
  en: enTranslations,
  sk: skTranslations,
  cz: czTranslations,
};

function Footer({ selectedLanguage }) {
  // Default to "en" if selectedLanguage is undefined
  const language = selectedLanguage || 'en';
  const t = (key) => translations[language][key] || key; // Translation function
  return (
    <div
      className={`bg-reverse-gradient-main 2xl:h-[24vh] text-white py-10`}
    >
      <div className="max-w-7xl m-[0_auto] px-8 flex flex-col sm:flex-row gap-10">
        <div className="w-full sm:w-1/2">
          <h3 className="text-sm font-bold pb-1">{t('footer_title')}</h3>
          <p>
          {t('footer_description')}
          </p>
        </div>

        <div className="w-[90%] sm:w-[45%] md:w-[18%] mb-5 md:mb-0">
          <h3 className="text-sm font-bold pb-1">{t('footer_locations_title')}</h3>
          <div className="flex flex-wrap justify-around font-bold w-full">
            <Link
              href="https://goo.gl/maps/XeSFr5DFbvQbfXC28"
              target="_blank"
              rel="noreferrer"
              className="block w-[30%] h-5 my-1"
            >
              <div className="w-full h-full flex justify-center items-center border-[.1rem] border-white rounded hover:text-white text-accent-orange bg-white hover:bg-accent-orange hover:cursor-pointer">
                LUX
              </div>
            </Link>
            <Link
              href="https://goo.gl/maps/Cnhu7dz4ULyXhHFX7"
              target="_blank"
              rel="noreferrer"
              className="block w-[30%] h-5 my-1"
            >
              <div className="w-full h-full flex justify-center items-center border-[.1rem] border-white rounded hover:text-white text-accent-orange bg-white hover:bg-accent-orange hover:cursor-pointer">
                PRG
              </div>
            </Link>
            <Link
              href="https://goo.gl/maps/Yr4yKT4obiHJHzua7"
              target="_blank"
              rel="noreferrer"
              className="block w-[30%] h-5 my-1"
            >
              <div className="w-full h-full flex justify-center items-center border-[.1rem] border-white rounded hover:text-white text-accent-orange bg-white hover:bg-accent-orange hover:cursor-pointer">
                WAW
              </div>
            </Link>
            <Link
              href="https://goo.gl/maps/xkH1SCRfhVoPNRTX9"
              target="_blank"
              rel="noreferrer"
              className="block w-[30%] h-5 my-1"
            >
              <div className="w-full h-full flex justify-center items-center border-[.1rem] border-white rounded hover:text-white text-accent-orange bg-white hover:bg-accent-orange hover:cursor-pointer">
                KSC
              </div>
            </Link>
            <Link
              href="https://goo.gl/maps/UtHvwqjYQMGKfKHFA"
              target="_blank"
              rel="noreferrer"
              className="block w-[30%] h-5 my-1"
            >
              <div className="w-full h-full flex justify-center items-center border-[.1rem] border-white rounded hover:text-white text-accent-orange bg-white hover:bg-accent-orange hover:cursor-pointer">
                BER
              </div>
            </Link>
            <Link
              href="https://goo.gl/maps/ykczBCjcoG1T8n8w8"
              target="_blank"
              rel="noreferrer"
              className="block w-[30%] h-5 my-1"
            >
              <div className="w-full h-full flex justify-center items-center border-[.1rem] border-white rounded hover:text-white text-accent-orange bg-white hover:bg-accent-orange hover:cursor-pointer">
                DXB
              </div>
            </Link>
          </div>
        </div>
        <div className="w-[90%] sm:w-[45%] md:w-[20%]">
          <h3 className="text-sm font-bold pb-1">{t('footer_contact_title')}</h3>
          <div class="flex w-full py-2">
            <Link
              href="https://www.linkedin.com/company/scaleupagency/"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 mr-2 sm:w-7 sm:h-7 sm:mr-1"
            >
              <div>
                <FaLinkedin className="text-white rounded hover:text-accent-orange hover:bg-white hover:cursor-pointer w-8 h-8 mr-2 sm:w-7 sm:h-7 sm:mr-1" />
              </div>
            </Link>
            <Link
              href="https://www.instagram.com/scaleupagency/"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 mr-2 sm:w-7 sm:h-7 sm:mr-1"
            >
              <div>
                <FaInstagramSquare className="text-white rounded hover:text-accent-orange hover:bg-white hover:cursor-pointer w-8 h-8 mr-2 sm:w-7 sm:h-7 sm:mr-1" />
              </div>
            </Link>
            <Link
              href="https://www.facebook.com/scaleupagency/"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 mr-2 sm:w-7 sm:h-7 sm:mr-1"
            >
              <div>
                <FaFacebookSquare className="text-white rounded hover:text-accent-orange hover:bg-white hover:cursor-pointer w-full h-full" />
              </div>
            </Link>
          </div>
          <Link href="mailto:info@scaleup.agency" className="py-0.5">
            <TbMail className="inline-block mr-1" size={15} />
            <span className="hover:text-secondary-section">
              info@scaleup.agency
            </span>
          </Link>
        </div>
      </div>
      <p className="text-center pt-7 px-10 md:px-7">
        SCALEUP. group © 2023 |{" "}
        <Link href="/privacy" className="hover:text-secondary-section">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link
          href="https://www.cookiesandyou.com/"
          className="hover:text-secondary-section"
        >
          Cookies Policy
        </Link>
      </p>
    </div>
  );
}

export default Footer;
