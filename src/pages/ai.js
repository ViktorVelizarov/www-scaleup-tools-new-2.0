import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AIToolsLayout from '@/Layouts/AIToolsLayout';
import { ClipLoader } from 'react-spinners';
import { IoIosRefresh } from "react-icons/io";
import Head from 'next/head';
import { Checkbox } from "@/components/ui/checkbox";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function ToolCard({ imgSrc, title, description, pricing, mainCategory, subCategory }) {
  // Ensure description is not too long
  const truncatedDescription = description ? description.split('. ')[0] : 'Description not available';

  return (
    <article className="flex flex-col px-4 pt-4 pb-8 mt-5 w-full bg-white rounded-xl max-md:pr-5 h-64">
      <div className="flex gap-5 justify-between w-full">
        <div className="flex gap-5 justify-between text-xl font-bold">
          <img loading="lazy" src={imgSrc} alt={title} className="shrink-0 aspect-[1.09] w-[51px]" />
          <div className="my-auto">{title}</div>
        </div>
        {pricing && <div className="self-start mt-2.5 text-base font-extralight text-center">{pricing}</div>}
      </div>
      <div className="flex mt-1 space-x-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{mainCategory}</span>
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{subCategory}</span>
                </div>
      <div className="mt-6 text-base font-extralight overflow-hidden overflow-ellipsis">
        {truncatedDescription}
      </div>
    </article>
  );
}

