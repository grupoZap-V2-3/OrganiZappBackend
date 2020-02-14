const functions = require('firebase-functions');
const server = require('./server/index');
const firebaseFunctionConfig = {
    memory: '2GB',
    timeoutSeconds: 120
};
const express = functions.runWith(firebaseFunctionConfig).https.onRequest(server);

module.exports.api = {
    express,
};
