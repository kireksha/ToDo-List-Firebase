const initialState = {
	todos: [],
	isLoading: false,
	error: '',
};
export const todoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'ADD_TODO':
			return {
				...state,
				todos: [...state.todos, payload],
			};
		case 'SET_TODO':
			return {
				...state,
				todos: payload,
			};
		case 'UPDATE_TODO':
			return {
				...state,
				todos: state.todos.map((todo) => {
					if (todo.id === payload.id) {
						return { ...todo, title: payload.title };
					} else {
						return todo;
					}
				}),
			};
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== payload),
			};
		case 'GET_TODO_REQUEST':
			return {
				...state,
				isLoading: true,
			};
		case 'GET_TODO_SUCCESS':
			return {
				...state,
				todos: [...state.todos, ...payload],
				isLoading: false,
			};
		case 'GET_TODO_ERROR':
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export const getTodos = (arg) => async (dispatch, getState) => {
	dispatch({ type: 'GET_TODO_REQUEST' });
	try {
		const res = await fetch('http://localhost:3002/todos');
		const data = await res.json();
		dispatch({ type: 'GET_TODO_SUCCESS', payload: data });
	} catch (err) {
		dispatch({ type: 'GET_TODO_ERROR', payload: err });
	}
};
