import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../reducers/rootReducer';

const thunk = ({ dispatch, getState }) => {
	return (next) => {
		return (action) => {
			console.log('action', typeof action);
			if (typeof action === 'function') {
				return action(dispatch, getState);
			} else {
				return next(action);
			}
		};
	};
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	undefined,
	composeEnhancers(applyMiddleware(thunk)),
);
