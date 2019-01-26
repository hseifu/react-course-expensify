import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test("should return 0 if no expense",() => {
    expect(getExpensesTotal([])).toBe(0);
})

test("should return amount for one expense",() => {
    expect(getExpensesTotal([expenses[0]])).toBe(expenses[0].amount);
})

test("should return sum of amount for multiple expenses",() => {
    expect(getExpensesTotal(expenses)).toBe(1995195);
})