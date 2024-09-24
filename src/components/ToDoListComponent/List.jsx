import styles from './List.module.css';
import { useState, useEffect } from 'react';
import { Checkbox } from "../InputCheckbox/InputCheckbox";
import { Routes, Route, useMatch } from 'react-router-dom';
import { OpenTask } from '../OpenTask/OpenTask';

export const List = ({
    handleSearch,
    isSearch,
    setListOfTodos,
    listOfTodos,
    updateError,
    todosArray,
    isLoading,
    handleUpdate,
    updateList,
    setUpdateList }) => {

    const [isSort, setIsSort] = useState(false);
    const urlMatchData = useMatch('/task/:id');
    const handleSort = (data) => {
        if (isSort) {
            let sortedData;
            sortedData = [...data].sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
            setListOfTodos(sortedData);
        } else {
            setListOfTodos(data);
        }
    };

    useEffect(() => {
        handleSort(todosArray);
    }, [isSort]);



    return (
        <ul className={styles.ToDoList}>
            {updateError &&
                <span className={styles.UpdateError}>
                    Write a TO DO first
                </span>}
            {
                urlMatchData
                    ?
                    <>
                        <Routes>
                            <Route path="/task/:id"
                                element={<OpenTask
                                    handleUpdate={handleUpdate}
                                    listOfTodos={listOfTodos}
                                    updateList={updateList}
                                    setUpdateList={setUpdateList}
                                />}
                            />
                        </Routes>
                    </>
                    :
                    <>
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
                                                label={todo.shortTitle}
                                                todoID={todo.id}
                                            />
                                        </li>
                                    )
                                })
                        }
                    </>
            }
        </ul >
    );
};
