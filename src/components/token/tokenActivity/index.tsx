import PriceHistoryTable from "./priceHistoryTable";

const TokenActivity = () => {
  return (
    <div className="bg-white-back py-9 px-5">
      <div className="text-black text-2xl font-bold pb-8">Token Activity</div>
      <PriceHistoryTable />
    </div>
  );
};

export default TokenActivity;
