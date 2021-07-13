const sequences = require('./sequences');
const logger = require('../utils/logger');


module.exports = {
    getAllSequences() {
        logger.log('[dna-repository]: getting all sequences');
        return sequences;
    },

    getSequenceById(id) {
        logger.log(`[dna-repository]: getting sequence by id "${id}"`);
        const result = sequences.find(x => x.id === id);

        if (result)
            logger.log(`[dna-repository]: sequence "${id}" found`);
        else
            logger.log(`[dna-repository]: sequence "${id}" not found`);

        return result;
    },

    addSequence(seq) {
        logger.log(`[dna-repository]: adding new sequence "${seq}"`);
        
        const nextId = 'Seq-' + (sequences.length + 1);
        logger.log(`[dna-repository]: new sequence id is "${nextId}"`);
        
        sequences.push({
            id: nextId,
            seq
        });
        
        logger.log(`[dna-repository]: sequence "${nextId}" added successfully`);
        return nextId;
    },

    removeSequenceById(id) {
        logger.log(`[dna-repository]: about to remove sequence with id "${id}"`);
        const sequenceIndex = sequences.findIndex(x => x.id === id);

        if (sequenceIndex > -1) {
            sequences.splice(sequenceIndex, 1);
            logger.log(`[dna-repository]: sequence "${id}" removed`);
        }
        else {
            logger.log(`[dna-repository]: sequence "${id}" not found (nothing removed)`);
        }
    }
};

