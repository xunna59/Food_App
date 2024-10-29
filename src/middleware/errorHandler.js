const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.errors.map(e => e.message),
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            error: 'Unique Constraint Error',
            details: err.errors.map(e => e.message),
        });
    }


    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
