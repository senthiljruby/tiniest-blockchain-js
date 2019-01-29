// Required Imports for calculating the sha algorithm.
const SHA256 = require('crypto-js/sha256');

/**
 *
 *
 * @class Block
 */
class Block {
  /**
   * Creates an instance of Block.
   * @param {*} index
   * @param {*} timestamp
   * @param {*} data
   * @param {string} [previousHash='']
   * @memberof Block
   */
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.hashBlock();
  }

  /**
   * @member hashBlock
   * @memberof Block
   * @param NULL
   * @returns
   * @description It will create the blockchain with the sha256 algorithm (With index, previoushash, timestamp and data)
   */
  hashBlock() {
    let _stringifiedData = JSON.stringify(this.data);
    return SHA256(this.index + this.previousHash + this.timestamp + _stringifiedData).toString();
  }
}

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


// It creates the new Object instance of the class BlockChain
let _blockChains = new BlockChain();


// Call function for the creating the blockchain.
initializeBlocks();

function initializeBlocks() {
  for (let i = 1; i < 21; i++) {
    _blockChains.addBlock(new Block(i, _blockChains.getCurrentTimestamp(), { amount: 10 }));
    let _blockChain = _blockChains.chain[i];
    console.log(`Block #${_blockChain.index} has been added to the blockchain!.`);
    console.log(`Hash: ${_blockChain.hash}\n`);
  }
}
