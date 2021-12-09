import React, { useState } from "react";

const ImageRender: React.FC<{ src: string; height: string }> = ({
  src,
  height = 96,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  return (
    <>
      <div
        className={`animate-pulse bg-gray-400 rounded-t-md w-full h-${height} ${
          imgLoaded ? "hidden" : ""
        }`}
      />
      <img
        className={`w-full rounded-t-md cursor-pointer max-h-${height} ${
          imgLoaded ? "" : "hidden"
        }`}
        src={src}
        onLoad={handleImgLoad}
      />
    </>
  );
};

export default ImageRender;
