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

module.exports = Block;