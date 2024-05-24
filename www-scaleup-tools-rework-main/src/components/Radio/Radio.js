import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

export default function Radio({title, radioBtns, selected}) {

  return (
    <div className="w-full pt-1 pb-2">
      <div className="mx-auto w-full">
        <RadioGroup value={selected.selected} onChange={selected.setSelected}>
          <RadioGroup.Label className="sr-only">{title}</RadioGroup.Label>
          <div className="space-y-2">
            {radioBtns.map((button) => (
              <RadioGroup.Option
                key={button.name}
                value={button.name}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-accent-orange"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-accent-orange bg-opacity-90 text-white"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-lg focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {button.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
