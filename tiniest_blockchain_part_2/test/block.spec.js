const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
let path = require('path');
const SHA256 = require('crypto-js/sha256');

// Import the Block class.
const Block = require(path.join(__dirname, '..', 'block.js'));

describe('Simple Tiniest Blockchain Testcase (block.js)', () => {
  describe('Create a blocks', () => {
    describe('#check Instances of Block', () => {
      it('should check the new Block() is instance of class Block', () => {
        expect(new Block()).to.be.an.instanceof(Block);
      });
    });

    describe('#constructor()', () => {
      it('should check the constructor with default value', () => {
        let _block = new Block();
        expect(_block.index).to.be.an('undefined');
        expect(_block.index).to.be.undefined;
        expect(_block.timestamp).to.be.an('undefined');
        expect(_block.timestamp).to.be.undefined;
        expect(_block.data).to.be.an('undefined');
        expect(_block.data).to.be.undefined;
        expect(_block.index).to.not.equal('undefined');
      });

      it('should check the constructor with only index as a parameters', () => {
        let _block = new Block(1);
        expect(_block.index).to.equal(1);
        expect(_block.index).to.not.be.undefined;
        expect(_block.timestamp).to.be.an('undefined');
        expect(_block.timestamp).to.be.undefined;
        expect(_block.data).to.be.an('undefined');
        expect(_block.data).to.be.undefined;
        expect(_block.index).to.not.equal('undefined');
      });

      it('should check the constructor with only Timestamp as a parameter', () => {
        let _currentTimestamp = new Date();
        let _block = new Block(undefined, _currentTimestamp);
        expect(_block.index).to.be.an('undefined');
        expect(_block.index).to.be.undefined;
        expect(_block.timestamp).to.be.equal(_currentTimestamp);
        expect(_block.timestamp).to.not.be.undefined;
        expect(_block.data).to.be.an('undefined');
        expect(_block.data).to.be.undefined;
        expect(_block.index).to.not.equal('undefined');
      });

      it('should check the constructor with only data as a parameter', () => {
        let _data = { amount: 100 };
        let _block = new Block(undefined, undefined, _data);
        expect(_block.index).to.be.an('undefined');
        expect(_block.index).to.be.undefined;
        expect(_block.timestamp).to.be.an('undefined');
        expect(_block.timestamp).to.be.undefined;
        expect(_block.data).to.be.equal(_data);
        expect(_block.data).to.not.be.undefined;
        expect(_block.index).to.not.equal('undefined');
      });

      it('should check the constructor with all required as a parameter', () => {
        let _data = { amount: 100 };
        let _currentTimestamp = new Date();
        let _block = new Block(1, _currentTimestamp, _data);
        expect(_block.index).to.be.equal(1);
        expect(_block.index).to.not.be.undefined;
        expect(_block.timestamp).to.be.equal(_currentTimestamp);
        expect(_block.timestamp).to.not.be.undefined;
        expect(_block.data).to.be.equal(_data);
        expect(_block.data).to.not.be.undefined;
        expect(_block.index).to.not.equal('undefined');
      });
    });

    describe('#hashBlock', () => {
      it('should check the hash block with the parameters', () => {
        let _data = { amount: 100 };
        let _currentTimestamp = new Date();
        let _block = new Block(1, _currentTimestamp, 0, _data);
        let _generateHashBlock = _block.hashBlock();
        expect(_generateHashBlock).to.not.be.undefined;
        expect(_generateHashBlock).to.not.be.null;
        expect(_generateHashBlock).to.not.be.NaN;
        expect(_generateHashBlock).to.have.lengthOf(64);
      });

      it('should not generate same hash value when generated with those again with algorithm', () => {
        let _data = { amount: 100 };
        let _currentTimestamp = new Date();
        let _stringifiedData = JSON.stringify(_data);
        let _hashedValue = SHA256(1 + 0 + _currentTimestamp + _stringifiedData).toString();
        let _block = new Block(1, 0, _currentTimestamp, _data);
        let _generateHashBlock = _block.hashBlock();

        expect(_generateHashBlock).to.not.be.undefined;
        expect(_generateHashBlock).to.not.be.null;
        expect(_generateHashBlock).to.not.be.NaN;
        expect(_generateHashBlock).to.have.lengthOf(64);

        expect(_hashedValue).to.not.be.undefined;
        expect(_hashedValue).to.not.be.null;
        expect(_hashedValue).to.not.be.NaN;
        expect(_hashedValue).to.have.lengthOf(64);

        expect(_generateHashBlock).to.not.equal(_hashedValue);
      });
    });
  });
});