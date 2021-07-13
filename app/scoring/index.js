const express = require('express');
const api = express.Router();

const validations = require('./validations');
const service = require('./service');


api.get('/', (req, res) => {
    // #swagger.summary = 'Get all the scores'

    const scores = service.getAllScores()

    res.json({
        message: 'success',
        data: scores
    });
});

api.get('/:id', (req, res) => {
    // #swagger.summary = 'Get a score by job id'


    const requestedScore = service.getScoreById(req.params.id);
    if (requestedScore) {
        res.json({
            message: 'success',
            data: requestedScore
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
    // #swagger.summary = 'Score a sequence by it's Seq-Id'

    try {
        validations.validateSequenceId(req.body);
        const newScoreJobId = service.scoreSequenceById(req.body.sequenceId);

        res.json({
            message: 'started',
            data: {
                id: newScoreJobId
            }
        });
    }
    catch (e) {
        res.json({
            message: e.message,
            data: null
        });
    }
});

module.exports = api;