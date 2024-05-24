import deepFreeze from 'deep-freeze';
import { initialState } from "./anecdoteReducer";
import anecdoteReducer from "./anecdoteReducer"

describe('anecdoteReducer', () => {

    const stateAtStart = initialState;

    test('vote anecdote with action anecdote/voteAnecdote', () => {
        const expectedContainState = {...stateAtStart[0], vote: stateAtStart[0].vote + 1}
        const action = {
            type: 'anecdote/voteAnecdote',
            payload: stateAtStart[0].id
        }

        deepFreeze(stateAtStart);
        const stateAtEnd = anecdoteReducer(stateAtStart, action);

        expect(stateAtEnd).toHaveLength(stateAtStart.length);
        expect(stateAtEnd).toContainEqual(expectedContainState);
    });

    test('return new state with action anecdote/addAnecdote', () => {
        const anecdoteToAdd = {
            content: 'i dont know what are you talking about'
        }
        const action = {
            type: 'anecdote/addAnecdote',
            payload: anecdoteToAdd.content
        }

        deepFreeze(stateAtStart)
        const stateAtEnd = anecdoteReducer(stateAtStart, action);

        expect(stateAtEnd).toHaveLength(stateAtStart.length + 1);
        expect(stateAtEnd.map(a => a.content)).toContainEqual(anecdoteToAdd.content);
    })
})