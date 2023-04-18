import { useWalletContext } from "@/context/wallet";
import { fetchFromContract } from "@/hooks/fetchFromContract";
import { classNames } from "@/utils/classNames";
import ReactTooltip from "react-tooltip";

const ApproveToken: React.FC = () => {
  const { tokenKidContract } = useWalletContext();

  const { tokeninfo, fetchApproved } = fetchFromContract();

  // Refetch Approved after approving token
  const approveToken = async () => {
    const _tokenId = +tokeninfo.tokenId;
    const { wait } = await tokenKidContract.approve(_tokenId);
    await wait()
      .then(() => fetchApproved())
      .catch((err) => console.log({ err }));
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
