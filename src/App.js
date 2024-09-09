import './reset.css';
import './index.css';
import styles from './App.module.css';
import { Input } from './components/InputComponent/Input';
import { List } from './components/ToDoListComponent/List';

export const App = () => {
	return (
		<div className={styles.App}>
			<h1 className={styles.MainHeading}>To Do App</h1>
			<Input />
			<List />
		</div>
	);
};
