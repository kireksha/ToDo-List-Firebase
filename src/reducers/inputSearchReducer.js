const initialState = {
	updateError: '',
	isSearch: false,
	inputValue: '',
	searchPhrase: '',
};
export const inputSearchReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_IS_SEARCH':
			return {
				...state,
				isSearch: payload,
			};
		case 'SET_SEARCH_PHRASE':
			return {
				...state,
				searchPhrase: payload,
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
