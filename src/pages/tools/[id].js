import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AIToolsLayout from '@/Layouts/AIToolsLayout';
import { ClipLoader } from 'react-spinners';
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { GrTwitter } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

// Import translations
import enTranslations from '@/translations/en.json';
import skTranslations from '@/translations/sk.json';
import czTranslations from '@/translations/cz.json';

const translations = {
  en: enTranslations,
  sk: skTranslations,
  cz: czTranslations,
};

const ToolDetailPage = ({ selectedLanguage }) => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the URL
  const [toolData, setToolData] = useState(null);
  const [similarTools, setSimilarTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = (key) => translations[selectedLanguage]?.[key] || key; // Translation function

  useEffect(() => {
    if (id) {
      // Fetch tool data based on the id
      const fetchToolData = async () => {
        try {
          // Fetch the tool details
          const toolResponse = await fetch(`/api/getAItools/tool/${id}`);
          const tool = await toolResponse.json();
          // Fetch the logo
          const logoResponse = await fetch('/api/getSheetsData/getLogos');
          const logos = await logoResponse.json();
          
          const logoData = logos.find(sheet => sheet.logoLink === id);

          const logo = logoData ? logoData.company : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'; // Default image if no match is found

          const toolDesc = tool.data.tool_desc || "Description not available";

          // Combine the data
          setToolData({ ...tool.data, logo, tool_desc: toolDesc});

          // Fetch all tools for finding similar applications
          const allToolsResponse = await fetch('/api/getAItools/tools');
          const allTools = await allToolsResponse.json();

          // Filter similar tools
          const similarTools = allTools.filter(
            (t) => t.main_category_name === tool.data.main_category_name && t.sub_category_name === tool.data.sub_category_name && t.tool_id !== id
          ).slice(0, 3);

          setSimilarTools(similarTools);
        } catch (error) {
          console.error('Error fetching tool data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchToolData();
    }
  }, [id]);

  if (loading) {
    return (
      
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
     
    );
  }

  if (!toolData) {
    return (
      <AIToolsLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Tool not found.</p>
        </div>
      </AIToolsLayout>
    );
  }

  // Destructure the tool data
  const {
    poster_url,
    logo,
    tool_name,
    main_category_name,
    sub_category_name,
    tool_desc,
    url,
    Free_version,
    company_name,
    facebook_url,
    instagram_url,
    linkedin_url,
    tiktok_url,
    twitter_url,
    youtube_url
  } = toolData;

  return (
    <>
      <div className='bg-blue-200'>
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-32 pt-28">
          <div className="flex items-center mb-8">
            <a href="/ai" className="text-blue-500 hover:underline">
              <span className="hidden sm:inline font-semibold mr-3">{t('ai_tools')}</span>
              <div className='flex flex-row'>
              <span className="sm:hidden font-semibold mr-2 mt-1"><FaArrowLeft/></span>
              <span className="sm:hidden font-semibold"> Back</span>
              </div>
            </a>
            <span className="hidden sm:inline font-semibold mr-3 "><FaArrowRight /></span>
            <span className="hidden sm:inline font-semibold ">  {tool_name}</span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-8">

            <div className="flex  flex-row  items-center lg:mb-0 mb-4 w-full">
              <img src={logo} alt={tool_name} className="w-16 h-16 mr-4" />
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">{tool_name}</h1>
                <div className="flex mt-1 space-x-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{main_category_name}</span>
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{sub_category_name}</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-auto">
              <a href={url} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white w-full lg:w-max block text-center px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-4">
              {t('try_me')}
              </a>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row mb-8">
            <img src={poster_url || "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png"} alt="Static" className="w-full lg:w-1/3 h-auto object-cover rounded-lg mb-4 lg:mb-0" />
            <div className="lg:ml-8 flex-grow">
              <div className="mb-4 flex flex-col lg:flex-col">
                <div className="flex-1">
                  <label className="block text-xl font-bold mb-1">{t('price')}</label>
                  <span className="block text-lg">{Free_version ? 'Free' : 'Paid'}</span>
                </div>
                <div className="flex-1 mt-4 lg:mt-0">
                  <label className="block text-xl font-bold mb-1 lg:mt-6">{t('company')}</label>
                  <span className="block text-lg">{company_name}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap space-x-2 lg:space-x-0 mt-4 lg:mt-0 lg:flex-col">
              {facebook_url && (
                <div className="mb-2 lg:mb-0">
                  <a href={facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <FaFacebook />
                    <span className="hidden sm:inline">Facebook</span>
                  </a>
                </div>
              )}
              {instagram_url && (
                <div className="mb-2 lg:mb-0">
                  <a href={instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <AiFillInstagram />
                    <span className="hidden sm:inline">Instagram</span>
                  </a>
                </div>
              )}
              {linkedin_url && (
                <div className="mb-2 lg:mb-0">
                  <a href={linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <BsLinkedin />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                </div>
              )}
              {tiktok_url && (
                <div className="mb-2 lg:mb-0">
                  <a href={tiktok_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <FaTiktok />
                    <span className="hidden sm:inline">TikTok</span>
                  </a>
                </div>
              )}
              {twitter_url && (
                <div className="mb-2 lg:mb-0">
                  <a href={twitter_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <GrTwitter />
                    <span className="hidden sm:inline">Twitter</span>
                  </a>
                </div>
              )}
              {youtube_url && (
                <div className="mb-2 lg:mb-0">
                  <a href={youtube_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <IoLogoYoutube /> 
                    <span className="hidden sm:inline">YouTube</span>
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t('about')} {tool_name}</h2>
            <p className="text-lg" dangerouslySetInnerHTML={{ __html: tool_desc }}></p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{t('similar_tools')}:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarTools.map((tool) => (
                <div key={tool.tool_id} className="bg-white p-4 rounded-lg shadow-md">
                  <a href={tool.tool_id}>
                    <img src={tool.poster_url || "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png"} alt={tool.tool_name} className="w-full h-44 object-cover mb-4 rounded-lg" />
                    <h3 className="text-xl font-bold mb-2">{tool.tool_name}</h3>
                    <div className="flex space-x-2">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{tool.main_category_name}</span>
                      <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{tool.sub_category_name}</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolDetailPage;