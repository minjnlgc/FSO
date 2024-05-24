import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    console.log(response);
    return response.data;
}

const createNew = async (content) => {
    const object = {
        content: content,
        votes: 0
    };
    const response = await axios.post(baseUrl, object);
    return response.data;
}

const updateVote = async (id, newAnecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, newAnecdote);
    return response.data;
}

export default {
    getAll,
    createNew,
    updateVote
}