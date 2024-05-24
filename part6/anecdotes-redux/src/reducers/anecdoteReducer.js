const anecdotesAtStart = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const generateId = () => {
    return Number((Math.random() * 100000).toFixed(0));
};

const asObject = (anecdote) => {
    return {
        content: anecdote,
        vote: 0,
        id: generateId(),
    };
};

export const initialState = anecdotesAtStart.map((a) => asObject(a));

const anecdoteReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case "VOTE":
            const id = action.payload.id;
            const anecdoteToVote = state.find(a => a.id === id);
            const votedAnecdote = {
                ...anecdoteToVote,
                vote: anecdoteToVote.vote + 1
            }
            return state.map(a => a.id !== id ? a : votedAnecdote);
        case "NEW_ANECDOTE":
            return [...state, action.payload]
        default:
            return state;
    }
};

export const voteAnecdote = (id) => {
    return {
        type: "VOTE",
        payload: { id: id }
    }
}

export const addAnecdote = (content) => {
    return {
        type: "NEW_ANECDOTE",
        payload: {
            content: content,
            vote: 0,
            id: generateId()
        }
    }
}

export default anecdoteReducer;
