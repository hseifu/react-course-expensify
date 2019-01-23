import uuid from 'uuid';

//ADD EXPENSE
export const addExpense = (
    { 
        description = '',
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {}) => ({
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