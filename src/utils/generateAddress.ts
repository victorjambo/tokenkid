export const generateAddress = (account, address) => {
  if (account) {
    return {
      address,
    };
  }
  return {
    T: false,
  };
};
