import React, { useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";

const LanguageDropdown = ({ selectedLanguage, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (e) => {
    onChange(e.target.value);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={handleDropdownToggle}
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            {/* Display selected language name or icon here */}
            {selectedLanguage === 'en' && (
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png"
                alt="English"
                className="w-6 h-4 mr-2"
              />
            )}
            {selectedLanguage === 'sk' && (
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png"
                alt="Slovak"
                className="w-6 h-4 mr-2"
              />
            )}
            {selectedLanguage === 'cz' && (
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png"
                alt="Czech"
                className="w-6 h-4 mr-2"
              />
            )}
            {selectedLanguage === 'en' ? 'English' : selectedLanguage === 'sk' ? 'Slovak' : 'Czech'}
            
            <MdKeyboardArrowDown className="-mr-1 ml-2 h-5 w-5"/>
          </button>
        </div>
        {isOpen && (
          <div className="absolute left-0 mt-1 w-full rounded-md bg-white shadow-lg z-10">
            <button
              onClick={() => handleLanguageChange({ target: { value: 'en' } })}
              className=" text-left w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 flex flex-row"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png"
                alt="English"
                className="w-6 h-4 mr-2"
              />
              English
            </button>
            <button
              onClick={() => handleLanguageChange({ target: { value: 'sk' } })}
              className=" text-left w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 flex flex-row"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/1200px-Flag_of_Slovakia.svg.png"
                alt="Slovak"
                className="w-6 h-4 mr-2"
              />
              Slovak
            </button>
            <button
              onClick={() => handleLanguageChange({ target: { value: 'cz' } })}
              className=" text-left w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 flex flex-row"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/1200px-Flag_of_the_Czech_Republic.svg.png"
                alt="Czech"
                className="w-6 h-4 mr-2"
              />
              Czech
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageDropdown;
