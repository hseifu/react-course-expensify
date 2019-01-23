import React from 'react';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';
import { shallow } from 'enzyme';

test("should render expense item passed in ", () => {
    const wrapper = shallow(<ExpenseListItem expense={expenses[1]}/>)
    expect(wrapper).toMatchSnapshot();
})