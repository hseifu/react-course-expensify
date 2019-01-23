import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/cofigureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, setEndDate, setStartDate, sortByAmount, sortByDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import initialize from'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

// Add expense Water bill
store.dispatch(addExpense({
    description: 'Water bill', 
    note: 'Finally got it all done', 
    amount: 8000,
    createdAt: 999
}));

// Add expense gas bill
store.dispatch(addExpense({
    description: 'Gas bill', 
    note: 'Halogen Gas is expensive', 
    amount: 29400, 
    createdAt: 172019
}));

// Add expense Rent
store.dispatch(addExpense({
    description: 'Rent', 
    note: 'Rent Payment', 
    amount: 109500,
    createdAt: 1000
}));


const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));