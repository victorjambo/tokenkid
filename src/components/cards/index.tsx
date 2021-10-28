import Card from "./card";

const Cards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-10">
      <div className="group">
        <Card />
      </div>
      <div className="group">
        <Card />
      </div>
      <div className="group">
        <Card />
      </div>
      <div className="group">
        <Card />
      </div>
      <div className="group">
        <Card />
      </div>
      <div className="group">
        <Card />
      </div>
      <div className="group">
        <Card />
      </div>
      <div className="group">
        <Card />
      </div>
      <div className="group">
        <Card />
      </div>
      <div className="group">
        <Card />
      </div>
    </div>
  );
};

export default Cards;
