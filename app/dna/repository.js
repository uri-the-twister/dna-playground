// Load our pre-configured sequences
const sequences = require('./sequences');

module.exports = {
    getAllSequences() {
        return sequences;
    },

    getSequenceById(id) {
        return sequences.find(x => x.id === id);
    },

    addSequence(seq) {
        const nextId = 'Seq-' + (sequences.length + 1);
        
        sequences.push({
            id: nextId,
            seq
        });

        return nextId;
    },

    removeSequenceById(id) {
        const sequenceIndex = sequences.findIndex(x => x.id === id);

        if (sequenceIndex > -1) {
            sequences.splice(sequenceIndex, 1);
        }
    }
};

