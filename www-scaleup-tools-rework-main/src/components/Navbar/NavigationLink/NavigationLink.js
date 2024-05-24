import Link from 'next/link';

const NavigationLink = ({ title, link, hoverColor }) => {
  return (
    <Link
      href={link}
      scroll={true}
      className={` ${hoverColor} hover:bg-black/[0.15] p-1 rounded-lg hover:ease-in-out duration-200`}
    >
      {title}
    </Link>
  );
};

export default NavigationLink;
