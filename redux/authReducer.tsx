import { AuthState, AuthActionTypes } from './types';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null
};

export const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SIGNUP_SUCCESS:
        case AuthActionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case AuthActionTypes.AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        default:
            return state;
    }
};
