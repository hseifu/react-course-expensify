import authReducer from '../../reducers/auth';

test("should setup login state", () => {
    const state = authReducer(undefined, {type: 'LOGIN', uid: 89});
    expect(state).toEqual({uid: 89});
})

test("should setup login state", () => {
    const state = authReducer(undefined, {type: 'LOGOUT'});
    expect(state).toEqual({});
})