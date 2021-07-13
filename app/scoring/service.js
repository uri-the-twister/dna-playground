const repository = require('./repository');
const logger = require('../utils/logger');
const dnaService = require('../dna/service');

const MIN_SCORE_DURATION = 12;
const MAX_SCORE_DURATION = 30;

module.exports = {
    getAllScores() {
        logger.log('[scoring-service]: getting all scores');
        return repository.getAllScores();
    },

    getScoreById(id) {
        logger.log(`[scoring-service]: getting score by id "${id}"`);
        return repository.getScoreById(id);
    },

    scoreSequenceById(seqId) {
        logger.log(`[scoring-service]: about to score sequence "${seqId}"`);
        const sequenceToScore = dnaService.getSequenceById(seqId);

        if (sequenceToScore) {
            logger.log(`[scoring-service]: sequence "${seqId}" found`);
            
            const newScoreJobId = repository.addScoreJobForSeqId(seqId);
            logger.log(`[scoring-service]: created new score job "${newScoreJobId}"`);
            
            const randomScoreResult = Math.random() > 0.5 ? "Good" : "Bad";
            logger.log(`[scoring-service]: random result for "${newScoreJobId}" is "${randomScoreResult}"`);
            
            const randomScoreDuration = Math.floor(Math.random() * (MAX_SCORE_DURATION - MIN_SCORE_DURATION + 1) + MIN_SCORE_DURATION) * 1000;
            logger.log(`[scoring-service]: random score duration for "${newScoreJobId}" is "${randomScoreDuration}"`);
            
            setTimeout(() => {
                logger.log(`[scoring-service]: score "${newScoreJobId}" finished`);
                repository.updateResultByJobId(newScoreJobId, randomScoreResult);
                
            }, randomScoreDuration);

            return newScoreJobId;
        }
        else {
            logger.log(`[scoring-service]: sequence "${seqId}" not found`);
            throw new Error(`Could not find sequence with id ${seqId}`);
        }
    },
};

