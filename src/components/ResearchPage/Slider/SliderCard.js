import { RxDividerHorizontal } from 'react-icons/rx';

const SliderCard = ({ title, topic, desc, img }) => {
  return (
    <div className=' bg-white p-5 flex flex-col sm:flex-row gap-5 min-h-[68vh] sm:min-h-[45vh]  lg:min-h-[37vh] xl:min-h-[30vh]'>
      <div className='flex flex-col max-w-[50%]'>
        <div className='font-bold text-accent-pink text-xl'>{title}</div>
        <div className=''>{topic}</div>
        <div className='text-accent-pink -my-6 sm:-my-7 -ml-2'>
          <RxDividerHorizontal size={65} />
        </div>
        <div className='mt-1 hidden sm:block'>{desc}</div>
      </div>
      <div className='sm:ml-10'>
        <img className='sm:max-h-[250px]' src={img} />
      </div>
    </div>
  );
};

export default SliderCard;
