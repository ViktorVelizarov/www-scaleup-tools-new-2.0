import BenefitCard from './BenefitCard/BenefitCard';
import Box from './Box/Box';

const BoxAndBenefits = ({ researchBenefitInfo, researchBoxInfo }) => {
  return (
    <>
      <Box {...researchBoxInfo} />
      <div className='text-accent-pink font-bold text-3xl mb-7'>
        KEY BENEFITS
      </div>
      <div className='flex flex-col sm:flex-row gap-5 text-center'>
        {researchBenefitInfo.map((card) => (
          <BenefitCard key={card.title} {...card} />
        ))}
      </div>
    </>
  );
};

export default BoxAndBenefits;
