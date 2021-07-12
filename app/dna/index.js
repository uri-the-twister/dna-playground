const express = require('express');
const api = express.Router();

// Load our pre-configured sequences (hard coded in this playground)
const sequences = require('./sequences');


// Setup API routes
api.get('/', (req, res) => {
    // #swagger.summary = 'Get all the DNA sequences'

    res.json({
        message: 'success',
        data: sequences
    });
});


api.get('/:id', (req, res) => {
    // #swagger.summary = 'Get a DNA Sequence by id'


    const requestedSequence = sequences.find(x => x.id === req.params.id);
    if (requestedSequence) {
        res.json({
            message: 'success',
            data: requestedSequence
        });
    }
    else {
        res.status(404).json({
            message: 'not found',
            data: null
        });
    }

});


api.post('/', (req, res) => {
    // #swagger.summary = 'Save a new DNA Sequence on the server'

    res.json({
        message: 'success',
        data: {
            id: '123123'
        }
    });
});


module.exports = api;