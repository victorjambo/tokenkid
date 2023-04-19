import BN from "bn.js";
import { ITokenInfo, ITokenPriceHistory } from "@/state/tokens/types";
import { TOKEN_KID_FACTORY_ABI } from "../abi/TokenKidFactory";
import { fromWei } from "@/utils/weiConversions";
import ContractBase from "./base";
import { RPC_URL } from "@/utils/tokens";
import { ethers } from "ethers";

class TokenKidContract extends ContractBase {
  constructor(contractAddress: `0x${string}`) {
    super(contractAddress, TOKEN_KID_FACTORY_ABI);
  }

  safeMint = async (
    tokenName: string,
    price: number | string | BN,
    tokenURI: string,
    tokenDesc: string
  ) => {
    return await this.write("safeMint", [
      tokenName,
      price,
      tokenURI,
      tokenDesc,
    ]);
  };

  buyToken = async (
    tokenId: number,
    price: number,
    token: `0x${string}`,
    from: `0x${string}`
  ) => {
    return await this.write("buyToken", [tokenId, token], {
      from,
      value: price,
    });
  };

  getMintedToken = async (tokenId: number): Promise<ITokenInfo> => {
    try {
      const _token: Array<string | BN | boolean | number> = await this.read(
        "getMintedToken",
        [tokenId]
      );
      const _tokenId = _token[0]?._isBigNumber
        ? _token[0].toNumber()
        : _token[0];

      return {
        tokenId: _tokenId,
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
  ): Promise<ITokenPriceHistory[] | null> => {
    try {
      return (await this.read("getTokenPriceHistory", [
        tokenId,
      ])) as ITokenPriceHistory[];
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  changeTokenPrice = async (tokenId: number, price: number | string | BN) =>
    await this.write("changeTokenPrice", [tokenId, price]);

  toggleOnSale = async (tokenId: number) =>
    await this.write("toggleOnSale", [tokenId]);

  burnToken = async (tokenId: number) =>
    await this.write("burnToken", [tokenId]);

  getApproved = async (tokenId: number): Promise<`0x${string}` | null> => {
    try {
      const address: unknown = await this.read("getApproved", [tokenId]);
      return address as `0x${string}`;
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  isApprovedForAll = async (owner: `0x${string}`): Promise<boolean | null> => {
    try {
      const isApproved: unknown = await this.read("isApprovedForAll", [
        owner,
        this.contractAddress,
      ]);
      return isApproved as boolean;
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };

  approve = async (tokenId: number) =>
    await this.write("approve", [this.contractAddress, tokenId]);

  setApprovalForAll = async (_approved: boolean) =>
    await this.write("setApprovalForAll", [this.contractAddress, _approved]);

  static getMintedTokenWithProvider = async (
    tokenId: number,
    address: string
  ): Promise<ITokenInfo> => {
    try {
      const provider = new ethers.providers.InfuraProvider(
        null,
        "472f14ceadff4381b88efde2365064b0"
      );
      const signer = provider.getSigner();
      const tokenKidContract = new ethers.Contract(
        address,
        TOKEN_KID_FACTORY_ABI,
        signer
      );
      const _token = await tokenKidContract.getMintedToken(tokenId);

      const _tokenId = _token[0]?._isBigNumber
        ? _token[0].toNumber()
        : _token[0];

      return {
        tokenId: _tokenId,
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

  static getApprovedWithProvider = async (
    tokenId: number,
    address: string
  ): Promise<`0x${string}` | null> => {
    try {
      const provider = new ethers.providers.InfuraProvider(
        null,
        "472f14ceadff4381b88efde2365064b0"
      );
      const signer = provider.getSigner();
      const tokenKidContract = new ethers.Contract(
        address,
        TOKEN_KID_FACTORY_ABI,
        signer
      );
      const approvedAddress: `0x${string}` = await tokenKidContract.getApproved(
        tokenId
      );
      return approvedAddress;
    } catch (error) {
      console.log({ error }); // TODO: handle this
      return null;
    }
  };
}

export default TokenKidContract;
