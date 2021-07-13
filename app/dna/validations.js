module.exports = {
    validateSequence(payload) {
        if (!payload)
            throw new Error("Missing payload")

        if (!payload.seq)
            throw new Error("Missing sequence in payload");

        if (typeof payload.seq !== 'string')
            throw new Error("Sequence must be a string");

        if (payload.seq.trim().length === 0)
            throw new Error("Sequence cannot be empty");

        if (/^[atgc]+$/i.test(payload.seq) === false)
            throw new Error("Invalid sequence (can only include A,T,G,C)");
    }
};