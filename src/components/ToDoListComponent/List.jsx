import styles from './List.module.css';
import { useState, useEffect } from 'react';
import { Checkbox } from "../InputCheckbox/InputCheckbox"
import { useDispatch, useSelector } from 'react-redux';
import { selectInputValue, selectIsLoading, selectIsSearch, selectSearchPhrase, selectTodos, selectUpdateError } from '../../selects';
import { getTodos } from '../../reducers/todoReducer';

export const List = () => {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const isLoading = useSelector(selectIsLoading);
    const updateError = useSelector(selectUpdateError);
    const isSearch = useSelector(selectIsSearch);
    const inputValue = useSelector(selectInputValue);
    const searchPhrase = useSelector(selectSearchPhrase);
    const [isSort, setIsSort] = useState(false);

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    const onUpdate = (payload) => {
        if (!inputValue) {
            dispatch({ type: 'SET_UPDATE_ERROR', payload: true })
        } else {
            dispatch({ type: 'SET_UPDATE_ERROR', payload: false })
            fetch(`http://localhost:3002/todos/${payload.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ title: payload.title })
            })
            dispatch({
                type: 'UPDATE_TODO',
                payload,
            })
        }
    }

    useEffect(() => {
        handleSort(todos)
    }, [isSort])

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase()
        dispatch({ type: 'SET_SEARCH_PHRASE', payload: searchValue })
    }

    const filteredTodos = todos.filter((todo) => {
        return todo.title.toLowerCase().includes(searchPhrase.toLowerCase())
    });


    const handleSort = (data) => {
        if (isSort) {
            let sortedData;
            sortedData = [...data].sort((a, b) => {
                return a.title.localeCompare(b.title);
            })
            return sortedData
        } else {
            return data
        }
    }

    return (
        <ul className={styles.ToDoList}>
            {updateError &&
                <span className={styles.UpdateError}>
                    Write a TO DO first
                </span>}
            <input
                type='text'
                className={`${styles.SearchInput} ${isSearch && styles.isActive}`}
                onChange={handleSearch}
                placeholder='What to search for?'
            />
            <button
                className={`${styles.SortBtn} ${isSort && styles.clicked}`}
                onClick={() => setIsSort(!isSort)}
            ><span>ABC</span>
                sorting
            </button>
            {
                isLoading
                    ? <div className={styles.Loader}></div>
                    : handleSort(filteredTodos).map((todo) => {
                        return (
                            <li
                                className={styles.ToDoItem}
                                key={todo.id}
                            >
                                <Checkbox
                                    label={todo.title}
                                    todoID={todo.id}
                                />
                                <button
                                    className={styles.BtnUpdate}
                                    onClick={onUpdate.bind(null, { id: todo.id, title: inputValue })}
                                >
                                    Update
                                </button>
                            </li>
                        )
                    })
            }
        </ul >
    );
};
