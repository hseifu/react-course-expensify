import moment from 'moment';
import filtersReducers from '../../reducers/filters';

test("should setup default filter values", () => {
    const state = filtersReducers(undefined,{ type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    })
})

test("should setup sortBy to amount", () => {
    const state = filtersReducers(undefined,{ type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test("should setup sortBy to date", () => {
    const current_state = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducers(current_state,action);
    expect(state.sortBy).toBe('date');
});

test("should setup text filter", () => {
    const action = { type: "SET_TEXT_FILTER", text: 'test text' };
    const state = filtersReducers(undefined, action);
    expect(state.text).toBe('test text');
});


test("should setup start date filter", () => {
    const startDate = moment();
    const action = { type: "SET_START_DATE", startDate };
    const state = filtersReducers(undefined, action);
    expect(state.startDate).toBe(startDate);
});

test("should setup end date filter", () => {
    const endDate = moment();
    const action = { type: "SET_END_DATE", endDate };
    const state = filtersReducers(undefined, action);
    expect(state.endDate).toBe(endDate);
});