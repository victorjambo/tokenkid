import { useContractsContext } from "@/context/contractsContext";
import { fetchFromContract } from "@/hooks/fetchFromContract";
import { classNames } from "@/utils/classNames";
import { useContractKit } from "@celo-tools/use-contractkit";
import ReactTooltip from "react-tooltip";

const ApproveToken: React.FC = () => {
  const { performActions } = useContractKit();

  const { tokenKidFactoryContract } = useContractsContext();

  const { tokeninfo } = fetchFromContract();

  // Refetch Approved after approving token
  const approveToken = async () => {
    await performActions(async (kit) => {
      const _tokenId = +tokeninfo.tokenId;
      await tokenKidFactoryContract.approve(
        _tokenId,
        kit.defaultAccount,
        onReceipt,
        onError,
        onTransactionHash
      );
    });
  };

  const onReceipt = (_receipt) => {
    console.log({_receipt});
  };

  const onError = (_error) => {
    console.log({_error});
  };

  const onTransactionHash = (_hash) => {
    console.log({_hash});
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
