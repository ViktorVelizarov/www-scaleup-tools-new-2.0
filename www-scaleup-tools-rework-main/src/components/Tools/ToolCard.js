import Image from "next/image";
import { useState } from "react";
import SvgImage from "../SvgImage/SvgImage";

const ToolCard = ({ image, tags, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`relative border-[1px] shadow-xl rounded-lg p-2 h-[100%] [perspective:1000px] flex flex-col duration-700 [transform-style:preserve-3d] ${
        isFlipped ? "[transform:rotateY(180deg)] bg-primary border-primary" : "[transform:rotatyY(0deg)]"
      } max-w-[400px] min-w-[100px]`}
      onClick={handleCardFlip}
    >
      <div
        className={`[backface-visibility:hidden] ${
          isFlipped ? "hidden" : "block"
        }`}
      >
        <div className="flex justify-center mb-5">
        <SvgImage svgString={image}/>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, key) => (
            <span
              key={key}
              className={`text-white text-xs sm:text-sm px-2 my-0.5 ${tag.tag.bgColorTool} rounded-lg overflow-hidden`}
            >
              {tag.tag.title}
            </span>
          ))}
        </div>
      </div>
      <div
        className={`px-2 [transform:rotateY(180deg)] [backface-visibility:hidden] ${
          isFlipped ? "block" : "hidden"
        }`}
      >
        <p className="text-white text-xs sm:text-sm md:text-lg font-semibold select-none">{description}</p>
      </div>
    </div>
  );
};

export default ToolCard;
