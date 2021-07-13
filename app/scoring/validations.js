module.exports = {
    validateSequenceId(payload) {
        if (!payload)
            throw new Error("Missing payload")

        if (!payload.sequenceId)
            throw new Error("Missing sequence id in payload");

        if (typeof payload.sequenceId !== 'string')
            throw new Error("Sequence id must be a string");

        if (payload.sequenceId.trim().length === 0)
            throw new Error("Sequence id cannot be empty");

        if (/^Seq\-\d+$/i.test(payload.sequenceId) === false)
            throw new Error("Invalid sequence id");
    }
};