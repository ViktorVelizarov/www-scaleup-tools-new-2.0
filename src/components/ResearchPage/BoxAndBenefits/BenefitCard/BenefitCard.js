import { RxDividerHorizontal } from 'react-icons/rx';

const BenefitCard = ({ src, title, desc }) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='text-accent-pink'>{src}</div>
      <div className='font-bold'>{title}</div>
      <div className='text-accent-pink -my-6'>
        <RxDividerHorizontal size={65} />
      </div>
      <p>{desc}</p>
    </div>
  );
};

export default BenefitCard;
