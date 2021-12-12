import React, { useState } from "react";

const ImageRender: React.FC<{ src: string; height?: string }> = ({
  src,
  height = 72,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  return (
    <div className={`h-${height}`}>
      <div
        className={`animate-pulse bg-gray-400 rounded-t-md w-full ${
          imgLoaded ? "hidden" : ""
        }`}
      />
      <img
        className={`w-full rounded-t-md cursor-pointer h-full object-contain bg-white ${
          imgLoaded ? "" : "hidden"
        }`}
        src={src}
        onLoad={handleImgLoad}
      />
    </div>
  );
};

export default ImageRender;
