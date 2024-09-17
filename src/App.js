import './reset.css';
import './index.css';
import styles from './App.module.css';
import { Input } from './components/InputComponent/Input';
import { List } from './components/ToDoListComponent/List';
import { useState } from 'react';

export const App = () => {
	const [updateList, setUpdateList] = useState(true);
	const [inputValue, setInputValue] = useState('');
	const [isSearch, setIsSearch] = useState(false);

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
				updateList={updateList}
				setUpdateList={setUpdateList}
				inputValue={inputValue}
				setInputValue={setInputValue}
				isSearch={isSearch}
			/>
		</div>
	);
};
