import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AIToolsLayout from '@/Layouts/AIToolsLayout';
import { ClipLoader } from 'react-spinners';
import { IoIosRefresh } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";



function ToolCard({ imgSrc, title, pricing, mainCategory, subCategory, toolId, posterSrc }) {
  const [description, setDescription] = useState('');
  const [loadingDescription, setLoadingDescription] = useState(true);

    useEffect(() => {
      const fetchDescription = async () => {
        try {
          const response = await fetch(`/api/getSheetsData/getDescription?toolId=${toolId}`);
          const data = await response.json();
          if (data.data) {
            setDescription(data.data);
          } else {
            setDescription('Description not available');
          }
          setLoadingDescription(false);
        } catch (error) {
          console.error('Error fetching description:', error);
          setLoadingDescription(false);
        }
      };

      fetchDescription();
  }, [toolId]);

  // Display loading spinner while description is being fetched
  if (loadingDescription) {
    return (
      <div className="flex justify-center items-center w-full col-span-1 md:col-span-2 lg:col-span-3">
        <ClipLoader size={50} color={"#123abc"} loading={loadingDescription} />
      </div>
    );
  }

  // Render ToolCard once description is loaded
  return (
    <article className="flex flex-col p-4 mt-5 w-full bg-white rounded-xl shadow-lg">
      <div className="flex gap-5 justify-between w-full">
        <div className="flex gap-5 justify-between text-xl font-bold">
          <img loading="lazy" src={imgSrc} alt={title} className="shrink-0 aspect-[1.09] w-[51px]" />
          <div className="my-auto leading-6" style={{ maxHeight: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}</div>
        </div>
        {pricing && <div className="self-start mt-2.5 text-base font-extralight text-center">{pricing}</div>}
      </div>
      <div className="mt-4 -mx-4">
      <img src={posterSrc || "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png"} alt={`Poster for ${title}`} className="w-full h-48 object-cover" />
      </div>
      <div className="flex mt-1 space-x-2">
        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{mainCategory}</span>
        <span className="bg-orange-300 text-white px-2 py-1 rounded-full text-sm truncate max-w-[150px]">{subCategory}</span>
      </div>
      <div className="mt-2 text-base font-extralight overflow-hidden overflow-ellipsis" style={{ height: '6rem' }}>
        <p>{description}</p>
      </div>
    </article>
  );
}

// Import translations
import enTranslations from '@/translations/en.json';
import skTranslations from '@/translations/sk.json';
import czTranslations from '@/translations/cz.json';

const translations = {
  en: enTranslations,
  sk: skTranslations,
  cz: czTranslations,
};
  
const ContactPage = ({ selectedLanguage }) => {
  const [toolData, setToolData] = useState([]);
  const [sheetsData, setSheetsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMainCategories, setSelectedMainCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 12;
  const [pageWindow, setPageWindow] = useState([1, 5]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFiltersPopup, setShowFiltersPopup] = useState(false); // State for showing filters popup
  const [postersData, setPostersData] = useState([]);
  const t = (key) => translations[selectedLanguage][key] || key; // Translation function

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tool data:', error);
      }
    };


    const fetchPostersData = async () => {
      try {
        const response = await fetch('/api/getSheetsData/getPosters');
        const data = await response.json();
        setPostersData(data);
      } catch (error) {
        console.error('Error fetching posters data:', error);
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
    fetchCategories();
    fetchPostersData();
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
    const searchTermMatch = tool.tool_name.toLowerCase().includes(searchTerm.toLowerCase());
    return mainCategoryMatch && subCategoryMatch && priceMatch && searchTermMatch;
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

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination when search term changes
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

      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="flex flex-col justify-between items-center px-16 py-8 bg-gray-300 relative" style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/44/35/67/360_F_244356708_9sarXrMLZEEMAI2KKt3on8x1mCgfQKrQ.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <h1 className="text-4xl font-bold text-center text-white max-w-full mt-10 md:text-5xl pt-16">{t('explore_ai_applications')}</h1>
          <p className="text-xl text-center text-white mt-4 max-w-full md:text-2xl">{t('discover_intelligent_solutions')}</p>
          <form className="flex justify-center items-start px-3.5 py-4 mt-8 max-w-full text-2xl font-extralight text-black bg-white rounded-3xl border  border-solid shadow-sm w-[700px] max-md:pr-5 max-md:mt-10">
            <label className="sr-only" htmlFor="toolInput">{t('enter_tool_name')}</label>
            <input
              className="w-full bg-transparent border-none outline-none text-xl"
              type="text"
              id="toolInput"
              placeholder="Enter a tool name...."
              aria-label="Enter a tool name...."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <span className="text-xl text-black ml-auto pt-1 pr-1"><FaSearch className='text-orange-500'/></span>
          </form>
        </header>

        {/* Filters button for small screens */}
        <div className="container mx-auto  md:col-span-1 pt-14 pl-4 pr-4">
          <button
            onClick={() => setShowFiltersPopup(true)}
            className="bg-white text-black  py-2 rounded-xl w-full  md:hidden"
          >
            Filters
          </button>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 relative bg-grey-200 px-4"> {/* Added container mx-auto and px-4 */}
          <div className="md:col-span-1 lg:pt-14 md:pt-14 pl-14 pr-3 ">
          <div className="gradient-border-container">
          <div className="gradient-border-content">
           
          </div>
          </div>
            <div className="self-start border-orange-500 border-2 rounded-lg p-4 bg-white hidden md:block">
              <section >
                <div className="flex justify-between items-center mb-4 hidden md:flex ">
                  <h2 className="text-2xl font-bold text-black">{t('filters')}</h2>
                  <button onClick={handleResetFilters} className="bg-orange-400 text-black px-1 py-1 rounded-lg">
                    <IoIosRefresh className='text-white'/>
                  </button>
                </div>

                {/* Filters popup for small screens */}
                {showFiltersPopup && (
                  <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-black">Filters</h2>
                        <button onClick={() => setShowFiltersPopup(false)} className="bg-orange-400 text-black px-3 py-1 rounded-lg">Close</button>
                      </div>
                      <Accordion type="multiple" collapsible defaultValue={["item-1", "item-2", "item-3"]}>
                        <AccordionItem value="item-1">
                          <AccordionTrigger><h1 className='font-semibold'>{t('category')}</h1></AccordionTrigger>
                          <AccordionContent>
                            {categories.map(category => (
                              <div className="flex items-center justify-between space-x-2" key={category.main_category_name}>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    className="w-6 h-6 border-orange-500 border-2 m-1"
                                    value={category.main_category_name}
                                    onCheckedChange={(checked) => handleCheckboxChange(category.main_category_name, 'main')}
                                    checked={selectedMainCategories.includes(category.main_category_name)}
                                  />
                                  <div className="grid gap-1.5 leading-none">
                                    <label
                                      htmlFor="terms1"
                                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {category.main_category_name}
                                    </label>
                                  </div>
                                </div>
                                <span className="ml-auto text-gray-500">({mainCategoryCounts[category.main_category_name] || 0})</span>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                          <AccordionTrigger><h1 className='font-semibold'>{t('sub_category')}</h1></AccordionTrigger>
                          <AccordionContent>
                            {categories.map(category => (
                              <div className="flex items-center justify-between space-x-2" key={category.sub_category_name}>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    className="w-6 h-6 border-orange-500 border-2 m-1"
                                    value={category.sub_category_name}
                                    onCheckedChange={(checked) => handleCheckboxChange(category.sub_category_name, 'sub')}
                                    checked={selectedSubCategories.includes(category.sub_category_name)}
                                  />
                                  <div className="grid gap-1.5 leading-none">
                                    <label
                                      htmlFor="terms1"
                                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {category.sub_category_name}
                                    </label>
                                  </div>
                                </div>
                                <span className="ml-auto text-gray-500">({subCategoryCounts[category.sub_category_name] || 0})</span>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                          <AccordionTrigger><h1 className='font-semibold'>{t('price')}</h1></AccordionTrigger>
                          <AccordionContent>
                            <div className='pl-1'>
                              <div className="flex items-center">
                                <input className="border-orange-500 w-5 h-5 bg-orange-500 text-orange-500" type="radio" id="free" name="priceFilter" value="free" onChange={() => handleCheckboxChange("free", 'price')} checked={selectedFilter === "free"} />
                                <label className='font-normal ml-2' htmlFor="free">{t('free')}</label>
                                
                              </div>
                              <div className="flex items-center mt-2">
                                <input type="radio" id="paid" name="priceFilter" value="paid" onChange={() => handleCheckboxChange("paid", 'price')} checked={selectedFilter === "paid"} className="w-5 h-5" />
                                <label className='font-normal ml-2' htmlFor="paid">{t('paid')}</label>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <div className="flex justify-center mt-4">
                        <button onClick={() => setShowFiltersPopup(false)} className="bg-orange-400 text-white px-4 py-2 rounded-lg">{t('submit')}</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Accordion for desktop view */}
                <Accordion type="multiple" collapsible defaultValue={["item-1", "item-2", "item-3"]} className="hidden md:block">
                  <AccordionItem value="item-1">
                    <AccordionTrigger><h1 className='font-semibold'>Category</h1></AccordionTrigger>
                    <AccordionContent>
                      {categories.map(category => (
                        <div className="flex items-center justify-between space-x-2" key={category.main_category_name}>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              className="w-6 h-6 border-orange-500 border-2 m-1"
                              value={category.main_category_name}
                              onCheckedChange={(checked) => handleCheckboxChange(category.main_category_name, 'main')}
                              checked={selectedMainCategories.includes(category.main_category_name)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor="terms1"
                                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.main_category_name}
                              </label>
                            </div>
                          </div>
                          <span className="ml-auto text-gray-500">({mainCategoryCounts[category.main_category_name] || 0})</span>
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
                              className="w-6 h-6 border-orange-500 border-2 m-1"
                              value={category.sub_category_name}
                              onCheckedChange={(checked) => handleCheckboxChange(category.sub_category_name, 'sub')}
                              checked={selectedSubCategories.includes(category.sub_category_name)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor="terms1"
                                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.sub_category_name}
                              </label>
                            </div>
                          </div>
                          <span className="ml-auto text-gray-500">({subCategoryCounts[category.sub_category_name] || 0})</span>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger><h1 className='font-semibold'>Price</h1></AccordionTrigger>
                    <AccordionContent>
                      <div className='pl-1'>
                        <div className="flex items-center">
                          <input type="radio" id="free" name="priceFilter" value="free" onChange={() => handleCheckboxChange("free", 'price')} checked={selectedFilter === "free"} className="w-5 h-5 " />
                          <label className                           ='font-normal ml-2' htmlFor="free">Free</label>
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
                    const matchingSheetData = sheetsData.find(sheet => sheet.logoLink === tool.tool_id.toString());
                    const imgSrc = matchingSheetData ? matchingSheetData.company : 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg';


                    return (
                      <Link legacyBehavior key={index} href={`/tools/${tool.tool_id}`}>
                        <a>
                        <ToolCard
                          imgSrc={imgSrc}
                          title={tool.tool_name}
                          pricing={tool.Free_version ? "Free" : (tool.Paid_version ? "Paid" : null)}
                          mainCategory={tool.main_category_name}
                          subCategory={tool.sub_category_name}
                          toolId={tool.tool_id} // Pass toolId as prop
                          posterSrc={tool.poster_url}
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
                    className={`px-3 py-1 mx-1 ${currentPage === pageWindow[0] + i ? 'bg-orange-500 text-white rounded-lg' : 'bg-gray-200 text-black rounded-lg'}`}
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
  );
}

export default ContactPage;