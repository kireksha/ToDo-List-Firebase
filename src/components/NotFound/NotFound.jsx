import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
export const NotFound = () => {
    return (
        <>
            <h3 className={styles.Heading}>This page does not exist</h3>
            <Link to='/'>
                <span>Please follow to the main page</span>
            </Link>
        </>
    )
} 