import { erc20ABI } from '@wagmi/core'
import ContractBase from "./base";

class ERC20Contract extends ContractBase {
  constructor(contractAddress: `0x${string}`) {
    super(contractAddress, erc20ABI as any);
  }

  setAllowance = async (amount: string) =>
    await this.write("approve", [this.contractAddress, amount]);

  getAllowance = async (address: `0x${string}`): Promise<string | null> => {
    try {
      return (await this.read("allowance", [
        address,
        this.contractAddress,
      ])) as string;
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };
}

export default ERC20Contract;
