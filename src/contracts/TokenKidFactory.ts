import Web3 from "web3";
import BN from "bn.js";
import { Contract } from "web3-eth-contract";
import { tokenAddresses } from "@/utils/tokenAddresses";
import { ITokenKid, ITokenPriceHistory } from "@/state/wallet/types";
import { TOKEN_KID_FACTORY_ABI } from "../abi/TokenKidFactory";

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
    tokenDesc: string,
    onReceipt: (arg0: any) => void,
    onError: (arg0: any) => void,
    onTransactionHash?: (arg0: string) => void
  ) => {
    const kit = await this.getConnectedKit();
    await new Promise((resolve) => {
      this.tokenKidFactory.methods
        .safeMint(tokenName, price, tokenURI, tokenDesc)
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
        .buyToken(tokenId, token)
        .send({ from: defaultAccount, value: price })
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
        tokenDesc: _token[7],
      };
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  getTokenPriceHistory = async (tokenId: number): Promise<ITokenPriceHistory> => {
    try {
      const _tokenPriceHistory = await this.tokenKidFactory.methods
        .getTokenPriceHistory(tokenId)
        .call();

      return {
        tokenId: _tokenPriceHistory[0],
        transferTime: _tokenPriceHistory[1],
        from: _tokenPriceHistory[2] / 10 ** 18,
        to: _tokenPriceHistory[3] / 10 ** 18,
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

  getApproved = async (tokenId: number): Promise<any> => {
    try {
      return await this.tokenKidFactory.methods
        .getApproved(tokenId)
        .call();
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  isApprovedForAll = async (owner: string): Promise<any> => {
    try {
      return await this.tokenKidFactory.methods
        .isApprovedForAll(owner, this.token)
        .call();
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  approve = async (
    tokenId: number,
    defaultAccount: string,
    onReceipt: (arg0: any) => void,
    onError: (arg0: any) => void,
    onTransactionHash?: (arg0: string) => void
  ) => {
    await new Promise((resolve) => {
      this.tokenKidFactory.methods
        .approve(this.token, tokenId)
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

  setApprovalForAll = async (
    _approved: boolean,
    defaultAccount: string,
    onReceipt: (arg0: any) => void,
    onError: (arg0: any) => void,
    onTransactionHash?: (arg0: string) => void
  ) => {
    await new Promise((resolve) => {
      this.tokenKidFactory.methods
        .setApprovalForAll(this.token, _approved)
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
