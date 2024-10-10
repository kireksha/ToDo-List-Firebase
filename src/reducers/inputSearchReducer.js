const initialState = {
	updateError: '',
	isSearch: false,
	inputValue: '',
};
export const inputSearchReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_IS_SEARCH':
			return {
				...state,
				isSearch: payload,
			};
		case 'SET_INPUT_VALUE':
			return {
				...state,
				inputValue: payload,
			};
		case 'SET_UPDATE_ERROR':
			return {
				...state,
				updateError: payload,
			};
		default:
			return state;
	}
};
