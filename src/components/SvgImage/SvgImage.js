import { useEffect, useState } from "react";

export default function SvgImage({ svgString }) {
  const [src, setSrc] = useState();

  useEffect(() => {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    setSrc(url);

    return () => {
      URL.revokeObjectURL(url); // Clean up memory after component unmounts
    };
  }, [svgString]);

  return (
    <img
      src={src}
      alt="SVG content"
      className="h-[7rem] w-[7rem]"
    />
  );
}
