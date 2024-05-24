const Box = ({ color, firstH2, secondH2, firstPar, secondPar }) => {
  return (
    <div
      className={`rounded-lg ${color} px-6 sm:px-4 lg:px-0 py-6 mb-10 shadow-lg`}
    >
      <div className='flex flex-col sm:flex-row text-white justify-around leading-7'>
        <div className='sm:max-w-[50%]'>
          <h2 className='font-bold text-xl sm:text-3xl mb-3'>{firstH2}</h2>
          <p>{firstPar}</p>
        </div>
        <div>
          <h2 className='font-bold text-xl sm:text-3xl mb-3 sm:-ml-4'>
            {secondH2}
          </h2>
          <ol className='list-decimal ml-4 sm:ml-0'>
            {secondPar.map((li) => (
              <li>{li}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Box;
