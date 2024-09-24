import { useParams, useNavigate } from "react-router-dom";
import styles from "./OpenTask.module.css";

export const OpenTask = ({ handleUpdate, listOfTodos, updateList, setUpdateList }) => {

    const params = useParams();
    const navigate = useNavigate();
    const openContent = listOfTodos.filter((todo) => todo.id === params.id)

    const handleDelete = () => {
        fetch(`http://localhost:3002/todos/${params.id}`, {
            method: "DELETE"
        })
            .then(() => navigate(-1))
            .finally(() => setUpdateList(!updateList))
    }

    return (
        <>
            <div>{openContent[0].title}</div>
            <button className={styles.BtnBack} onClick={() => navigate(-1)}>Back</button>
            <button
                className={styles.BtnUpdate}
                onClick={() => handleUpdate(params)}
            >
                Update
            </button>
            <button className={styles.BtnDelete} onClick={handleDelete}>Delete</button>
        </>
    )
}