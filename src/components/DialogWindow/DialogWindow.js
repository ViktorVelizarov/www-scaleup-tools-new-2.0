import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function DialogWindow({ response }) {
  return (
    <>
      <Transition
        appear
        show={response.response.length > 0 ? true : false}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => response.setResponse("")}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-accent-orange bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Submition Result
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{response.response}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="bloc px-5 font-semibold py-1 border border-b-accent-orange rounded text-white bg-accent-orange hover:bg-white hover:text-accent-orange hover:border-accent-orange active:border-accent-orange active:text-accent-orange focus:outline-none"
                      onClick={() => response.setResponse("")}
                    >
                      Got it!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DialogWindow;
