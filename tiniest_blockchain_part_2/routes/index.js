const _ = require('lodash');
const Blockchain = require('../blockchain');

class Routes {
  constructor() {
    this.initialText = 'Welcome to my Tinest blockchain';
    this.blockchain = new Blockchain();
  }

  rootApp(req, res, next) {
    res.json({ initialText: this.initialText });
  }

  createTransactions(req, res, next) {
    this.blockchain.createTransaction({
      ...req.payload,
      createdAt: Date.now()
    })

    res.json({ success: true, message: 'Successfully Created Transaction' });
  }

  getTransactions(req, res, next) {
    let blocks = this.blockchain.getBlockChain();
    let _flattenTransactionArray = _.flatten(blocks.map(block => block.data.transactions));
    let transactions = _flattenTransactionArray.filter(transaction => transaction != null);

    transactions.forEach((transaction) => (
      {
        ...transaction, createdAt: new Date(transaction.createdAt).toUTCString()
      }
    ));

    res.json(transactions);
  }

  getBlocks(req, res, next) {
    const blocks = this.blockchain.getBlockChain();
    res.json(blocks);
  }

  getMineByAddress(req, res, next) {
    let blockInfo = this.blockchain.mineNewBlock(req.params.address);
    let message = blockInfo ? 'Block mined successfully' : 'No Blocks to mine..';

    res.json({
      message,
      blockInfo
    });
  }

  getBalanceOfAddress(req, res, next) {
    const blocks = this.blockchain.getBlockChain();
    let _flattenTransactionArray = _.flatten(blocks.map(block => block.data.transactions));
    const userTransactions = _flattenTransactionArray.filter(transaction =>
      transaction != null && (transaction.to === req.params.userAddress || transaction.from === req.params.userAddress)
    );

    let accountBalance = userTransactions.reduce((accountBalance, currentBalance) => {
      if (currentBalance.to === req.params.userAddress) {
        return accountBalance + currentBalance.amount;
      } else if (curr.from === req.params.userAddress) {
        return accountBalance - currentBalance.amount;
      }
    }, 0);

    res.json({
      accountBalance,
      userTransactions
    });
  }
}

module.exports = function (app) {
  var routes = new Routes();
  // app.get('/', routes.rootApp.bind(routes));
  app.post('/api/v1/transaction', routes.createTransactions.bind(routes)); // For Creating Transactions
  app.get('/api/v1/transactions', routes.getTransactions.bind(routes)); // Getting the transactions
  app.get('/api/v1/blocks', routes.getBlocks.bind(routes)); // Getting the blocks
  app.get('/api/v1/mine/:address', routes.getMineByAddress.bind(routes)); // Mine the blocks based on the address
  app.get('/api/v1/balance/:userAddress', routes.getBalanceOfAddress.bind(routes)); // Get the user balance based on the userAddress
}
