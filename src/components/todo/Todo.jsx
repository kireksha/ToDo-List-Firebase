import { Button } from '../button/button';
import styles from './Todo.module.css';

export const Todo = ({
    completed,
    title,
    isEditing,
    onSave,
    onRemove,
    onEdit,
    onTitleChange,
    onCompletedChange
}) => {

    return (
        <div className={styles.Todo}>
            <input
                className={styles.Checkbox}
                type="checkbox"
                checked={completed}
                onChange={({ target }) => onCompletedChange(target.checked)}
            />
            <div className={styles.TodoTitle}>
                {isEditing ? (
                    <input type='text' value={title} onChange={({ target }) => onTitleChange(target.value)} />
                ) : (
                    <div onClick={onEdit}>{title}</div>
                )}
            </div>
            <div>
                {isEditing ?
                    <Button onClick={onSave}>✎</Button>
                    :
                    <Button onClick={onRemove}>✖</Button>
                }
            </div>
        </div>
    )
}