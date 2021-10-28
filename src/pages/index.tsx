import Hero from "@/components/hero";
import Cards from "@/components/cards";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <div className="bg-white-back py-24">
        <div className="container m-auto">
          <h1 className="text-4xl">Assets</h1>
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Home;
