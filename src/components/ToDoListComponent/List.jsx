import styles from './List.module.css';
import { useState, useEffect } from 'react';
import { Checkbox } from "../InputCheckbox/InputCheckbox"

export const List = () => {
	const [listOfTodos, setListOfTodos] = useState([]);
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users/1/todos')
			.then((response) => response.json())
			.then((json) => {
				setListOfTodos(json);
			});
	}, []);

	return (
		<ul className={styles.ToDoList}>
			{listOfTodos.map((todo) => {
				return (
					<li className={styles.ToDoItem} key={todo.id}>
						<Checkbox label={todo.title}/>
					</li>
				);
			})}
		</ul>
	);
};
