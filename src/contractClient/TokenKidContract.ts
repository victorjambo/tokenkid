import BN from "bn.js";
import { ITokenInfo, ITokenPriceHistory } from "@/state/tokens/types";
import { TOKEN_KID_FACTORY_ABI } from "../abi/TokenKidFactory";
import { fromWei } from "@/utils/weiConversions";
import ContractBase from "./base";

class TokenKidContract extends ContractBase {
  constructor(chainId: number) {
    super(chainId, TOKEN_KID_FACTORY_ABI);
  }

  safeMint = async (
    tokenName: string,
    price: number | BN,
    tokenURI: string,
    tokenDesc: string
  ) => {
    const safeMint = await this.write("safeMint", [
      tokenName,
      price,
      tokenURI,
      tokenDesc,
    ]);
    console.log({ safeMint });
  };

  buyToken = async (tokenId: number) => {
    const buyToken = await this.write("buyToken", [tokenId]);
    console.log({ buyToken });
  };

  getMintedToken = async (tokenId: number): Promise<ITokenInfo> => {
    try {
      const _token = await this.read("getMintedToken", [tokenId]);
      console.log({ _token });

      return {
        tokenId: _token[0],
        tokenName: _token[1],
        owner: _token[2],
        previousOwner: _token[3],
        price: fromWei(_token[4]),
        tokenURI: _token[5],
        isOnSale: _token[6],
        tokenDesc: _token[7],
      };
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  getTokenPriceHistory = async (
    tokenId: number
  ): Promise<ITokenPriceHistory[]> => {
    try {
      const _tokenPriceHistory = await this.read("getTokenPriceHistory", [
        tokenId,
      ]);
      console.log({ _tokenPriceHistory });

      return _tokenPriceHistory;
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  changeTokenPrice = async (tokenId: number) => {
    const changeTokenPrice = await this.write("changeTokenPrice", [tokenId]);
    console.log({ changeTokenPrice });
  };

  toggleOnSale = async (tokenId: number) => {
    const toggleOnSale = await this.write("toggleOnSale", [tokenId]);
    console.log({ toggleOnSale });
  };

  burnToken = async (tokenId: number) => {
    const burnToken = await this.write("burnToken", [tokenId]);
    console.log({ burnToken });
  };

  getApproved = async (tokenId: number): Promise<any> => {
    try {
      const res = await this.read("getApproved", [tokenId]);
      console.log({ res });
      return res;
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  isApprovedForAll = async (owner: string): Promise<any> => {
    try {
      const res = await this.read("isApprovedForAll", [
        owner,
        this.contractAddress,
      ]);
      console.log({ res });
      return res;
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  approve = async (tokenId: number) => {
    const approve = await this.write("approve", [
      this.contractAddress,
      tokenId,
    ]);
    console.log({ approve });
  };

  setApprovalForAll = async (_approved: boolean) => {
    const setApprovalForAll = await this.write("setApprovalForAll", [
      this.contractAddress,
      _approved,
    ]);
    console.log({ setApprovalForAll });
  };
}

export default TokenKidContract;
