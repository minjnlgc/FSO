const morgan = require('morgan')

morgan.token("content", (request, require) => {
    if (!request.body) {
        return;
    }
    return JSON.stringify(request.body);
})

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message });
    }

    next(error);
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


module.exports = { unknownEndpoint, errorHandler, morgan }