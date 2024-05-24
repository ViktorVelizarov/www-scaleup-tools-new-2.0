import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';

const Header = () => {
  return (
    <div
      id='home'
      className='bg-no-repeat bg-cover w-full bg-hero bg-[center] h-[480px] flex items-center'
    >
      <div className='max-w-7xl m-[0_auto] p-8 w-full'>
        <div className='flex flex-col items-left '>
          <h1 className='text-[2rem] sm:text-[4rem] text-white'>
            <strong>SCALEUP.TOOLS</strong>
          </h1>
          <div className='font-bold text-[1rem] text-white'>
            <p>Get advancement and automate your work with SCALEUP tools</p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="left-0 mr-[20px] mt-[30px] -bottom-40 sm:-bottom-32 md:-bottom-40 lg:-bottom-20 xl:-bottom-20 2xl:-bottom-20 gap-5 inline-block">
              <Link
                href={"#in-house-tools"}
                scroll={false}
                className="border-gray-5 text-gray-50 bg-transparent transition text-primary-blue text-md cursor-pointer border-2 rounded-md px-6 py-2 font-bold hover:text-accent-orange hover:bg-white ease-in duration-100"
              >
                EXPLORE OUR TOOLS
              </Link>
            </div>
            {/* <div className="left-0 mt-[30px] -bottom-40 sm:-bottom-32 md:-bottom-40 lg:-bottom-20 xl:-bottom-20 2xl:-bottom-20 gap-5 inline-block">
              <Link
                href={"#external-tools"}
                scroll={false}
                className="border-gray-5 text-gray-50 bg-transparent transition text-primary-blue text-md cursor-pointer border-2 rounded-md px-6 py-2 font-bold hover:text-accent-orange hover:bg-white ease-in duration-100"
              >
                Other cool tools
              </Link> */}
            </div>
          </div>
        </div>
      </div>
  );
};


export default Header;
