import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ToolCard from '@/components/Tools/ToolCard';
import AiFilter from '@/components/Tools/Filter';
import { AiFillTags } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Link from "next/link";
import OurTool from "@/components/Tools/OurTool"

function Tools({tools, tags}) {
  const router = useRouter();
  const [filterTags, setFilterTags] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    console.log('Filter: ' + router.query.filter);
    const filterParam = router.query.filter;
    if (filterParam) {
      console.log('filterParam: ' + filterParam.toString().split(','));
      setFilterTags(filterParam.toString().split(','));
    } else {
      setFilterTags(['our-choice']);
      console.log('this is filter param:' + filterParam);
    }
  }, [router]);

  useEffect(() => {
    const newCards = tools.filter((tool) =>
      filterTags.length > 0
        ? filterTags.some(
            (filterTag) =>
              tool.tags.findIndex((tag) => filterTag === tag.tag.textId) >= 0
          )
        : true
    );
    setFilteredCards(newCards);
  }, [filterTags, tools]);

  useEffect(() => {
    if (filterTags.length === 1 && filterTags[0] === 'our-choice') {
      return;
    }

    const searchParams = new URLSearchParams();
    filterTags.forEach((tag) => {
      searchParams.append('filter', tag);
    });

    if (searchParams.toString() === '') {
      return;
    }

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newUrl);
  }, [filterTags]);

  const filterHandler = (event) => {
    console.log("in filter tags handler");
    if (!filterTags.includes(event.target.value)) {
      if (event.target.value === 'all') {
        setFilterTags([]);
      } else {
        setFilterTags([...filterTags, event.target.value]);
      }
    } else {
      if (filterTags.length > 1) {
        setFilterTags(
          filterTags.filter((filterTag) => filterTag !== event.target.value)
        );
      } else {
        setFilterTags([]);
      }
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete('filter');
      filterTags
        .filter((tag) => tag !== event.target.value)
        .forEach((tag) => {
          searchParams.append('filter', tag);
        });
      const newUrl = window.location.pathname + '?' + searchParams.toString();
      window.history.pushState(null, '', newUrl);
    }
  };

  const handleDropdown = () => {
    setDropDown(!dropDown);
  };
  const handleAllFilters = () => {
    setFilterTags([]);
  };

  const handleAndMore = () => {
    if (filterTags.length) {
      setFilterTags([]);
    }
  };

  return (
    <>
      <div className='bg-whitesmoke'>
        <div className='max-w-7xl m-[0_auto] p-8' id='in-house-tools'>
          <h2 class='text-accent-orange text-4xl font-extrabold'>SCALEUP TOOLS</h2>
          <div className='flex flex-col md:flex-row mt-10'>
            <div className='w-full md:w-[60vh]'>
              <p>
                Unlock the new innovation and automation potential with our suite of four exceptional in-house software solutions. Streamline:
              </p>
              <ul className="list-disc mt-6 pl-6 text-primary">
                <li className="text-black">
                  market discovery
                </li>
                <li className="text-black">
                  lead generation
                </li>
                <li className="text-black">
                  talent sourcing
                </li>
                <li className="text-black">
                  onboarding
                </li>
                <li className="text-black">
                  personal development
                </li>
                <li className="text-black">
                  or share knowledge through our edu web platform...
                </li>
              </ul>
              <p className='mt-6'>Soon, you will be able access these groundbreaking tools externally too! Curious to learn more and give
               them a try? <b>Get in touch now!</b></p> 
            </div>
            <div className='md:relative w-full lg:w-2/3 xl:w-1/2 mt-10 md:mt-0'>
              <img className='w-full h-full' src="/static/tools-pic.png" alt="Picture" />
            </div>
          </div>
          <OurTool />
          <div id="contact" className=" bg-gradient-main rounded-lg text-gray-50 p-6 flex flex-col sm:flex-row items-center justify-between mt-10">
            <div className="w-full md:max-w-[60%]">
              <b className='text-xl'>Interested in SCALEUP tools?</b> 
              <p>
                Schedule a quick intro call and let's explore how they can help to accelerate your business and grow your talents. 
              </p>
            </div>
            <Link
              href={"/contact#contact"}
              className="mt-3 sm:mt-0 lg:mr-24 border-gray-50 text-sm bg-primary-green border-2 rounded-md px-4 py-2 font-bold hover:bg-gray-50 hover:text-accent-orange transition ease-in duration-100 uppercase"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </div>
        {/* Filter */}
      <div>
        <div className='max-w-7xl m-[0_auto] p-8' id='external-tools'>
          <h2 class='text-accent-orange text-4xl font-extrabold'>100+ OTHER</h2>
          <div className='mt-[20px]'>
            <p>
              SCALEUP has expertise in more than 100 cloud-based and AI-powered tools. We are adding some new tools to our lists
              every week and we are happy to share our learnings and eventually get you onboarded to any of mentioned tools
              super-quickly. Don't waste time with your onboarding and setting up, get some professional to maximize your benefit
              to any of the tools or their combination.
            </p>
          </div>
          <div className='max-w-7xl m-[0_auto] mt-10 flex flex-col '>
            <div
              className='mb-5 p-3 bg-primary hover:bg-white hover:text-primary border-primary border-[1px]  ease-in-out duration-200 cursor-pointer w-28 text-center rounded-md font-bold text-white text-md select-none'
              onClick={handleDropdown}
            >
              {dropDown ? 'Filter ▲' : 'Filter ▼'}
            </div>
            {dropDown ? (
              <div className='flex flex-col sm:flex-row flex-wrap cursor-pointer p-4 bg-gray-100 gap-5 rounded-xl'>
                <div
                  className={
                    filterTags.length
                      ? `border-2 rounded-lg  bg-white text-[#a855f7] border-[#a855f7] hover:text-white hover:bg-[#a855f7] tools-filter py-1 px-2`
                      : `border-2 rounded-lg text-white border-primary bg-primary tools-filter py-1 px-2`
                  }
                >
                  <input
                    type='checkbox'
                    id='all-categories'
                    name='category'
                    value='all'
                    className='all jobs-inpts'
                    defaultChecked='true'
                    onClick={handleAllFilters}
                  />
                  <label
                    id='category'
                    className='label-for-check cursor-pointer flex items-center gap-2'
                    htmlFor='all-categories'
                  >
                    <AiFillTags />
                    All tools
                  </label>
                </div>
                {tags.map((tag) => (
                  <AiFilter
                    filterTags={filterTags}
                    filterHandler={filterHandler}
                    key={tag.id}
                    {...tag}
                  />
                ))}
              </div>
            ) : (
                ''
            )}
          </div>
          {/* Tools list */}
          <div className='max-w-7xl m-[0_auto]'>
            {tools.length ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5'>
              {filteredCards.map((card) => (
                <ToolCard key={card.id} {...card} />
              ))}
              {filterTags.length ? (
                <div
                  onClick={handleAndMore}
                  className='bg-primary h-[230px] rounded-lg text-center flex items-center cursor-pointer justify-center text-4xl font-bold and-more-card text-white hover:bg-primary-dark ease-in-out duration-200 '
                >
                  <h1 className='text-lg sm:text-2xl'>and more...</h1>
                </div>
              ) : (
                ''
              )}
            </div>
            ) : (
              <div className='flex justify-center items-center'>
                <span className='text-3xl font-extrabold text-primary'>Loading... </span>
                <Image
                  className='w-[5rem] h-[5rem]'
                  width={1000}
                  height={1000}
                  src={"/static/loader.gif"}
                />
              </div>
            )}
          </div>
          <div id="contact" className=" bg-gradient-main rounded-lg text-gray-50 p-6 flex flex-col sm:flex-row items-center justify-between my-10">
              <div className="w-full md:max-w-[60%] ">
                <b className='text-xl'>Interested in getting trained fast?</b> 
                <p>
                  Schedule a quick intro call and let's explore how we can help you to accelerate your onboarding to any mentioned tool or just do the fine tuning.
                </p>
              </div>
              <Link
                href={"/contact#contact"}
                className=" mt-3 sm:mt-0 lg:mr-24 border-gray-50 text-sm bg-primary-green border-2 rounded-md px-4 py-2 font-bold hover:bg-gray-50 hover:text-accent-orange transition ease-in duration-100 uppercase"
              >
                GET IN TOUCH
              </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tools;