const ContactPage = () => {
    const [toolData, setToolData] = useState([]);
    const [sheetsData, setSheetsData] = useState([]);
    const [toolDescriptions, setToolDescriptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedMainCategories, setSelectedMainCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const toolsPerPage = 12;
    const [pageWindow, setPageWindow] = useState([1, 5]);

    useEffect(() => {
      const fetchSheetsData = async () => {
        try {
          const response = await fetch('/api/getSheetsData/getLogos');
          const data = await response.json();
          setSheetsData(data);
        } catch (error) {
          console.error('Error fetching data from Google Sheets:', error);
        }
      };

      const fetchToolData = async () => {
        try {
          const response = await fetch('/api/getAItools/tools');
          const data = await response.json();
          setToolData(data);
        } catch (error) {
          console.error('Error fetching tool data:', error);
        }
      };

      const fetchToolDescriptions = async () => {
        try {
          const response = await fetch('/api/getSheetsData/getDescriptions');
          const data = await response.json();
          console.log("desc")
          console.log(data)
          setToolDescriptions(data);
        } catch (error) {
          console.error('Error fetching tool descriptions:', error);
        } finally {
          setLoading(false);
        }
      };

      const fetchCategories = async () => {
        try {
          const response = await fetch('/api/getAItools/categories');
          const data = await response.json();
      
          // Remove duplicates from categories based on main_category_name and sub_category_name
          const uniqueCategories = [];
          const map = new Map();
          for (const category of data) {
            if (!map.has(category.main_category_name) && !map.has(category.sub_category_name)) {
              map.set(category.main_category_name, true);
              map.set(category.sub_category_name, true);
              uniqueCategories.push(category);
            }
          }
      
          setCategories(uniqueCategories);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      fetchSheetsData();
      fetchToolData();
      fetchToolDescriptions();
      fetchCategories();
    }, []);

    const handleCheckboxChange = (value, type) => {
      if (type === 'main') {
        if (selectedMainCategories.includes(value)) {
          setSelectedMainCategories(selectedMainCategories.filter(cat => cat !== value));
        } else {
          setSelectedMainCategories([...selectedMainCategories, value]);
        }
        setSelectedSubCategories([]); // Clear subcategory filter when main category changes
        setCurrentPage(1);
      } else if (type === 'sub') {
        if (selectedSubCategories.includes(value)) {
          setSelectedSubCategories(selectedSubCategories.filter(cat => cat !== value));
        } else {
          setSelectedSubCategories([...selectedSubCategories, value]);
        }
        setCurrentPage(1);
      } else if (type === 'price') {
        setSelectedFilter(value);
        setCurrentPage(1);
      }
    };

    const handleResetFilters = () => {
      setSelectedMainCategories([]);
      setSelectedSubCategories([]);
      setSelectedFilter(null);
      setCurrentPage(1);
    };

    const filteredTools = toolData.filter(tool => {
      const mainCategoryMatch = selectedMainCategories.length === 0 || selectedMainCategories.includes(tool.main_category_name);
      const subCategoryMatch = selectedSubCategories.length === 0 || selectedSubCategories.includes(tool.sub_category_name);
      const priceMatch = !selectedFilter || (selectedFilter === 'free' && tool.Free_version) || (selectedFilter === 'paid' && tool.Paid_version);
      return mainCategoryMatch && subCategoryMatch && priceMatch;
    });

    const totalPages = Math.ceil(filteredTools.length / toolsPerPage);
    const indexOfLastTool = currentPage * toolsPerPage;
    const indexOfFirstTool = indexOfLastTool - toolsPerPage;
    const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);

      const windowSize = 5;
      let newPageWindow;
      if (pageNumber <= Math.ceil(windowSize / 2)) {
        newPageWindow = [1, windowSize];
      } else if (pageNumber + Math.floor(windowSize / 2) >= totalPages) {
        newPageWindow = [totalPages - windowSize + 1, totalPages];
      } else {
        newPageWindow = [pageNumber - Math.floor(windowSize / 2), pageNumber + Math.floor(windowSize / 2)];
      }
      setPageWindow(newPageWindow);
    };

    // Count the number of tools in each main category and subcategory
    const mainCategoryCounts = {};
    const subCategoryCounts = {};

    toolData.forEach(tool => {
      if (mainCategoryCounts[tool.main_category_name]) {
        mainCategoryCounts[tool.main_category_name]++;
      } else {
        mainCategoryCounts[tool.main_category_name] = 1;
      }

      if (subCategoryCounts[tool.sub_category_name]) {
        subCategoryCounts[tool.sub_category_name]++;
      } else {
        subCategoryCounts[tool.sub_category_name] = 1;
      }
    });

    return (
      <AIToolsLayout>
        <div className="flex flex-col min-h-screen bg-blue-200">
          <header className="flex flex-col justify-between items-center px-16 py-8 bg-gray-300 relative" style={{ backgroundImage: 'url("https://i.pinimg.com/originals/32/b8/77/32b877ed4aa7778cc7d43ebb7d95a6f1.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <h1 className="text-5xl font-bold text-center text-black max-md:max-w-full max-md:text-4xl mt-32">Find AI tools for all types of use cases</h1>
                    <form className="flex justify-center items-start px-3.5 py-4 mt-16 max-w-full text-2xl font-extralight text-black bg-white rounded-xl border border-black border-solid shadow-sm w-[750px] max-md:pr-5 max-md:mt-10">
                    <label className="sr-only" htmlFor="toolInput">Enter a tool name</label>
                    <input className="w-full bg-transparent border-none outline-none" type="text" id="toolInput" placeholder="Enter a tool name...." aria-label="Enter a tool name...." />
                    </form>
          </header>
<div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 relative bg-blue-200 ml-16">
        <div className="md:col-span-1 pt-14 pl-14">
          <div className="self-start ">
            <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">Filters</h2>
              <button onClick={handleResetFilters} className="bg-blue-400 text-black px-1 py-1 rounded-lg">
                <IoIosRefresh />
              </button>
            </div>

              <Accordion type="multiple" collapsible defaultValue={["item-1" , "item-2", "item-3"]}>
              <AccordionItem value="item-1">
              <AccordionTrigger><h1 className='font-semibold'>Category</h1></AccordionTrigger>
              <AccordionContent>
                {categories.map(category => (
                  <div className="flex items-center justify-between space-x-2" key={category.main_category_name}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        className="w-6 h-6 border-blue-500 border-2 m-1"
                        value={category.main_category_name}
                        onCheckedChange={(checked) => handleCheckboxChange(category.main_category_name, 'main')}
                        checked={selectedMainCategories.includes(category.main_category_name)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                        >
                          {category.main_category_name}
                        </label>
                      </div>
                    </div>
                    <span className="ml-auto">{mainCategoryCounts[category.main_category_name] || 0}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger><h1 className='font-semibold'>Sub-Category</h1></AccordionTrigger>
              <AccordionContent>
                {categories.map(category => (
                  <div className="flex items-center justify-between space-x-2" key={category.sub_category_name}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        className="w-6 h-6 border-blue-500 border-2 m-1"
                        value={category.sub_category_name}
                        onCheckedChange={(checked) => handleCheckboxChange(category.sub_category_name, 'sub')}
                        checked={selectedSubCategories.includes(category.sub_category_name)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                        >
                          {category.sub_category_name}
                        </label>
                      </div>
                    </div>
                    <span className="ml-auto">{subCategoryCounts[category.sub_category_name] || 0}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger><h1 className='font-semibold'>Price</h1></AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <div className="flex items-center">
                        <input type="radio" id="free" name="priceFilter" value="free" onChange={() => handleCheckboxChange("free", 'price')} checked={selectedFilter === "free"} className="w-5 h-5" />
                        <label className='font-normal ml-2' htmlFor="free">Free</label>
                      </div>
                      <div className="flex items-center mt-2">
                        <input type="radio" id="paid" name="priceFilter" value="paid" onChange={() => handleCheckboxChange("paid", 'price')} checked={selectedFilter === "paid"} className="w-5 h-5" />
                        <label className='font-normal ml-2' htmlFor="paid">Paid</label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>

        <div className="md:col-span-3">
          <section className="self-stretch px-0.5 mt-10 max-w-[1040px] max-md:max-w-full text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {loading ? (
                <div className="flex justify-center items-center w-full col-span-1 md:col-span-2 lg:col-span-3">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              ) : (
                currentTools.map((tool, index) => {
                  // Find the matching logo from sheetsData
                  const matchingSheetData = sheetsData.find(sheet => sheet.logoLink === tool.tool_id.toString());
                  const imgSrc = matchingSheetData ? matchingSheetData.company : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'; // Default image if no match is found

                  // Find the description from toolDescriptions based on tool_id
                  const descriptionData = toolDescriptions.find(description => description.tool_id === tool.tool_id.toString());
                  const description = descriptionData ? descriptionData.description : 'Description not available';

                  return (
                    <Link legacyBehavior key={index} href={`/tools/${tool.tool_id}`}>
                      <a>
                        <ToolCard
                          imgSrc={imgSrc}
                          title={tool.tool_name}
                          description={description}
                          pricing={tool.Free_version ? "Free" : (tool.Paid_version ? "Paid" : null)}
                          mainCategory={tool.main_category_name}
                          subCategory={tool.sub_category_name}
                        />
                      </a>
                    </Link>
                  );
                })
              )}
            </div>
            <div className="flex justify-center mt-8 pb-11">
              {pageWindow[0] > 1 && (
                <>
                  <button onClick={() => paginate(1)} className="px-3 py-1 mx-1 bg-gray-200 text-black rounded-lg">1</button>
                  {pageWindow[0] > 2 && <span className="px-3 py-1 mx-1 bg-gray-200 text-black rounded-lg">...</span>}
                </>
              )}
              {Array.from({ length: pageWindow[1] - pageWindow[0] + 1 }, (_, i) => (
                <button
                  key={pageWindow[0] + i}
                  onClick={() => paginate(pageWindow[0] + i)}
                  className={`px-3 py-1 mx-1 ${currentPage === pageWindow[0] + i ? 'bg-blue-500 text-white rounded-lg' : 'bg-gray-200 text-black rounded-lg'}`}
                >
                  {pageWindow[0] + i}
                </button>
              ))}
              {pageWindow[1] < totalPages && (
                <>
                  {pageWindow[1] < totalPages - 1 && <span className="px-3 py-1 mx-1 bg-gray-200 text-black rounded-lg">...</span>}
                  <button onClick={() => paginate(totalPages)} className="px-3 py-1 mx-1 bg-gray-200 text-black rounded-lg">{totalPages}</button>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  </AIToolsLayout>
);
}

export default ContactPage;
