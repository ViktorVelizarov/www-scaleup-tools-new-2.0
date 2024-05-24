"use client"

import React from 'react';
import { TiSocialLinkedin } from "react-icons/ti";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {

  const handleClick = (url) => {
    window.location.href = url;
  };
  
  return (
    <footer className="bg-gray-800 text-white py-12 p-16">
      <div className="container mx-auto px-10">
        <div className="flex flex-wrap justify-between mb-8 space-y-4 md:space-y-0">
          {/* About Scaleup */}
          <div className="w-full md:w-2/5 mb-8 md:mb-0 ">
            <h2 className="text-lg font-semibold mb-2">About Scaleup:</h2>
            <p className="text-sm">
              SCALEUP. helps to grow you while implementing a modern tech and processes into your HR, Sales, Data Analytics and Automation. We are an international team, fluent in 10+ languages, specialists in more than 100 cloud-based and AI tools, with strong local knowledge and presence. Let’s scale-up together!
            </p>
          </div>

          {/* Addresses */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0  ">
            <h2 className="text-lg font-semibold mb-2">Addresses:</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 md:px-4 rounded-lg text-sm w-full md:w-auto" 
              onClick={() => handleClick('https://www.google.com/maps/place/29+Bd+Grande-Duchesse+Charlotte,+1331+Belair+Luxembourg,+%D0%9B%D1%8E%D0%BA%D1%81%D0%B5%D0%BC%D0%B1%D1%83%D1%80%D0%B3/@49.6083279,6.1196381,17z/data=!3m1!4b1!4m6!3m5!1s0x4795492a51687487:0x346e7f6e5a0bd70b!8m2!3d49.6083279!4d6.1196381!16s%2Fg%2F11fx7fztmw?entry=ttu')}
            >
              LUX
            </button>
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 md:px-4 rounded-lg text-sm w-full md:w-auto" 
              onClick={() => handleClick('https://www.google.com/maps/place/Drtinova+557,+150+00+Praha+5-Sm%C3%ADchov,+Czechia/@50.0763908,14.4022735,17z/data=!3m1!4b1!4m6!3m5!1s0x470b94fecbdced4b:0x6a60d8e2418cf55f!8m2!3d50.0763908!4d14.4022735!16s%2Fg%2F11c21zkz05?coh=164777&entry=tt&shorturl=1')}
            >
              PRG
            </button>
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 md:px-4 rounded-lg text-sm w-full md:w-auto" 
              onClick={() => handleClick('https://www.google.com/maps/place/Plac+Konesera+10,+03-736+Warszawa,+Poland/@52.2561467,21.0453205,17z/data=!3m1!4b1!4m6!3m5!1s0x471ecc382c99e04b:0x3e88640b5694ab88!8m2!3d52.2561467!4d21.0453205!16s%2Fg%2F11gmfqwtr9?coh=164777&entry=tt&shorturl=1')}
            >
              WAW
            </button>
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 md:px-4 rounded-lg text-sm w-full md:w-auto" 
              onClick={() => handleClick('https://www.google.com/maps/place/Ko%C5%A1ice/@48.6964272,21.1937943,12.5z/data=!4m6!3m5!1s0x473ee01b67c6957b:0x400f7d1c6978bd0!8m2!3d48.7163857!4d21.2610746!16zL20vMDF0NGhq?entry=tts')}
            >
              KSC
            </button>
              
            </div>
          </div>

          {/* Contact */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Contact:</h2>
            <div className="flex gap-2">
              <TiSocialLinkedin className="text-3xl text-white hover:text-blue-500 cursor-pointer"  onClick={() => handleClick('https://www.linkedin.com/company/scaleupagency/')}/>
              <FaFacebook className="text-3xl text-white hover:text-blue-500 cursor-pointer" onClick={() => handleClick('https://www.facebook.com/scaleupagency/')}/>
              <FaInstagram className="text-3xl text-white hover:text-blue-500 cursor-pointer" onClick={() => handleClick('https://www.instagram.com/scaleupagency/')}/>
              <FaWhatsapp className="text-3xl text-white hover:text-blue-500 cursor-pointer" onClick={() => handleClick('https://api.whatsapp.com/send?phone=421948942804')}/>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center text-sm mt-8">
          SCALEUP. group © 2024 | <a href="#" className="text-blue-300">Privacy Policy</a> | <a href="#" className="text-blue-300">Cookies Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
