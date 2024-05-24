import DefaultLayout from '@/Layouts/DefaultLayout';
import Link from 'next/link';
import Form from '@/components/Form/Form';
import { contactCardInfo } from "@/components/ContactCard/cardConsts";
import ContactCard from "@/components/ContactCard/ContactCard";
import { useState } from 'react';
import Head from 'next/head';

const options = [
  { text: "-- select an option --", color: "text-[#707070]" },
  { text: "Free intro call", color: "" },
  { text: "Quick win", color: "" },
  { text: "Training day (group)", color: "" },
  { text: "Training day (individual)", color: "" },
  { text: "Other", color: "" },
];

const ContactPage = () => {
  const [selectedItem, setSelectedItem] = useState(options[0]);

  return (
    <DefaultLayout>
      <Head>
        <title>SCALEUP.tools | CONTACT</title>
      </Head>
      <div
        id="top"
        className="absolute py-[25] bg-contactUsHero bg-cover bg-no-repeat w-full lg:bg-[center_bottom_-15rem] xl:bg-[center_bottom_-30rem] min-h-[23rem] h-[50vh] max-h-[28rem]"
      ></div>
      <div className="absolute w-full min-h-[23rem] h-[50vh] max-h-[28rem] shadow-orange"></div>
      <div className="relative max-w-7xl m-[0_auto] min-h-[23rem] h-[50vh] max-h-[28rem] p-8">
        <h1 className="text-3xl sm:text-5xl mt-20 sm:mt-36 font-bold text-white mb-2">
          CONTACT
        </h1>
        <h5 className="text-white text-xl mb-8">
          Get in touch, schedule a chat and let's scale your business up.
        </h5>
        <Link
          href={"/"}
          scroll={false}
          className=" border-gray-50 text-white text-md  border-2 rounded-md px-6 py-2 font-bold hover:bg-gray-50 hover:text-primary transition ease-in duration-100"
        >
          BACK
        </Link>
      </div>
      <div className="max-w-7xl m-[0_auto] p-8 mb-10">
        <div className="inline-block my-10 text-4xl bg-clip-text bg-gradient-to-r from-accent-pink-transparent via-accent-orange-transparent to-primary-transparent text-transparent font-bold">
          WHERE WE CAN MEET
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {contactCardInfo.map((card) => (
            <ContactCard key={card.tag} {...card} />
          ))}
        </div>
      </div>
      <Form
        selectedItem={{ selectedItem, setSelectedItem }}
        options={options}
      />
    </DefaultLayout>
  );
};

export default ContactPage;
