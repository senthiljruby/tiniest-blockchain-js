'use strict';

let path = require('path');
let rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  root: rootPath,
  listening_port: '3000',
  timeOutDelay: 60000
};
