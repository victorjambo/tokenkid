import { useAccount } from "wagmi";
import { toWei } from "@/utils/weiConversions";
import { useWalletContext } from "@/context/wallet";

const One: React.FC = () => {
  const { tokenKidContract: contract, ERC20 } = useWalletContext();
  const { address, isConnected } = useAccount();

  const safeMint = async () => {
    if (contract) {
      const tokenName = "Eat & Live";
      const priceInWei = toWei(2);
      const tokenURI =
        "https://ipfs.io/ipfs/QmRXUq57jq3UhigjrDvMpQ6PpT9DyUeA8jjJ651roRiZ3Q/";
      const tokenDesc = "Eat to live and enjoy more and more 🍽";
      const { hash, wait } = await contract.safeMint(
        tokenName,
        priceInWei.toString(),
        tokenURI,
        tokenDesc
      );
      const res = await wait();
      console.log({ hash });
      console.log({ res });
    } else {
      console.log("wallet not initialized");
    }
  };

  const getMintedToken = async () => {
    const res = await contract.getMintedToken(1);
    console.log(res);
  };

  const getTokenPriceHistory = async () => {
    const res = await contract.getTokenPriceHistory(1);
    console.log(res);
  };

  const getApproved = async () => {
    const res = await contract.getApproved(1);
    console.log(res);
  };

  const isApprovedForAll = async () => {
    const res = await contract.isApprovedForAll(address);
    console.log(res);
  };

  const writeToContract = async (func: string, ...args) => {
    const mapper = {
      changeTokenPrice: contract.changeTokenPrice,
      buyToken: contract.buyToken,
      toggleOnSale: contract.toggleOnSale,
      burnToken: contract.burnToken,
      approve: contract.approve,
      setApprovalForAll: contract.setApprovalForAll,
    };

    if (contract) {
      const { hash, wait } = await mapper[func](...args);
      console.log({ hash });
      const res = await wait();
      console.log({ res });
    } else {
      console.log("contract not initialized");
    }
  };

  const changeTokenPrice = () => {
    const priceInWei = toWei(4);
    writeToContract("changeTokenPrice", 0, priceInWei.toString());
  };

  const buyToken = () => {
    const tokenId = 0;
    const priceInWei = toWei(4).toNumber();
    const erc20TokenAddress = "0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557";
    writeToContract(
      "buyToken",
      tokenId,
      priceInWei,
      erc20TokenAddress,
      address
    );
  };

  const setAllowance = async () => {
    const priceInWei = toWei(4).toString();
    const res = await ERC20.setAllowance(priceInWei);
    console.log({ res });
  };

  const getAllowance = async () => {
    const allowance = await ERC20.getAllowance(address);
    console.log({ allowance: allowance.toString() });
  };

  return (
    <div className="w-full pt-24 pb-96 items-center flex justify-center">
      <div className="flex flex-col">
        {isConnected ? (
          <div>Connected to {address}</div>
        ) : (
          <div>Not Connected</div>
        )}
        <h1 className="text-xl underline">Get Functions</h1>
        <button onClick={getMintedToken}>getMintedToken</button>
        <button onClick={getTokenPriceHistory}>getTokenPriceHistory</button>
        <button onClick={getApproved}>getApproved</button>
        <button onClick={isApprovedForAll}>isApprovedForAll</button>

        <h1 className="text-xl underline">Write Functions</h1>
        <button disabled onClick={safeMint}>
          Create Token
        </button>
        <button onClick={changeTokenPrice}>
          changeTokenPrice {toWei(4).toString()}
        </button>
        <button onClick={buyToken}>buyToken</button>
        <button onClick={() => writeToContract("toggleOnSale", 0)}>
          toggleOnSale
        </button>
        <button onClick={() => writeToContract("burnToken", 0)}>
          burnToken
        </button>
        <button onClick={() => writeToContract("approve", 0)}>approve</button>
        <button onClick={() => writeToContract("setApprovalForAll", true)}>
          setApprovalForAll
        </button>

        <h1 className="text-xl underline">ERC20</h1>
        <button onClick={setAllowance}>setAllowance</button>
        <button onClick={getAllowance}>getAllowance</button>
      </div>
    </div>
  );
};

export default One;
