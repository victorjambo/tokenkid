import Web3 from "web3";
import BN from "bn.js";

/**
 * Convert amount to wei
 * @param amount 
 * @returns BN
 */
export const toWei = (amount: number | string): BN => {
  return Web3.utils.toWei(new BN(amount.toString()));
};

/**
 * Convert amount from wei
 * @param amount 
 * @returns number
 */
export const fromWei = (amount: number | string): number => {
  return +amount / 10 ** 18;
};
