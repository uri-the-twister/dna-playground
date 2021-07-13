const repository = require('./repository');
const dnaService = require('../dna/service');

module.exports = {
    getAllScores() {
        return repository.getAllScores();
    },

    getScoreById(id) {
        return repository.getScoreById(id);
    },

    scoreSequenceById(seqId) {
        const sequenceToScore = dnaService.getSequenceById(seqId);

        if (sequenceToScore)
            return repository.scoreSequenceById(seqId);
        else
            throw new Error(`Could not find sequence with id ${seqId}`);
    },
};

