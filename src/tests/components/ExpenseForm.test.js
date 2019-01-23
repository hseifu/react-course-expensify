import React from 'react';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import { shallow } from 'enzyme';

test("should render expense form correctly ", () => {
    const wrapper = shallow(<ExpenseForm/>)
    expect(wrapper).toMatchSnapshot();
})

test("should render expense form from expense data ", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>)
    expect(wrapper).toMatchSnapshot();
})

test("should render error for invalid form submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit',{
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
})

test("should set description on input change", () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = "new description";
    wrapper.find('input').at(0).simulate('change', {
        target: { value } 
    });
    expect(wrapper.state('description')).toBe(value);
})

test("should set note on textarea change", () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = "new note";
    wrapper.find('textarea').at(0).simulate('change', {
        target: { value } 
    });
    expect(wrapper.state('note')).toBe(value);
})

test("should set amount on valid input", () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = "82.76";
    wrapper.find('input').at(1).simulate('change', {
        target: { value } 
    });
    expect(wrapper.state('amount')).toBe(value);
})

test("should set amount on valid input", () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = "12.221";
    wrapper.find('input').at(1).simulate('change', {
        target: { value } 
    });
    expect(wrapper.state('amount')).toBe("");
})

test("should call onSubmit with the prop for vlaid submission", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit',{
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({...expenses[0], id: undefined})
})

//// Not working make sure to fix it
// test("should set new date on date change", () => {
//     const now = moment();
//     const wrapper = shallow(<ExpenseForm />);
//     console.log(wrapper.find('SingleDatePicker'));
//     wrapper.find('SingleDatePicker').prop('onDateChange')(now);
//     expect(wrapper.state('createdAt')).toEqual(now);
// })

// test("should set calendar focused", () => {
//     const focused = true;
//     const wrapper = shallow(<ExpenseForm />);
//     wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
//     expect(wrapper.state('calendarFocused')).toBe(focused);
// })