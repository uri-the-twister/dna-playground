// Load our pre-configured sequences
const scores = require('./scores');

module.exports = {
    getAllScores() {
        return scores;
    },

    getScoreById(id) {
        return scores.find(x => x.id === id);
    },

    scoreSequenceById(seqId) {
        const nextId = 'Score-Job-' + (scores.length + 1);
        
        scores.push({
            id: nextId,
            seqId: seqId,
            score: null,
            createdAt: Date.now()
        });

        return nextId;
    },
};

