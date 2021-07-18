const express = require('express');
const api = express.Router();

const logger = require('../utils/logger');
const validations = require('./validations');
const service = require('./service');


api.get('/', (req, res) => {
    // #swagger.summary = 'Get all the DNA sequences'

    const sequences = service.getAllSequences()

    res.json({
        message: 'success',
        data: sequences
    });
});

api.post('/filter', (req, res) => {
    // #swagger.summary = 'Get all the DNA sequences based on some filter'

    try {
        validations.validateFilter(req.body);
        const sequences = service.getAllSequencesByFilter(req.body.filter);

        res.json({
            message: 'success',
            data: sequences
        });
    }
    catch (e) {
        logger.log(`[dna-controller]: ${e.msg}`, {
            requestPayload: req.body
        });
        
        res.json({
            message: e.message,
            data: null
        });
    }
});

api.get('/:id', (req, res) => {
    // #swagger.summary = 'Get a DNA Sequence by id'


    const requestedSequence = service.getSequenceById(req.params.id);
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

    try {
        validations.validateSequence(req.body);
        const newSeqId = service.addSequence(req.body.seq);

        res.json({
            message: 'success',
            data: {
                id: newSeqId
            }
        });
    }
    catch (e) {
        logger.log(`[dna-controller]: ${e.msg}`, {
            requestPayload: req.body
        });
        
        res.json({
            message: e.message,
            data: null
        });
    }
});

api.delete('/:id', (req, res) => {
    service.removeSequenceById(req.params.id);

    res.json({
        message: 'success',
        data: 'null'
    });
});

module.exports = api;