import Web3 from "web3";
import BN from "bn.js";
import { Contract } from "web3-eth-contract";
import { RPC_URL, tokenAddresses } from "@/utils/tokenAddresses";
import { ERC20_ABI } from "../abi/ERC20";

class ERC20Contract {
  private token: string;
  private contractAddress: string;
  public ERC20: Contract;
  address: "0x8d5d1CC09Cef15463A3759Bce99C23d19Cc97b6c"; // TODO

  constructor(name: string) {
    this.token = tokenAddresses[name].ERC20Tokens.cUSD;
    this.contractAddress = tokenAddresses[name].tokenFactory;
    this.initialize();
  }

  initialize = async () => {
    try {
      const web3 = new Web3(RPC_URL);
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
    await new Promise((resolve) => {
      this.ERC20.methods
        .approve(this.contractAddress, amount)
        .send({ from: this.address })
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
      return await this.ERC20.methods
        .allowance(this.address, this.contractAddress)
        .call();
    } catch (error) {
      return null;
    }
  };
}

export default ERC20Contract;
