import {
  readContract,
  getContract,
  sendTransaction,
  prepareSendTransaction,
  writeContract,
  prepareWriteContract,
} from "@wagmi/core";
import { AbiItem } from "web3-utils";
import BN from "bn.js";

class ContractBase {
  public contractAddress: `0x${string}`;
  protected abi: AbiItem[];

  constructor(contractAddress: `0x${string}`, abi: AbiItem[]) {
    this.abi = abi;
    this.contractAddress = contractAddress;
  }

  protected async getContract() {
    return await getContract({
      address: this.contractAddress,
      abi: this.abi,
    });
  }

  protected async read(
    functionName: string,
    args?: Array<string | number | boolean>
  ) {
    return await readContract({
      address: this.contractAddress,
      abi: this.abi,
      functionName,
      ...(args && { args }),
    });
  }

  protected async send(to: string, value) {
    const config = await prepareSendTransaction({
      request: { to, ...(value && { value }) },
    });
    return await sendTransaction(config);
  }

  protected async write(
    functionName: string,
    args?: Array<string | number | boolean | BN>,
    overrides?: {
      from: `0x${string}`;
      value: number;
    }
  ) {
    const config = await prepareWriteContract({
      address: this.contractAddress,
      abi: this.abi,
      functionName,
      ...(args && { args }),
      ...(overrides && { overrides }),
    });
    return await writeContract(config);
  }
}

export default ContractBase;
