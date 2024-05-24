import React from "react";
import SvgImage from "@/components/SvgImage/SvgImage";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function ListOfTools({tools, handleEditingBtn, deleteTool}) {
  return (
    <>
      <h1 className="text-xl font-extrabold mb-5 mt-7">Added tools: </h1>
      <div className="flex flex-col gap-4 mb-5 w-full">
        {tools.map((tool, indx) => (
          <div className="flex flex-col bg-slate-300 w-full rounded-md p-2" key={indx}>
            <div className="flex justify-between mb-5">
              <SvgImage svgString={tool.image} />
              <div className="flex flex-col w-[calc(100%-8.5rem)]">
                {" "}
                <span className="mb-2">
                  <b>Title: </b>
                  {tool.title}
                </span>
                <span className="mb-2">
                  <b>Description: </b>
                  {tool.description}
                </span>
                <div>
                  <div className="flex flex-wrap gap-2">
                    <b>Tags:</b>
                    {tool.tags.map((tag, key) => {
                      return (
                        <div
                          className="bg-white w-auto rounded-md px-1"
                          key={key}
                        >
                          {tag.tag && tag.tag.title ? tag.tag.title : tag.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-around">
              <AiFillEdit className="h-6 w-6 hover:text-gray-500 cursor-pointer" onClick={() => handleEditingBtn(indx)}/>
              <AiFillDelete className="h-6 w-6 hover:text-gray-500 cursor-pointer" onClick={() => deleteTool(tool.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListOfTools;
