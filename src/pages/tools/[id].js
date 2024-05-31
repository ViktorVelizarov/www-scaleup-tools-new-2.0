import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AIToolsLayout from '@/Layouts/AIToolsLayout';
import { ClipLoader } from 'react-spinners';

const ToolDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the URL
  const [toolData, setToolData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch tool data based on the id
      const fetchToolData = async () => {
        try {
          const response = await fetch(`/api/getAItools/tool/${id}`); // Assuming this is your API endpoint to get a specific tool
          const data = await response.json();
          setToolData(data);
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

  // Assuming toolData contains logo, name, mainCategory, subCategory, and description
  const { logo, tool_name, main_category_name, sub_category_name, description } = toolData;

  return (
    <AIToolsLayout>
      <div className="container mx-auto py-12 px-6">
        <div className="flex items-center">
          <img src={logo} alt={tool_name} className="w-16 h-16 mr-4" />
          <div>
            <h1 className="text-3xl font-bold">{tool_name}</h1>
            <p className="text-xl">{main_category_name} - {sub_category_name}</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </AIToolsLayout>
  );
};

export default ToolDetailPage;
