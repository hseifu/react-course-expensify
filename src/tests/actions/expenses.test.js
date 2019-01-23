import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import { Exception } from 'handlebars';

test("should setup remove expense action object", () => {
    const action = removeExpense('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        removeId: '123abc'
    })
});

test("should setup edit expense action object", () => {
    const action = editExpense('123abc', {note: 'new note value', amount: 6700});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            amount: 6700,
            note: 'new note value'
        }
    })
})

test("should setup add expense action object with provided values", () => {
    const expenseData = {
        description: 'rent',
        amount: 50000,
        createdAt: 1000,
        note: 'Last month\'s note'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test("should setup the add expense action object with default values", () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            note: "",
            description: '',
            amount: 0,
            createdAt: 0
        }
    })
})