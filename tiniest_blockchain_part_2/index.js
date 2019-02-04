const express = require('express');

// Import the BlockChain class.
const BlockChain = require('./blockchain');
const Block = require('./block');
const Routes = require('./routes/index');
const Config = require('./config');

const app = express();
// Integrating the routes into app
let _routes = new Routes(app);

app.listen(Config.listening_port, () => {
  console.log(`Info: Application started on http://localhost:${Config.listening_port}`);
})