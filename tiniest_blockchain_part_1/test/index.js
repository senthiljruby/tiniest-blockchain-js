const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
let path = require('path');

// Import the BlockChain class.
const BlockChain = require(path.join(__dirname, '..', 'blockchain.js'));
const Block = require(path.join(__dirname, '..', 'block.js'));

describe('Simple Tiniest Blockchain Testcase (blockchain.js)', () => {
  describe('Create a blockchain', () => {
    let _blockChain;

    beforeEach(() => {
      _blockChain = new BlockChain();
    });

    describe('#constructor()', () => {
      it('should check the constructor function and create the genesis block', function () {
        let _blockChain = new BlockChain();
        expect(_blockChain.chain[0].index).to.equal(0);
        expect(_blockChain.chain[0].data).to.equal('Genesis Block');
        expect(_blockChain.chain[0].previousHash).to.equal('0');
      });
    });

    describe('#createGenesisBlock()', () => {
      it('should create new Genesis Block', function () {
        let _genesisBlock = _blockChain.createGenesisBlock();
        expect(_genesisBlock.index).to.equal(0);
        expect(_genesisBlock.data).to.equal('Genesis Block');
        expect(_genesisBlock.previousHash).to.equal('0');
      });
    });

    describe('#getCurrentTimestamp()', () => {
      it('should get current timestamp', function () {
        let _currentTimestampForBlocks = _blockChain.getCurrentTimestamp().toString();
        let _currentDate = new Date().toString();
        expect(_currentTimestampForBlocks).to.equals(_currentDate);
      });
    });

    describe('#getLatestNextBlock()', () => {
      it('should get genesis block value when no block added', function () {
        let _currentTimestampForBlocks = _blockChain.getLatestNextBlock();
        expect(_currentTimestampForBlocks.index).to.equal(0);
        expect(_currentTimestampForBlocks.data).to.equal('Genesis Block');
        expect(_currentTimestampForBlocks.previousHash).to.equal('0');
      });
    });

    describe('#addBlock()', () => {
      it('should get genesis block value when no block added', function () {
        let _currentTimestampForBlocks = _blockChain.getLatestNextBlock();
        expect(_currentTimestampForBlocks.index).to.equal(0);
        expect(_currentTimestampForBlocks.data).to.equal('Genesis Block');
        expect(_currentTimestampForBlocks.previousHash).to.equal('0');

        _blockChain.addBlock(new Block(1, _blockChain.getCurrentTimestamp(), { amount: 10 }));
        let _getLatestNextBlock = _blockChain.getLatestNextBlock();

        expect(_getLatestNextBlock.index).to.not.equal(0);
        expect(_getLatestNextBlock.data).to.not.equal('Genesis Block');
        expect(_getLatestNextBlock.previousHash).to.not.equal(_currentTimestampForBlocks.index);
        expect(_getLatestNextBlock.index).to.equal(1);
        expect(_getLatestNextBlock.data.amount).to.equal(10);
        expect(_getLatestNextBlock.previousHash).to.equal(_currentTimestampForBlocks.hash);
      });
    });
  });
});