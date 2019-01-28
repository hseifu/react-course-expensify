import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render login page', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
})

test("should call startLogout when button clicked", () => {
    const startLoginSpy = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLoginSpy}/>);
    wrapper.find('button').simulate('click');
    expect(startLoginSpy).toHaveBeenCalled();
})