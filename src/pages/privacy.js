import DefaultLayout from '@/Layouts/DefaultLayout';
import EditorData from '../../utils/models/opsModel';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
import Link from 'next/link';
import Head from 'next/head';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const getServerSideProps = async () => {
  try {
    console.log('FETCHING DOCUMENTS');
    const id = '6411cda3f3ea9bee29fa53cc';
    const showData = await EditorData.findById(id);
    console.log(showData);
    if (showData) {
      return {
        props: {
          showData: JSON.parse(JSON.stringify(showData)),
        },
      };
    } else {
      return {
        props: {
          showData: [],
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

const PrivacyPage = ({ showData }) => {
  return (
    <DefaultLayout>
      <Head>
        <title>SCALEUP.TOOLS | PRIVACY POLICY</title>
      </Head>
      <div
        id='top'
        className='py-[8vh] pt-[12vh] bg-hero bg-cover bg-[center] bg-no-repeat '
      >
        <div className='max-w-7xl m-[0_auto] p-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-5'>
            PRIVACY POLICY
          </h1>

          <Link href={'/'}>
            <button className='mt-5 text-sm md:text-lg rounded-lg p-3 font-bold border-[1px] ease-in duration-150 border-primary-blue text-white bg-primary hover:bg-white hover:text-primary'>
              BACK
            </button>
          </Link>
        </div>
      </div>

      <div className='max-w-7xl m-[0_auto] p-8 flex my-10 flex-col'>
        <div className='text-primary font-extrabold text-2xl sm:text-4xl mb-2'>
          CONSENT TO THE PROCESSING OF PERSONAL DATA PROVIDED VIA ELECTRONIC
          COMMUNICATION
        </div>
        <div className='px-4 text-lg mt-3'>
          By filling and submitting an electronic form on internet website{' '}
          <Link className='text-primary' href={'/'}>
            scaleup.tools
          </Link>
          , you as a person involved granted consent to the processing of your
          personal data.
        </div>
        <ReactQuill value={showData} readOnly={true} theme={'bubble'} />
        {/* <ReactQuill value={JSON.parse(showData.content)} readOnly={true} theme={'bubble'} /> */}
      </div>
    </DefaultLayout>
  );
};

export default PrivacyPage;
