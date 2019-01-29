
// Import the BlockChain class.
const BlockChain = require('./blockchain');
const Block = require('./block');

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
