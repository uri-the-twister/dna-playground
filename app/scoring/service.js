const repository = require('./repository');
const dnaService = require('../dna/service');

const MIN_SCORE_DURATION = 12;
const MAX_SCORE_DURATION = 30;

module.exports = {
    getAllScores() {
        return repository.getAllScores();
    },

    getScoreById(id) {
        return repository.getScoreById(id);
    },

    scoreSequenceById(seqId) {
        const sequenceToScore = dnaService.getSequenceById(seqId);

        if (sequenceToScore) {
            const newScoreJobId = repository.addScoreJobForSeqId(seqId);
            const randomScoreResult = Math.random() > 0.5 ? "Good" : "Bad";
            const randomScoreDuration = Math.floor(Math.random() * (MAX_SCORE_DURATION - MIN_SCORE_DURATION + 1) + MIN_SCORE_DURATION) * 1000;
            
            setTimeout(() => {
                repository.updateResultByJobId(newScoreJobId, randomScoreResult);
            }, randomScoreDuration);

            return newScoreJobId;
        }
        else {
            throw new Error(`Could not find sequence with id ${seqId}`);
        }
    },
};

