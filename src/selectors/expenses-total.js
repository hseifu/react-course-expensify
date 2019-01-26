export default (expenses) => {
    return expenses
        .map((expense)=>expense.amount)
        .reduce((total,expense) => total + expense, 0); 
}