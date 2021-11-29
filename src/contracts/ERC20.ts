import Web3 from "web3";
import BN from "bn.js";
import { Contract } from "web3-eth-contract";
import { tokenAddresses } from "@/utils/tokenMapping";
import { ERC20_ABI } from "../abi/ERC20";

class ERC20Contract {
  private token: string;
  private contractAddress: string;
  private getConnectedKit: () => any;
  public ERC20: Contract;

  constructor(name: string, getConnectedKit: () => any) {
    this.token = tokenAddresses[name].ERC20Tokens.cUSD;
    this.getConnectedKit = getConnectedKit;
    this.contractAddress = tokenAddresses[name].tokenFactory;
    this.initialize();
  }

  initialize = async () => {
    try {
      const kit = await this.getConnectedKit();
      const web3 = kit?.connection?.web3 as Web3;
      this.ERC20 = new web3.eth.Contract(ERC20_ABI, this.token);
    } catch (error) {
      this.ERC20 = null;
      console.error;
    }
  };

  setAllowance = async (
    amount: number | BN,
    onReceipt: (arg0: any) => void,
    onError: (arg0: any) => void,
    onTransactionHash?: (arg0: string) => void
  ) => {
    const kit = await this.getConnectedKit();
    await new Promise((resolve) => {
      this.ERC20.methods
        .approve(this.contractAddress, amount)
        .send({ from: kit.defaultAccount })
        .on("transactionHash", (transactionHash) => {
          onTransactionHash(transactionHash);
        })
        .on("receipt", (receipt) => {
          onReceipt(receipt);
          resolve(receipt);
        })
        .on("error", (error) => {
          onError(error);
          resolve(error);
        });
    });
  };

  getAllowance = async () => {
    try {
      const kit = await this.getConnectedKit();
      return await this.ERC20.methods
        .allowance(kit.defaultAccount, this.contractAddress)
        .call();
    } catch (error) {
      return null;
    }
  };
}

export default ERC20Contract;
