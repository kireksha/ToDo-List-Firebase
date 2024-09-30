import './reset.css';
import './index.css';
import styles from './App.module.css';
import { useState, useEffect } from 'react';
import { Todo, ControlPanel } from './components';
import { readTodos, updateTodo, deleteTodo, createTodo } from './api';
import { addTodoInTodos, findTodo, removeTodoInTodos, setTodoInTodos } from './utils';
import { NEW_TODO_ID } from './constants';
import { AppContext } from './context';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isSorting, setIsSorting] = useState(false);

	const onTodoAdd = () => {
		setTodos(addTodoInTodos(todos));
	};

	const onTodoSave = (todoID) => {
		const { title, completed } = findTodo(todos, todoID) || {};
		if (todoID === NEW_TODO_ID) {
			createTodo({ title, completed }).then((todo) => {
				let updatedTodos = setTodoInTodos(todos, {
					id: NEW_TODO_ID,
					isEditing: false
				});
				updatedTodos = removeTodoInTodos(updatedTodos, NEW_TODO_ID);
				updatedTodos = addTodoInTodos(updatedTodos, todo);
				setTodos(updatedTodos)
			});
		} else {
			updateTodo({ id: todoID, title }).then(() => {
				setTodos(setTodoInTodos(todos, { id: todoID, isEditing: false }));
			});
		};

	};

	const onTodoRemove = (id) => {
		deleteTodo(id).then(() => setTodos(removeTodoInTodos(todos, id)));
	};

	const onTodoEdit = (id) => {
		setTodos(setTodoInTodos(todos, { id, isEditing: true }));
	};

	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodoInTodos(todos, { id, title: newTitle }));
	};

	const onCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }));
		});
	};

	useEffect(() => {
		readTodos(searchPhrase, isSorting).then((loadedTodos) =>
			setTodos(loadedTodos.reverse()),
		);
	}, [searchPhrase, isSorting]);

	return (
		<AppContext.Provider value={{ setSearchPhrase, isSorting, setIsSorting }}>
			<div className={styles.App}>
				<ControlPanel
					onTodoAdd={onTodoAdd}
				/>
				<div>
					{todos.map(({ id, title, completed, isEditing = false }) => (
						<Todo
							key={id}
							id={id}
							title={title}
							completed={completed}
							onSave={() => onTodoSave(id)}
							onTitleChange={(newTitle) => onTodoTitleChange(id, newTitle)}
							onCompletedChange={(newCompleted) => onCompletedChange(id, newCompleted)}
							onRemove={() => onTodoRemove(id)}
							onEdit={() => onTodoEdit(id)}
							isEditing={isEditing}
						/>
					))}
				</div>
			</div>
		</AppContext.Provider>
	)
}