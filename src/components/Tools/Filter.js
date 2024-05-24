import { AiFillTags } from 'react-icons/ai';
import React, { useRef } from "react";
const AiFilter = ({
  textId,
  classNm,
  name,
  value,
  title,
  labelFor,
  filterHandler,
  borderColor,
  bgColor,
  textColor,
  filterTags
}) => {
  const checked = filterTags.includes(value) ? true : false;
  const inputRef = useRef();

  return (
    <div
      className={
        checked
          ? `border-2 rounded-lg text-white border-primary bg-primary tools-filter py-1 px-2`
          : `border-2 rounded-lg bg-white ${textColor} ${borderColor} hover:text-white ${bgColor} tools-filter  py-1 px-2`
      }
    >
      
      <input
        ref={inputRef}
        type="checkbox"
        id={textId}
        name={name}
        value={value}
        className={classNm}
        onChange={filterHandler}
      />
      <label
        id="category"
        className="label-for-check cursor-pointer flex items-center gap-2"
        htmlFor={labelFor}
      >
        <AiFillTags />
        {title}
      </label>
    </div>
  );
};

export default AiFilter;
