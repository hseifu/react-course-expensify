import React from 'react';
import { Header } from '../../components/Header';
import { shallow } from 'enzyme';

test("should render Header correctly", () => {
    const wrapper = shallow(<Header startLogout={() => { }} />);
    expect(wrapper).toMatchSnapshot();
})

test("should call startLogout on button click", () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={onClickSpy} />);
    wrapper.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
})