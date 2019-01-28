import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = "testuid";
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach((expense) => {
        const {id, ...noid } = expense;
        expensesData[id] = { ...noid };
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})

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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test("Should add expenses to database and store", (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 78092,
        note: "the new one",
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});

test("Should add expenses with defaults to database and store", (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '',
                note: '', 
                amount: 0, 
                createdAt: 0
            }
        });
        
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            description: '',
            note: '', 
            amount: 0, 
            createdAt: 0
        });
        done();
    })
});

test("Should setup set expenses action object with data", () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test("Should fetch the expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    })
})

test("should remove expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startRemoveExpense(expenses[1].id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            removeId: expenses[1].id
        });
        return database.ref(`users/${uid}/expenses${expenses[1].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
})

test("should edit expense inside firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const updates = {
        note: 'new new one'
    }
    store.dispatch(startEditExpense(expenses[0].id,updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: expenses[0].id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');
    }).then((snapshot) => {
        const {id, ...noid} = expenses[0];
        expect(snapshot.val()).toEqual({...noid, ...updates});
        done();
    })
})