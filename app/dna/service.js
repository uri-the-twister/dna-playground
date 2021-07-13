const logger = require('../utils/logger');
const repository = require('./repository');

module.exports = {
    getAllSequences() {
        logger.log('[dna-service]: getting all sequences');
        return repository.getAllSequences();
    },

    getSequenceById(id) {
        logger.log(`[dna-service]: getting sequence by id "${id}"`);
        return repository.getSequenceById(id);
    },

    addSequence(seq) {
        logger.log(`[dna-service]: adding new sequence "${seq}"`);
        return repository.addSequence(seq);
    },

    removeSequenceById(id) {
        logger.log(`[dna-service]: removing sequence by id "${id}"`);
        return repository.removeSequenceById(id);
    }
};

