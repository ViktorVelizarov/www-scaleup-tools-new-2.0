import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function ListOfTags({ tags, handleEditingBtn, deleteTag }) {
  return (
    <>
      <h1 className="text-xl font-extrabold mb-5 mt-7">Added tags: </h1>
      <div className="flex flex-col gap-4 mb-5 w-full">
        {tags.map((tag, indx) => (
          <div
            className={`flex flex-col ${tag.bgColorTool} text-white w-full rounded-md p-2`}
            key={indx}
          >
            <div className="flex justify-between mb-5">
              <div className="flex flex-col w-[calc(100%-8.5rem)]">
                {" "}
                <span className="mb-2">
                  <b className="text-black">Title: </b>
                  {tag.title}
                </span>
                <span className="mb-2">
                  <b className="text-black">Tool ID: </b>
                  {tag.textId}
                </span>
              </div>
            </div>
            <div className="flex justify-around">
              <AiFillEdit
                className="h-6 w-6 text-gray-800 hover:text-gray-500 cursor-pointer"
                onClick={() => handleEditingBtn(indx)}
              />
              <AiFillDelete
                className="h-6 w-6 text-gray-800 hover:text-gray-500 cursor-pointer"
                onClick={() => deleteTag(tag.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListOfTags;
