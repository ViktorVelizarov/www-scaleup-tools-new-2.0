import { Collapse } from 'react-collapse';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const CollapseCard = ({ src, title, par, handleOpen, open }) => {
  return (
    <div
      onClick={handleOpen}
      className={
        open === true
          ? 'hover:cursor-pointer  bg-white rounded-lg p-5 sm:w-[250px] transition-all ease-out duration-300 shadow-lg'
          : 'hover:cursor-pointer  bg-primary hover:bg-white rounded-lg p-5 sm:w-[250px] transition-all ease-out duration-300 shadow-lg'
      }
    >
      <div
        className={
          open === true ? 'text-primary' : 'text-white hover:text-primary'
        }
      >
        <div className='mb-5'>{src}</div>
        <div className='font-bold text-xl'>{title}</div>
        <div className='flex justify-end '>
          {open === true ? (
            <MdKeyboardArrowUp size={30} />
          ) : (
            <MdKeyboardArrowDown size={30} />
          )}
        </div>
      </div>
      <Collapse isOpened={open}>
        <p>{par}</p>
      </Collapse>
    </div>
  );
};

export default CollapseCard;
