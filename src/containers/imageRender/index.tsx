import { IPFS_BASE_URL } from "@/utils/ipfs";
import React, { useState, useEffect } from "react";

const NEW_IPFS_BASE_URL = "https://ipfs.io/ipfs/";

const ImageRender: React.FC<{ src: string; height?: string }> = ({ src }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    if (src.startsWith(IPFS_BASE_URL)) {
      const str = src.replace(IPFS_BASE_URL, NEW_IPFS_BASE_URL);
      setImgSrc(str);
    } else {
      setImgSrc(src);
    }
  }, [src]);

  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  return (
    <div className="h-96">
      <div
        className={`animate-pulse bg-gray-400 rounded-t-md w-full h-full ${
          imgLoaded ? "hidden" : ""
        }`}
      />
      <img
        className={`w-full rounded-t-md cursor-pointer h-full object-cover bg-white ${
          imgLoaded ? "" : "hidden"
        }`}
        src={imgSrc}
        onLoad={handleImgLoad}
      />
    </div>
  );
};

export default ImageRender;
