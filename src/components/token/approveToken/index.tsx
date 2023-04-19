import { useWalletContext } from "@/context/wallet";
import { useTokenApproved } from "@/hooks/fetchContractDetails";
import { classNames } from "@/utils/classNames";
import { getFirstOrString } from "@/utils/stringUtils";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";

const ApproveToken: React.FC = () => {
  const router = useRouter();
  const tokenId = getFirstOrString(router.query.tokenId);
  const chain = getFirstOrString(router.query.chain);
  const { fetchApproved } = useTokenApproved(tokenId, chain);

  const { tokenKidContract } = useWalletContext();

  // Refetch Approved after approving token
  const approveToken = async () => {
    if (!tokenId) return;
    const { wait } = await tokenKidContract.approve(+tokenId);
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
