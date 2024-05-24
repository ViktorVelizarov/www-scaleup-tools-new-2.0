

const Card = ({desc, src}) => {
  return (
      <div className="bg-cover w-full p-5 flex pt-10 shadow-xl border-[1px] rounded-xl hover:scale-105 ease-in-out duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-[200px] h-[50px]">
            <img className="w-full h-full object-contain" src= {src} alt="Poster" />
          </div>
          <div className="text-black text-base px-2 mt-[30px] mb-2">
            {desc}
          </div>
        </div>
      </div>
  );
};

export default Card;