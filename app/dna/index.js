const express = require('express');
const api = express.Router();

api.get('/', (req, res) => {
    // #swagger.summary = 'Get all the DNA sequences'

    res.json({
        message: 'success',
        data: [
            {
                id: 1,
                sequence: 'ATGCATGCATGC'
            },

            {
                id: 2,
                sequence: 'ATGCATGCATGC'
            }
        ]
    });
});


api.get('/:id', (req, res) => {
    // #swagger.summary = 'Get a DNA Sequence by id'

    res.json({
        message: 'success',
        data: {
            id: req.params.id,
            sequence: 'ATGCATGCATGC'
        }
    });
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