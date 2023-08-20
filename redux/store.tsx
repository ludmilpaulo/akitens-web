import { createStore, combineReducers, AnyAction, Store } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { authReducer } from './authReducer';
import { AuthState } from './types';

export interface RootState {
    auth: AuthState;
}

const rootReducer = combineReducers<RootState>({
    auth: authReducer
});

const makeStore: MakeStore<Store<RootState, AnyAction>> = (context: Context) => createStore(rootReducer);

export const wrapper = createWrapper<Store<RootState, AnyAction>>(makeStore);
