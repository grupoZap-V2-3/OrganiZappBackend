const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('../routes/index');
const admin = require('firebase-admin');
admin.initializeApp();

// Apply Middlewares
app.use(cors({ origin: false }));
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Fallback route
app.get('*', (_req, res) => {
    res.status(404).json({
        success: false,
        data: 'Not found'
    })
});

// error handler, send stacktrace only during development
// TODO: improve error status codes.
app.use((err, _req, res) =>
    res.status(400).json({
        message: err.message
    })
)

module.exports = app;
