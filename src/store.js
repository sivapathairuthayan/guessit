import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './reducers/session-reducer';
import guessItReducer from './reducers/guessit-reducer';

const combinedReducers = combineReducers({
	sessionReducer,
	guessItReducer
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;