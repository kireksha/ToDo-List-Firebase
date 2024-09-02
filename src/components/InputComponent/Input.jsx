import styles from "./Input.module.css"
import { useState } from "react";

export const Input = () => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (value) => setInputValue(value.data);
    return (
        <>
            <input type="text" className={styles.Input} placeholder="What do you plan To Do?" value={inputValue} onChange={(value) => handleChange(value)} />
        </>
    )
}