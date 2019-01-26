import React from 'react';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    return (
        <div>
            <h4>Viewing {props.expenses.length} expense{props.expenses.length == 1 ? '' : 's'} totalling {numeral(getExpensesTotal(props.expenses)/100).format('$0,0.00')}</h4>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);