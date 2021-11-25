import Web3 from "web3";
import BN from "bn.js";
import { Contract } from "web3-eth-contract";
import { tokenAddresses } from "@/utils/tokenMapping";
import { ITokenKid } from "@/state/wallet/types";
import { TOKEN_KID_FACTORY_ABI } from "../abi/TokenKidFactory";

class TokenKidFactoryContract {
  private token: string;
  public tokenKidFactory: Contract;

  constructor(name: string, web3: Web3) {
    this.token = tokenAddresses[name].tokenFactory;
    this.initialize(web3);
  }

  initialize = (web3: Web3) => {
    try {
      this.tokenKidFactory = new web3.eth.Contract(
        TOKEN_KID_FACTORY_ABI,
        this.token
      );
    } catch (error) {
      this.tokenKidFactory = null;
      console.error;
    }
  };

  safeMint = async (
    tokenName: string,
    price: number | BN,
    tokenURI: string,
    defaultAccount: string
  ) => {
    await new Promise((resolve, reject) => {
      this.tokenKidFactory.methods
        .safeMint(tokenName, price, tokenURI)
        .send({ from: defaultAccount })
        .on("transactionHash", (transactionHash) => {
          console.log({ transactionHash });
        })
        .on("receipt", (receipt) => {
          console.log({ receipt });
          resolve(receipt);
        })
        .on("error", (error) => {
          console.log({ error });
          reject(error);
        });
    });
  };

  buyToken = async (
    tokenId: number,
    price: number | BN,
    token: string,
    defaultAccount: string
  ) => {
    await new Promise((resolve, reject) => {
      this.tokenKidFactory.methods
        .buyToken(tokenId, price, token)
        .send({ gas: '80000', gasPrice: '80000', from: defaultAccount })
        .on("transactionHash", (transactionHash) => {
          console.log({ transactionHash });
        })
        .on("receipt", (receipt) => {
          console.log({ receipt });
          resolve(receipt);
        })
        .on("error", (error) => {
          console.log({ error });
          reject(error);
        });
    });
  };

  getMintedToken = async (tokenId: number): Promise<ITokenKid> => {
    try {
      return await this.tokenKidFactory.methods.getMintedToken(tokenId).call();
    } catch (error) {
      console.debug(error); // TODO: handle this
      return null;
    }
  };

  changeTokenPrice = async (
    tokenId: number,
    price: number | BN,
    defaultAccount: string
  ) => {
    await new Promise((resolve, reject) => {
      this.tokenKidFactory.methods
        .changeTokenPrice(tokenId, price)
        .send({ from: defaultAccount })
        .on("transactionHash", (transactionHash) => {
          console.log({ transactionHash });
        })
        .on("receipt", (receipt) => {
          console.log({ receipt });
          resolve(receipt);
        })
        .on("error", (error) => {
          console.log({ error });
          reject(error);
        });
    });
  };

  toggleOnSale = async (tokenId: number, defaultAccount: string) => {
    await new Promise((resolve, reject) => {
      this.tokenKidFactory.methods
        .toggleOnSale(tokenId)
        .send({ from: defaultAccount })
        .on("transactionHash", (transactionHash) => {
          console.log({ transactionHash });
        })
        .on("receipt", (receipt) => {
          console.log({ receipt });
          resolve(receipt);
        })
        .on("error", (error) => {
          console.log({ error });
          reject(error);
        });
    });
  };
}

export default TokenKidFactoryContract;
