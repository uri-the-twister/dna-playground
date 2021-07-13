const scores = require('./scores');
const logger = require('../utils/logger');

module.exports = {
    getAllScores() {
        logger.log('[scoring-repository]: getting all sequences');
        return scores;
    },

    getScoreById(id) {
        logger.log(`[scoring-repository]: getting score by id "${id}"`);
        const result = scores.find(x => x.id === id);

        if (result)
            logger.log(`[scoring-repository]: score "${id}" found`);
        else
            logger.log(`[scoring-repository]: score "${id}" not found`);

        return result;
    },

    addScoreJobForSeqId(seqId) {
        logger.log(`[scoring-repository]: adding new score job for sequence "${seqId}"`);
        
        const nextId = 'Score-Job-' + (scores.length + 1);
        logger.log(`[scoring-repository]: score job id is "${nextId}"`);

        scores.push({
            id: nextId,
            seqId: seqId,
            score: null,
            createdAt: Date.now()
        });

        logger.log(`[scoring-repository]: score job "${nextId}" created successfully`);
        return nextId;
    },

    updateResultByJobId(newScoreJobId, result) {
        logger.log(`[scoring-repository]: updating score job "${newScoreJobId}" with result "${result}"`);

        const scoreJob = scores.find(x => x.id === newScoreJobId);
        scoreJob.score = result;

        logger.log(`[scoring-repository]: updating score job "${newScoreJobId}" complete`);
    }
};

