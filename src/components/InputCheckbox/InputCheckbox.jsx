import styles from './InputCheckbox.module.css';
import { useState } from 'react';

export const Checkbox = ({ label, todoID, setUpdateList, updateList }) => {
	const [check, setCheck] = useState(false);

	const handleCheckbox = () => {
		setCheck(true)
		setTimeout(() => {
			fetch(`http://localhost:3002/todos/${todoID}`, {
				method: 'DELETE'
			})
				.then(() => setUpdateList(!updateList))
		}, 1000)
	}

	return (
		<>
			<button
				className={`${styles.CheckboxBtn} ${check && styles.checked}`}
				onClick={handleCheckbox}>
			</button>
			<span className={styles.TodoTitle}>{label}</span>
		</>
	);
};
