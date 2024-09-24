import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './InputCheckbox.module.css';

export const Checkbox = ({ label, todoID }) => {
	const [check, setCheck] = useState(false);

	return (
		<>
			<button
				className={`${styles.CheckboxBtn} ${check && styles.checked}`}
				onClick={() => setCheck(!check)}>
			</button>
			<Link className={styles.TitleLink} to={`/task/${todoID}`}>
				<span className={styles.TodoTitle}>{label}</span>
			</Link>
		</>
	);
};
