const Block = require('./block');
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
    this.chain = [this.createGenesisBlock()];
  }

  /**
   * @member createGenesisBlock
   * @param NULL
   * @returns
   * @memberof BlockChain
   * @description Creates the Genesis Block
   */
  createGenesisBlock() {
    return new Block(0, this.getCurrentTimestamp(), 'Genesis Block', '0');
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
  getLatestNextBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * @member addBlock
   * @returns
   * @param {*} newBlock
   * @memberof BlockChain
   * @description It creates new blockchain
   */
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestNextBlock().hash;
    newBlock.hash = newBlock.hashBlock();
    this.chain.push(newBlock);
  }
}

// We export the Block class so it can be require()'d in other files.
module.exports = BlockChain;
