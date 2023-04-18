import {
  readContract,
  getContract,
  sendTransaction,
  prepareSendTransaction,
  writeContract,
  prepareWriteContract,
} from "@wagmi/core";
import { AbiItem } from "web3-utils";
import { NETWORKS } from "@/utils/network";
import BN from "bn.js";

class ContractBase {
  public contractAddress: string;
  public abi: AbiItem[];

  constructor(chainId: number, abi: AbiItem[]) {
    this.abi = abi;
    this.contractAddress = NETWORKS[chainId].contractAddress;
  }

  async getContract() {
    return await getContract({
      address: this.contractAddress,
      abi: this.abi,
    });
  }

  async read(functionName: string, args?: Array<string | number | boolean>) {
    return await readContract({
      address: this.contractAddress,
      abi: this.abi,
      functionName,
      ...(args && { args }),
    });
  }

  async send(to: string, value) {
    const config = await prepareSendTransaction({
      request: { to, ...(value && { value }) },
    });
    return await sendTransaction(config);
  }

  async write(
    functionName: string,
    args?: Array<string | number | boolean | BN>
  ) {
    const config = await prepareWriteContract({
      address: this.contractAddress,
      abi: this.abi,
      functionName,
      ...(args && { args }),
    });
    return await writeContract(config);
  }
}

export default ContractBase;
