import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
import { create } from 'domain';
//ADD EXPENSE
const addExpense = (
    { 
        description = '',
        note = '', 
        amount = 0, 
        createdAt = 0
    }) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

//Remove Expense
const removeExpense = (removeId) => ({
    type: 'REMOVE_EXPENSE',
    removeId
})

//Edit Expense
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

//Expenses reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]
        case 'REMOVE_EXPENSE':
            return state.filter(expense => expense.id !== action.removeId)
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if (expense.id ===action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
            })
        default:
            return state
    }
}

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

// set filtertext action
const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
})

//Sort by date
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

//Sort by amount
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

//Set start date
const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    date
})

//Set end date
const setEndDate = (date = undefined) => ({
    type: 'SET_END_DATE',
    date
}) 

// Filter Reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        default:
            return state
    }
}

//get visible data
const getVisibleData = (expenses, {text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const reg = new RegExp('^'+text.toLowerCase()+'|\\s'+text.toLowerCase(),'g')
        const textMatch = expense.description.toLowerCase().match(reg);
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

//Store creator
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })   
);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const visibleData = getVisibleData(state.expenses, state.filters)
    console.log(visibleData);
});

const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 900, createdAt: 1000}));
const expenseOne = store.dispatch(addExpense({description: 'School Fee', amount: 90000, createdAt: -1000}));


// store.dispatch(removeExpense(expenseOne.expense.id));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500 }))

// store.dispatch(setTextFilter('fe'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-1000));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
    expenses: [{
        id: 'someid',
        description: 'January rent',
        note: 'final rent',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}; 