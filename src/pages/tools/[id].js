import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AIToolsLayout from '@/Layouts/AIToolsLayout';
import { ClipLoader } from 'react-spinners';
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { GrTwitter } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";

const ToolDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the URL
  const [toolData, setToolData] = useState(null);
  const [similarTools, setSimilarTools] = useState([]);
  const [loading, setLoading] = useState(true);

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

          const logo = logoData ? logoData.company : '/default-logo.png'; // Default image if no match is found

          // Fetch the description
          const descriptionResponse = await fetch('/api/getSheetsData/getDescriptions');
          const descriptions = await descriptionResponse.json();
          const descriptionData = descriptions.find(desc => desc.tool_id === id);

          const description = descriptionData ? descriptionData.description : 'Description not available';

          // Combine the data
          setToolData({ ...tool, logo, description });

          // Fetch all tools for finding similar applications
          const allToolsResponse = await fetch('/api/getAItools/tools');
          const allTools = await allToolsResponse.json();

          // Filter similar tools
          const similarTools = allTools.filter(
            (t) => t.main_category_name === tool.main_category_name && t.sub_category_name === tool.sub_category_name && t.tool_id !== id
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
      <AIToolsLayout>
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      </AIToolsLayout>
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
    logo,
    tool_name,
    main_category_name,
    sub_category_name,
    description,
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
    <AIToolsLayout>
      <div className='bg-blue-200'>
        <div className="container mx-auto py-12 px-36 pt-28">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <img src={logo} alt={tool_name} className="w-16 h-16 mr-4" />
              <div>
                <h1 className="text-3xl font-bold">{tool_name}</h1>
                <div className="flex mt-1 space-x-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{main_category_name}</span>
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{sub_category_name}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <a href={url} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-4">
                Try Me
              </a>
              <div className="flex space-x-4">
                {facebook_url && (
                  <a href={facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <FaFacebook />
                    <span>Facebook</span>
                  </a>
                )}
                {instagram_url && (
                  <a href={instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <AiFillInstagram />
                    <span>Instagram</span>
                  </a>
                )}
                {linkedin_url && (
                  <a href={linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <BsLinkedin />
                    <span>LinkedIn</span>
                  </a>
                )}
                {tiktok_url && (
                  <a href={tiktok_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <i className="fab fa-tiktok text-black"></i>
                    <span>TikTok</span>
                  </a>
                )}
                {twitter_url && (
                  <a href={twitter_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <GrTwitter />
                    <span>Twitter</span>
                  </a>
                )}
                {youtube_url && (
                  <a href={youtube_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <IoLogoYoutube />
                    <span>YouTube</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex mb-8">
            <img src="https://images.genai.works/Screenshot_84_2776b067a5.jpg?width=600&height=600&quality=50" alt="Static"             className="w-1/3 h-auto object-cover rounded-lg" />
            <div className="ml-8">
              <div className="mb-4">
                <label className="block text-xl font-bold mb-2">Price</label>
                <span className="block text-lg">{Free_version ? 'Free' : 'Paid'}</span>
              </div>
              <div className="mb-4">
                <label className="block text-xl font-bold mb-2">Company</label>
                <span className="block text-lg">{company_name}</span>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About {tool_name}</h2>
            <p className="text-lg">{description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Similar Tools:</h2>
            <div className="flex space-x-4">
              {similarTools.map((tool) => (
                <div key={tool.tool_id} className="bg-white p-4 rounded-lg shadow-md w-1/3">
                  <img src="https://images.genai.works/Screenshot_84_2776b067a5.jpg?width=600&height=600&quality=50" alt={tool.tool_name} className="w-full h-32 object-cover mb-4 rounded-lg" />
                  <h3 className="text-xl font-bold mb-2">{tool.tool_name}</h3>
                  <div className="flex space-x-2">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{tool.main_category_name}</span>
                    <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{tool.sub_category_name}</span>
                  </div>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">Learn More</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AIToolsLayout>
  );
};

export default ToolDetailPage;

