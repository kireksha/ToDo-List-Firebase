import { Button } from '../button/button';
import { Search, Sorting } from './components';
import styles from './ControlPanel.module.css';

export const ControlPanel = ({ onTodoAdd }) => {
    return (
        <div className={styles.ControlPanel}>
            <Search />
            <Sorting />
            <Button onClick={onTodoAdd}>
                ✚
            </Button>
        </div>
    )
}