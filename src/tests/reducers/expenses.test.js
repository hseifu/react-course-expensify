import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test("should setup default state", () => {
    const state = expensesReducer(undefined,{ type: '@@INIT ' });
    expect(state).toEqual([])
})

test("should remove expense by id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        removeId: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
})

test("should not remove expense if id not found", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        removeId: 4
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test("should add expense provided", () => {
    const expense = {
        id: 3,
        description: "credit card",
        note: "",
        amount: 45000,
        createdAt: moment(0).add(4, "days").valueOf(),
    }
    const action = {
        type: "ADD_EXPENSE",
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses.concat(expense));
})

test("should edit expense", () => {
    const someTime = moment().add(4, "month");
    const action = {
        type: "EDIT_EXPENSE",
        id: '1',
        updates: {
            id: '5',
            description: "new descript",
            note: "new not",
            amount: 2,
            createdAt: someTime
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([{id: '5',
        description: "new descript",
        note: "new not",
        amount: 2,
        createdAt: someTime}, 
        expenses[1],
        expenses[2]]);
})

test("should not edit expense if id not found", () => {
    const someTime = moment().add(4, "month");
    const action = {
        type: "EDIT_EXPENSE",
        id: 5,
        updates: {
            id: 9,
            description: "new descript",
            note: "new not",
            amount: 2,
            createdAt: someTime
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test("Should set expenses", () => {
    const action = {
        type: "SET_EXPENSES",
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
})