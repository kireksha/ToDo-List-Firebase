import { useContext, useState } from 'react';
import { Button } from '../../../button/button';
import styles from './sorting.module.css';
import { AppContext } from '../../../../context';

export const Sorting = () => {
	const { isSorting, setIsSorting } = useContext(AppContext);

	const onChange = ({ target }) => {
		setIsSorting(target.checked);
	};

	return (
		<Button>
			<input
				className={styles.Checkbox}
				id="sorting-button"
				type="checkbox"
				checked={isSorting}
				onChange={onChange}
			/>
			<label className={styles.Label} htmlFor="sorting-button">
				A&darr;
			</label>
		</Button>
	);
};
