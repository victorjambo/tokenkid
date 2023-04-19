import { IPFS_BASE_URL, NEW_IPFS_BASE_URL } from "@/utils/ipfs";
import React, { useEffect, useState } from "react";

const Avatar: React.FC<{ loading: boolean; tokenURI: string }> = ({
  loading,
  tokenURI,
}) => {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (tokenURI.startsWith(IPFS_BASE_URL)) {
      const str = tokenURI.replace(IPFS_BASE_URL, NEW_IPFS_BASE_URL);
      setImgSrc(str);
    } else {
      setImgSrc(tokenURI);
    }
  }, [tokenURI]);

  return (
    <div className="mb-8">
      {loading ? (
        <div className="animate-pulse h-96 rounded-xl bg-gray-200" />
      ) : (
        <img className="w-full rounded-xl" src={imgSrc} />
      )}
    </div>
  );
};

export default Avatar;
