import { useDispatch, useSelector } from "react-redux";
import styles from "./Input.module.css"
import { selectInputValue, selectIsSearch } from "../../selects";

export const Input = () => {
    const dispatch = useDispatch();
    const inputValue = useSelector(selectInputValue);
    const isSearch = useSelector(selectIsSearch);

    const handleSubmit = (event) => {
        event.preventDefault()
        const newID = Date.now().toString()
        dispatch({ type: 'ADD_TODO', payload: { id: newID, title: inputValue } })
        fetch('http://localhost:3002/todos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: newID, title: inputValue })
        })
    }

    return (
        <div className={styles.FormWrapper}>
            <button
                className={`${styles.SearchBtn} ${isSearch && styles.clicked}`}
                onClick={() => dispatch({ type: 'SET_IS_SEARCH', payload: !isSearch })}
            >
            </button>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={styles.Input}
                    placeholder="What do you plan To Do?"
                    value={inputValue}
                    onChange={e => dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value })}
                />
                <button
                    type="submit"
                    className={styles.SubmitBtn}
                    onClick={handleSubmit}
                    disabled={!inputValue}
                >
                    Add
                </button>
            </form>
        </div>
    )
}