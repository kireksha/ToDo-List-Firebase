import styles from "./Input.module.css"
import { useState } from "react";

export const Input = ({ ...props }) => {
    const {
        updateList,
        setUpdateList,
        inputValue,
        setInputValue,
        isSearch,
        setIsSearch,
    } = { ...props }


    const [isCreating, setIsCreating] = useState(false);



    const handleSubmit = () => {
        setIsCreating(true);
        fetch('http://localhost:3002/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                title: inputValue,
                id: Date.now().toString(),
            })
        })
            .then(() => {
                setUpdateList(!updateList)
            })
            .finally(() => {
                setIsCreating(false)
                setInputValue('')
            })
    }

    return (
        <div className={styles.FormWrapper}>
            <button
                className={`${styles.SearchBtn} ${isSearch && styles.clicked}`}
                onClick={() => setIsSearch(!isSearch)}
            >
            </button>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={styles.Input}
                    placeholder="What do you plan To Do?"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button
                    type="submit"
                    className={styles.SubmitBtn}
                    onClick={handleSubmit}
                    disabled={isCreating || !inputValue}
                >
                    Add
                </button>
            </form>
        </div>
    )
}