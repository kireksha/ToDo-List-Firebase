import './reset.css';
import './index.css';
import styles from './App.module.css';
import { List } from '../src/components/ToDoListComponent/List';
import { Input } from '../src/components/InputComponent/Input';
import { useState, useEffect } from 'react';

export const App = () => {
	const [updateList, setUpdateList] = useState(true);
	const [inputValue, setInputValue] = useState('');
	const [isSearch, setIsSearch] = useState(false);
	const [listOfTodos, setListOfTodos] = useState([]);
	const [updateError, setUpdateError] = useState(false);
	const [todosArray, setTodosArray] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3002/todos')
			.then((response) => response.json())
			.then((json) => {
				setTodosArray(json);
				setListOfTodos(json);
			})
			.finally(() => {
				setIsLoading(false);
				setUpdateError(false);
			});
	}, [updateList]);

	const handleUpdate = (e) => {
		if (!inputValue) {
			setUpdateError(true);
		} else {
			setUpdateError(false);
			fetch(`http://localhost:3002/todos/${e.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: inputValue,
					shortTitle: inputValue.toString().slice(0, 5) + '...',
				}),
			}).finally(() => setUpdateList(!updateList));
		}
	};

	const handleSearch = (e) => {
		const newArr = todosArray.filter((d) => {
			let searchValue = d.title.toLowerCase();
			return searchValue.indexOf(e.target.value) !== -1;
		});
		setListOfTodos(newArr);
	};

	return (
		<div className={styles.App}>
			<h1 className={styles.MainHeading}>To Do App</h1>
			<Input
				updateList={updateList}
				setUpdateList={setUpdateList}
				inputValue={inputValue}
				setInputValue={setInputValue}
				isSearch={isSearch}
				setIsSearch={setIsSearch}
			/>
			<List
				handleSearch={handleSearch}
				isSearch={isSearch}
				setListOfTodos={setListOfTodos}
				listOfTodos={listOfTodos}
				updateError={updateError}
				todosArray={todosArray}
				isLoading={isLoading}
				handleUpdate={handleUpdate}
				updateList={updateList}
				setUpdateList={setUpdateList}
			/>
		</div>
	);
};
