import { createStore } from 'redux';

// Action Generator

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({ count = 0 } = {}) => ({
    type: 'SET',
    count
})

const resetCount = () => ({type: 'RESET', count:0})

//Reducers

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
        return {
            count: action.count
        }
        default:
            return state;
    }
}

const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(incrementCount());

store.dispatch(incrementCount());

store.dispatch(incrementCount({incrementBy: 5}));


store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(setCount({count: 101}));

store.dispatch(resetCount());