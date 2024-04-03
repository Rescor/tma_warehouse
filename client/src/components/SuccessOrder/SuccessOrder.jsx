import {NavLink} from "react-router-dom";
import styles from './SuccessOrder.module.css';

export default function SuccessOrder({orderId}) {
  return <div className={styles.success_notify}>
    <h3 className={styles.title}>Your order #{orderId} has been successfully created!</h3>
    <NavLink to='/lists/browse'>Return to items</NavLink>
  </div>
}
