import styles from './InputCheckbox.module.css';
import { useState } from 'react';

export const Checkbox = ({ label }) => {
	const [check, setCheck] = useState(false);
	return (
		<div className={styles.CheckboxWrapper}>
			<label className={styles.LabelCheckboxWrapper}>
				<input
					id={Date.now()}
					key={Date.now()}
					type="checkbox"
					className={styles.Checkbox}
					onChange={() => setCheck((prev) => !prev)}
					checked={check}
				/>
                <span>{label}</span>
			</label>
		</div>
	);
};
