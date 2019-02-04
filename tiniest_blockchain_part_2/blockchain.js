const Block = require('./block');
const axios = require('axios');

/**
 *
 *
 * @class BlockChain
 */
class BlockChain {
  /**
   * Creates an instance of BlockChain.
   * @memberof BlockChain
  */
  constructor() {
    this.transactions = [];
    this.chain = [this.createGenesisBlock()];
  }

  getBlockChain () {
    return this.chain;
  }

  createTransaction (transactionInfo) {
    this.transactions.push(transactionInfo);
  }

  mineNewBlock (minerAddress) {
    if (!this.transactions.length) {
      return null;
    }
    const nextLatestBlock = this.chain[this.chain.length - 1];

    const proof = this.proofOfWork(nextLatestBlock.data.proofOfWork);

    this.createTransaction({
      from: 'network',
      to: minerAddress,
      amount: 1,
      createdAt: Date.now()
    })

    const newBlock = this.getLatestNextBlock(nextLatestBlock, {
      transactions: this.transactions,
      proofOfWork: proof
    })

    this.transactions = [];

    this.chain.push(newBlock);

    return newBlock;
  }

  async consensus () {
    const peerBlockChains = await this.discoverPeerChains();

    let longestChain = this.chain;

    for (let chain of peerBlockChains) {
      if (chain.length > longestChain.length) {
        longestChain = chain;
      }
    }

    this.chain = longestChain;
  }

  async discoverPeerChains () {
    const peerChains = []

    const peersList = process.env.PEERS.split(',')

    for (let peerUrl of peersList) {
      const peerChain = await axios.get(`${peerUrl}/api/blocks`);

      peerChains.push(peerChain);
    }

    return peerChains;
  }

  proofOfWork (lastProof) {
    let incrementor = lastProof + 1;

    while (!(incrementor % 9 === 0 && incrementor % lastProof === 0)) {
      incrementor += 1;
    }

    return incrementor;
  }

  /**
   * @member createGenesisBlock
   * @param NULL
   * @returns
   * @memberof BlockChain
   * @description Creates the Genesis Block
   */
  createGenesisBlock() {
    return new Block(
      0,
      this.getCurrentTimestamp(),
      {
        name: 'Genesis block',
        proofOfWork: 9
      },
      '0'
    );
  }

  /**
   * @member getCurrentTimestamp
   * @param NULL
   * @returns
   * @memberof BlockChain
   * @description Get the Current Timestamp
   */
  getCurrentTimestamp() {
    return new Date();
  }

  /**
   * @member getLatestNextBlock
   * @param NULL
   * @returns
   * @memberof BlockChain
   * @description Get the latest block values.
   */
  getLatestNextBlock (latestBlock, data) {
    return new Block(
      latestBlock.index + 1,
      Date.now(),
      data,
      latestBlock.hash
    )
  }
}

// We export the Block class so it can be require()'d in other files.
module.exports = BlockChain;
