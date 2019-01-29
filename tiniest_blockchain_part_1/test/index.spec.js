const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
let path = require('path');

// Import the Block class.
const Blockchain = require(path.join(__dirname, '..', 'blockchain.js'));
const MainApp = require(path.join(__dirname, '..', 'index.js'));

describe('Simple Tiniest Blockchain Testcase (index.js)', () => {
  describe('Initializes the app when it starts', () => {
    it('should check the new Block() is instance of class Block', () => {
      expect(new Blockchain()).to.be.an.instanceof(Blockchain);
    });

    it('should check the new MainApp() is instance of class MainApp', () => {
      expect(new MainApp()).to.be.an.instanceof(MainApp);
    });
  });

  describe('#constructor', () => {
    it('should check the new Block() is instance of class Block', () => {
      let _mainApp = new MainApp();
      let _blockChain = new Blockchain();
      expect(_mainApp.blockChains).to.include.all.keys('chain');
      expect(_mainApp.blockChains.chain.data).to.equal(_blockChain.chain.data);
    });

    it('should check the blocklength to default if not specified (20)', () => {
      let _mainApp = new MainApp();
      expect(_mainApp.blockLength).to.equal(20);
    });
  });

  describe('#initializeMainApp', () => {
    it('should iterate the number of default count given in the blockLength', () => {
      let _mainApp = new MainApp();
      _mainApp.initializeMainApp();
      expect(_mainApp.blockChains.chain.length).to.equal(21); // Added 21 (20 + 1(0 -> Genesis Block)))
    })

    it('should iterate the number of default count given in the blockLength', () => {
      let _mainApp = new MainApp();
      _mainApp.blockLength = 2;
      _mainApp.initializeMainApp();
      expect(_mainApp.blockChains.chain.length).to.equal(3); // Added 3 (2 + 1(0 -> Genesis Block))
    })
  })
});