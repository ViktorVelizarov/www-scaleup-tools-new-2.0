import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';

const ContactCard = ({ title, tag, bg, coworking, address1, address2, link }) => {
  return (
    <Link target={"_blank"} href={link}>
      <div className="rounded-xl shadow-lg hover:scale-105 ease-in-out duration-200">
        <div
          className={`${bg} bg-cover w-full h-[225px] p-5 flex pt-10 rounded-t-xl `}
        >
          <div className="flex flex-col ">
            <div className="text-white font-extrabold text-xl mb-2">
              {title}
            </div>
            <div className="text-white bg-accent-orange px-1 text-center  rounded-lg">
              {tag}
            </div>
          </div>
        </div>
        <div className="p-5 flex flex-col text-gray-500">
          <h2 className="font-bold">Address</h2>
          <div>{coworking}</div>
          <div>{address1}</div>
          <div>{address2}</div>
          <div className="flex justify-end">
            <BsThreeDots color="#fd6f0f" size={30} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContactCard;
