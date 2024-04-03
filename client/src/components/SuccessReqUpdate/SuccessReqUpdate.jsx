import {NavLink} from "react-router-dom";
import styles from '../SuccessOrder/SuccessOrder.module.css'

export default function SuccessReqUpdate() {
  return <div className={styles.success_notify}>
    <h2 className={styles.title}>Success update</h2>
    <NavLink to='/lists/requests'>Return to requests</NavLink>
  </div>
}
