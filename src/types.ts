export interface IReceipt {
  blockHash: string;
  blockNumber: number;
  contractAddress: string | null;
  cumulativeGasUsed: number;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: boolean;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  events: {
    Transfer: {
      address: string;
      blockNumber: number;
      transactionHash: string;
      transactionIndex: number;
      blockHash: string;
      logIndex: number;
      removed: boolean;
      id: string;
      returnValues: {
        0: string;
        1: string;
        2: string;
        from: string;
        to: string;
        tokenId: string;
      };
      event: string;
      signature: string;
      raw: {
        data: string;
        topics: string[];
      };
    };
  };
}

export interface ICreateStates {
  upload: {
    loading: boolean;
    done: boolean;
    error: boolean;
  };
  txHash: {
    loading: boolean;
    done: boolean;
    error: boolean;
  };
  mint: {
    loading: boolean;
    done: boolean;
    error: boolean;
  };
}
