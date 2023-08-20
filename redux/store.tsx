import { createStore, combineReducers, AnyAction } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { authReducer } from './authReducer';
import { AuthState } from './types';

export interface RootState {
    auth: AuthState;
}

const rootReducer = combineReducers<RootState>({
    auth: authReducer
});

const makeStore: MakeStore<RootState> = (context: Context) => createStore(rootReducer);

export const wrapper = createWrapper<RootState>(makeStore);
