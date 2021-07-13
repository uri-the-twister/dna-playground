// Load our pre-configured sequences
const scores = require('./scores');

module.exports = {
    getAllScores() {
        return scores;
    },

    getScoreById(id) {
        return scores.find(x => x.id === id);
    },

    addScoreJobForSeqId(seqId) {
        const nextId = 'Score-Job-' + (scores.length + 1);
        
        scores.push({
            id: nextId,
            seqId: seqId,
            score: null,
            createdAt: Date.now()
        });

        return nextId;
    },

    updateResultByJobId(newScoreJobId, result) {
        const scoreJob = scores.find(x => x.id === newScoreJobId);
        scoreJob.score = result;
    }
};

