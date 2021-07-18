const repository = require('./repository');
const logger = require('../utils/logger');
const dnaService = require('../dna/service');

const MIN_SCORE_DURATION = 12;
const MAX_SCORE_DURATION = 30;
const MAX_SEQUENCES_TO_ALLOW_SCORING = 5;

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

        // FAILS ON PURPOSE: Let's see if the candidate figures out that they need to delete some sequences before they
        // can continue scoring
        if (dnaService.getAllSequences().length > MAX_SEQUENCES_TO_ALLOW_SCORING)
            throw new Error(`Oof. Looks like we're out of memory. We only have memory for ${MAX_SEQUENCES_TO_ALLOW_SCORING} sequences to score at a time`);

        const sequenceToScore = dnaService.getSequenceById(seqId);

        if (sequenceToScore) {
            logger.log(`[scoring-service]: sequence "${seqId}" found`);

            // FAILS ON PURPOSE: Let's see how the candidate handles a broken scoring process
            // (we ask him to upload this sequence in the exercise intentionally)
            if (sequenceToScore.seq === 'AAAATTTTGGGGCCCC')
                return;
            
            const newScoreJobId = repository.addScoreJobForSeqId(seqId);
            logger.log(`[scoring-service]: created new score job "${newScoreJobId}"`);
            
            const randomScoreResult = Math.random() > 0.5 ? "Good" : "Bad";
            logger.log(`[scoring-service]: random result for "${newScoreJobId}" is "${randomScoreResult}"`);
            
            let randomScoreDuration = Math.floor(Math.random() * (MAX_SCORE_DURATION - MIN_SCORE_DURATION + 1) + MIN_SCORE_DURATION) * 1000;

            // FAILS ON PURPOSE: Let's see how the candidate handles a broken scoring process
            // (we ask him to upload this sequence in the exercise intentionally)
            if (sequenceToScore.seq === 'ATATGGG') {
                randomScoreDuration = 'NEVER!! MUAHAHAHAHA!'
            }
            else {
                setTimeout(() => {
                    logger.log(`[scoring-service]: score "${newScoreJobId}" finished`);
                    repository.updateResultByJobId(newScoreJobId, randomScoreResult);
                    
                }, randomScoreDuration);
            }
            
            logger.log(`[scoring-service]: random score duration for "${newScoreJobId}" is "${randomScoreDuration}"`);
            return newScoreJobId;
        }
        else {
            logger.log(`[scoring-service]: sequence "${seqId}" not found`);
            throw new Error(`Could not find sequence with id ${seqId}`);
        }
    },
};

