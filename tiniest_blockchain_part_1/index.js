
// Import the BlockChain class.
const BlockChain = require('./blockchain');
const Block = require('./block');

/**
 *
 *
 * @class MainApp
 */
class MainApp {
  /**
   * Creates an instance of MainApp.
   * @memberof MainApp
   */
  constructor() {
    // It creates the new Object instance of the class BlockChain
    this.blockChains = new BlockChain();
    this.blockLength = (process.argv.length > 2 && isFinite(process.argv[2])) ? parseInt(process.argv[2]) : 20;
  }

  /**
   * @member initializeMainApp
   * @param NULL
   * @returns NULL
   * @memberof MainApp
   * @description Initalizes the Blocks when the app starts 
   */
  initializeMainApp() {
    for (let i = 1; i < (this.blockLength + 1); i++) {
      this.blockChains.addBlock(new Block(i, this.blockChains.getCurrentTimestamp(), { amount: 10 }));
      let _blockChain = this.blockChains.chain[i];
      console.log(`Block #${_blockChain.index} has been added to the blockchain!.`);
      console.log(`Hash: ${_blockChain.hash}\n`);
    }
  }
}

// We export the MainApp class so it can be require()'d in other files.
module.exports = MainApp;

// Call function for the creating the blockchain.
let _mainApp = new MainApp();
_mainApp.initializeMainApp();
