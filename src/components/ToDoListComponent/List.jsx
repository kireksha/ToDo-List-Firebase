import styles from "./List.module.css"
import { useState, useEffect } from "react"

export const List = () => {
    const [check, setCheck] = useState(false)

    const handleCheck = (e) => {
        console.log(e.target)
        setCheck(!check)
    }

    const [listOfTodos, setListOfTodos] = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            .then((response) => response.json())
            .then((json) => {
                setListOfTodos(json)
            })
    }, [])

    return (
        <ul className={styles.ToDoList}>
            {listOfTodos.map((todo) => {
                return <>
                    <input id={Date.now()} key={Date.now()} type="checkbox" className={styles.Checkbox} checked={check} onChange={(target) => handleCheck(target)} />
                    <li className={styles.ToDoItem} key={todo.id}>{todo.title}</li>
                </>
            })}
        </ul>
    )
}