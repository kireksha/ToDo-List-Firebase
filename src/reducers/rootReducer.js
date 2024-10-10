import { combineReducers } from 'redux';
import { todoReducer } from './todoReducer';
import { inputSearchReducer } from './inputSearchReducer';
export const rootReducer = combineReducers({
	todoState: todoReducer,
	inputSearchState: inputSearchReducer,
});
