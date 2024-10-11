import { useDispatch } from 'react-redux';
import styles from './InputCheckbox.module.css';
import { useState } from 'react';

export const Checkbox = ({ label, todoID }) => {
	const dispatch = useDispatch();
	const [check, setCheck] = useState(false);

	const handleCheckbox = (id) => {
		setCheck(true)
		setTimeout(() => {
			fetch(`http://localhost:3002/todos/${id}`, { method: 'DELETE' }).then(() => dispatch({
				type: 'DELETE_TODO',
				payload: id,
			}))
		}, 1000)
	}

	return (
		<>
			<button
				className={`${styles.CheckboxBtn} ${check && styles.checked}`}
				onClick={() => handleCheckbox(todoID)}>
			</button>
			<span className={styles.TodoTitle}>{label}</span>
		</>
	);
};
