const morgan = require('morgan')

morgan.token("content", (request, require) => {
    if (!request.body) {
        return;
    }
    return JSON.stringify(request.body);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


module.exports = { unknownEndpoint, morgan }