const repository = require('./repository');

module.exports = {
    getAllSequences() {
        return repository.getAllSequences();
    },

    getSequenceById(id) {
        return repository.getSequenceById(id);
    },

    addSequence(seq) {
        return repository.addSequence(seq);
    },

    removeSequenceById(id) {
        return repository.removeSequenceById(id);
    }
};

