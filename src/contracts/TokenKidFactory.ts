import Web3 from "web3";
import BN from "bn.js";
import { Contract } from "web3-eth-contract";
import { tokenAddresses } from "@/utils/tokenMapping";
import { ITokenKid } from "@/state/wallet/types";
import { TOKEN_KID_FACTORY_ABI } from "../abi/TokenKidFactory";
import { gas } from "@/utils/constants";

class TokenKidFactoryContract {
  private token: string;
  private getConnectedKit: () => any;
  public tokenKidFactory: Contract;

  constructor(name: string, getConnectedKit: () => any) {
    this.token = tokenAddresses[name].tokenFactory;
    this.getConnectedKit = getConnectedKit;
    this.initialize();
  }

  initialize = async () => {
    try {
      const kit = await this.getConnectedKit();
      const web3 = kit?.connection?.web3 as Web3;
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
    onReceipt: (arg0: any) => void,
    onError: (arg0: any) => void,
    onTransactionHash?: (arg0: string) => void
  ) => {
    const kit = await this.getConnectedKit();
    await new Promise((resolve) => {
      this.tokenKidFactory.methods
        .safeMint(tokenName, price, tokenURI)
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
          resolve(error); // This Hack dismisses useContractKit modal
        });
    });
  };

  buyToken = async (
    tokenId: number,
    price: number | BN,
    token: string,
    defaultAccount: string,
    onReceipt: (arg0: any) => void,
    onError: (arg0: any) => void,
    onTransactionHash?: (arg0: string) => void
  ) => {
    await new Promise((resolve) => {
      this.tokenKidFactory.methods
        .buyToken(tokenId, price, token)
        .send({ gas, from: defaultAccount })
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

  getMintedToken = async (tokenId: number): Promise<ITokenKid> => {
    try {
      const _token = await this.tokenKidFactory.methods
        .getMintedToken(tokenId)
        .call();

      return {
        tokenId: _token[0],
        tokenName: _token[1],
        owner: _token[2],
        previousOwner: _token[3],
        price: +_token[4] / 10 ** 18, // Convert Price from wei
        tokenURI: _token[5],
        isOnSale: _token[6],
      };
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  changeTokenPrice = async (
    tokenId: number,
    price: number | BN,
    defaultAccount: string,
    onReceipt: (arg0: any) => void,
    onError: (arg0: any) => void,
    onTransactionHash?: (arg0: string) => void
  ) => {
    await new Promise((resolve) => {
      this.tokenKidFactory.methods
        .changeTokenPrice(tokenId, price)
        .send({ from: defaultAccount })
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

  toggleOnSale = async (
    tokenId: number,
    defaultAccount: string,
    onReceipt: (arg0: any) => void,
    onError: (arg0: any) => void,
    onTransactionHash?: (arg0: string) => void
  ) => {
    await new Promise((resolve) => {
      this.tokenKidFactory.methods
        .toggleOnSale(tokenId)
        .send({ from: defaultAccount })
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
}

export default TokenKidFactoryContract;

/** usage example
 * const price = new BN((9000000000000000000).toString());
 * tokenKidFactoryContract.changeTokenPrice(0, price, kit.defaultAccount);
 * tokenKidFactoryContract.toggleOnSale(0, kit.defaultAccount);
 * // setting allowance first
 * tokenKidFactoryContract.buyToken(0, price, "0x874069fa1eb16d44d622f2e0ca25eea172369bc1", kit.defaultAccount);
 * const token = await tokenKidFactoryContract.getMintedToken(0);
 */
