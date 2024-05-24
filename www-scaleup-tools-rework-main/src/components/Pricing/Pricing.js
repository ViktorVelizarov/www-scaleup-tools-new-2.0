import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Pricing = ({ setSelectedItem, options }) => {
  return (
    <section id='pricing' className='max-w-7xl p-8 m-[0_auto] my-5'>
      <h2 className='text-accent-orange font-extrabold text-4xl mb-7'>
        PRICING
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
        <div className='bg-white rounded-md mb-5 border-[1px] h-[25rem] px-5 py-8 text-center shadow-lg'>
          <div className='flex flex-col justify-between h-[100%]'>
            <h2 className='text-primary text-[1.5rem] font-medium'>
              Free intro call
            </h2>
            <span>
              <h4 className='text-primary text-4xl font-extrabold'>0€</h4>
              <i className='text-primary text-sm font-normal w-[100%] inline-block'>
                (without VAT)
              </i>
            </span>
            <div>
              Get on call with our specialst and explore the best options for
              you.
            </div>
            <div>
              <a
                className='w-[75%] block bg-primary text-white py-2 rounded-md mx-auto border-primary border-solid border-[0.1rem] hover:bg-white hover:text-primary'
                href='/contact'
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-md mb-5 border-[1px] h-[25rem] px-5 py-8 text-center shadow-lg'>
          <div className='flex flex-col justify-between h-[100%]'>
            <div>
              <h2 className='text-primary text-[1.5rem] font-medium'>
                Quick win
              </h2>
              <h3 className='text-primary text-[1rem] font-medium'>
                Simple issue fixing
              </h3>
            </div>
            <span>
              <h4 className='text-primary text-4xl font-extrabold'>40€</h4>
              <i className='text-primary text-sm font-normal w-[100%] inline-block'>
                (without VAT)
              </i>
            </span>
            <div>
              Quickly gain basic skills and overview in a tool of choice.
            </div>
            <div>
              <a
                className='w-[75%] block bg-primary text-white py-2 rounded-md mx-auto border-primary border-solid border-[0.1rem] hover:bg-white hover:text-primary'
                href='/contact'
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>

        <div className='bg-primary rounded-md mb-5 border-[1px] h-[25rem] px-5 py-8 text-center shadow-lg'>
          <div className='flex flex-col justify-between h-[100%]'>
            <div>
              <h2 className='text-white text-[1.5rem] font-medium'>
                Training day
              </h2>
              <h3 className='text-white text-[1rem] font-medium'>Group</h3>
            </div>
            <span>
              <h4 className='text-white text-4xl font-extrabold'>400€</h4>
              <i className='text-white text-sm font-normal w-[100%] inline-block'>
                (without VAT)
              </i>
            </span>
            <div className='text-white'>
              Spend a day with our specialst. Choose a tool to become PRO at!
            </div>
            <div>
              <a
                className='w-[75%] block bg-white text-primary py-2 rounded-md mx-auto border-white border-solid border-[0.1rem] hover:bg-primary hover:text-white'
                href='/contact'
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-md mb-5 border-[1px] h-[25rem] px-5 py-8 text-center shadow-lg'>
          <div className='flex flex-col justify-between h-[100%]'>
            <div>
              <h2 className='text-primary text-[1.5rem] font-medium'>
                Training day
              </h2>
              <h3 className='text-primary text-[1rem] font-medium'>
                Individual
              </h3>
            </div>
            <span>
              <h4 className='text-primary text-4xl font-extrabold'>800€</h4>
              <i className='text-primary text-sm font-normal w-[100%] inline-block'>
                (without VAT)
              </i>
            </span>
            <div>
              Get on call with our specialst and gain some priceless knowledge!
            </div>
            <div>
              <a
                className='w-[75%] block bg-primary text-white py-2 rounded-md mx-auto border-primary border-solid border-[0.1rem] hover:bg-white hover:text-primary'
                href='/contact'
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
