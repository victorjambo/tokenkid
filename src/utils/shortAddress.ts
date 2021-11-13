export const shortAddress = (address: string) => {
  if (!address) return;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
