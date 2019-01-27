import database from '../firebase/firebase';

//ADD EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});


//start add expense dispatch
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const { 
            description = '',
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        
        const expense = { description, note, amount, createdAt }
        
        return database.ref('expenses').push(expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }))
            })
    };
};


//Remove Expense
export const removeExpense = (removeId) => ({
    type: 'REMOVE_EXPENSE',
    removeId
})

//Edit Expense
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// Set expenses
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses')
            .once('value')
            .then((snaphot) => {
                const expenses = [];
                snaphot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setExpenses(expenses));
            })
    }
}