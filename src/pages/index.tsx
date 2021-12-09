import React from "react";
import Hero from "@/components/hero";
import Cards from "@/components/cards";

const Home = () => {
  const assetRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <Hero assetRef={assetRef} />
      <div className="bg-white-back py-24" ref={assetRef}>
        <div className="container m-auto">
          <h1 className="text-4xl">Assets</h1>
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Home;
