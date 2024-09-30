export const removeTodoInTodos = (todos, todoID) => {
	return todos.filter(({ id }) => id !== todoID);
};
