import { useContractsContext } from "@/context/contractsContext";
import { fetchFromContract } from "@/hooks/fetchFromContract";
import { classNames } from "@/utils/classNames";
import ReactTooltip from "react-tooltip";

const ApproveToken: React.FC<{ fetchApproved }> = ({ fetchApproved }) => {
  const { tokenKidFactoryContract } = useContractsContext();

  const { tokeninfo } = fetchFromContract();

  // Refetch Approved after approving token
  const approveToken = async () => {
    // TODO removed
    const _tokenId = +tokeninfo.tokenId;
    await tokenKidFactoryContract.approve(
      _tokenId,
      "0x8d5d1CC09Cef15463A3759Bce99C23d19Cc97b6c",
      onReceipt,
      onError
    );
  };

  const onReceipt = () => {
    fetchApproved();
  };

  const onError = (_error) => {
    console.log({ _error });
  };

  return (
    <>
      <button
        className={classNames(
          "bg-pink-primary rounded-full px-6 py-3 text-white text-center font-semibold"
        )}
        onClick={approveToken}
        data-tip=""
        data-for="approve-token"
        data-offset="{'top': 24}"
      >
        Approve Token
      </button>
      <ReactTooltip effect="solid" id="approve-token">
        Approve Marketplace to transfer Token ownership on your behalf
      </ReactTooltip>
    </>
  );
};

export default ApproveToken;
