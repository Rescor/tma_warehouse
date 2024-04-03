import { NavLink } from "react-router-dom";
import styles from '../SuccessOrder/SuccessOrder.module.css'

export default function Success() {
  return <div className={styles.success_notify}>
    <h2 className={styles.title}>Success</h2>
    <NavLink to='/lists/items'>Return to items</NavLink>
  </div>
}
