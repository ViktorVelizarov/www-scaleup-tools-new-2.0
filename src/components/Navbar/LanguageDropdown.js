import React from 'react';

const LanguageDropdown = ({ value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="text-black">
      <option value="en">English</option>
      <option value="sk">Slovak</option>
      <option value="cz">Czech</option>
    </select>
  );
};

export default LanguageDropdown;
