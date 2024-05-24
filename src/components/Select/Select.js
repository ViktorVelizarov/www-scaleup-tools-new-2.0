import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { HiCheck } from 'react-icons/hi';

function Select({ options, selected }) {
  return (
    <Listbox value={selected.selectedItem} onChange={selected.setSelectedItem}>
      <div className='relative mt-1 z-10'>
        <Listbox.Button className=' w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left sm:text-sm ring-1 ring-inset ring-accent-orange  focus:ring-inset focus:ring-accent'>
          <span className={`block truncate ${selected.selectedItem.color}`}>
            {selected.selectedItem.text}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <RiArrowDropDownFill className='h-5 w-5' size={10} />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {options.map((option, indx) => (
              <Listbox.Option
                key={indx}
                className={`relative cursor-pointer select-none py-2 pl-10 pr-4`}
                value={option}
                disabled={option.color}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${option.color}`}>
                      {option.text}
                    </span>
                    {selected && !option.color ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        <HiCheck className='h-5 w-5' size={10} />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default Select;
