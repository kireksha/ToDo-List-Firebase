import { useRef, useState, useContext } from 'react';
import { debounce } from './utils';
import styles from './search.module.css';
import { AppContext } from '../../../../context';

export const Search = () => {
	const { setSearchPhrase } = useContext(AppContext);
	const [value, setValue] = useState('');

	const debouncedOnSearch = useRef(debounce(setSearchPhrase, 1500)).current;

	const onChange = ({ target }) => {
		setValue(target.value);
		debouncedOnSearch(target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setSearchPhrase(value);
	};

	return (
		<form className={styles.Search} onSubmit={onSubmit}>
			<input
				className={styles.Input}
				type="text"
				value={value}
				onChange={onChange}
				placeholder="Поиск..."
			/>
		</form>
	);
};
