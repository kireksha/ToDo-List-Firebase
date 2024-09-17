import styles from './List.module.css';
import { useState, useEffect } from 'react';
import { Checkbox } from "../InputCheckbox/InputCheckbox"

export const List = ({ updateList, setUpdateList, inputValue, isSearch }) => {
    const [listOfTodos, setListOfTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [todosArray, setTodosArray] = useState([]);
    const [isSort, setIsSort] = useState(false);

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

    useEffect(() => {
        handleSort(todosArray)
    }, [isSort])

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
                }),
            })
                .finally(() => setUpdateList(!updateList))
        }
    }

    const handleSearch = (e) => {
        const newArr = todosArray.filter((d) => {
            let searchValue = d.title.toLowerCase();
            return searchValue.indexOf(e.target.value) !== -1;
        })
        setListOfTodos(newArr)
    }

    const handleSort = (data) => {

        if (isSort) {
            let sortedData;
            sortedData = [...data].sort((a, b) => {
                return a.title.localeCompare(b.title);
            })
            setListOfTodos(sortedData);
        } else {
            setListOfTodos(data);
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
                    : listOfTodos.map((todo) => {
                        return (
                            <li
                                className={styles.ToDoItem}
                                key={todo.id}
                            >
                                <Checkbox
                                    label={todo.title}
                                    todoID={todo.id}
                                    updateList={updateList}
                                    setUpdateList={setUpdateList}
                                />
                                <button
                                    className={styles.BtnUpdate}
                                    onClick={() => handleUpdate(todo)}
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
