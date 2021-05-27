import { Link } from 'react-router-dom'
import { Context } from "../../context";
import { useContext } from 'react'
import styles from "./Navbar.module.scss";

const Navbar = () => {
    const { user, dispatch } = useContext(Context);
    return (
        <nav className={styles.navBar}>
            <span className={styles.logo}>NotifyMe</span>
            <ul>
                <li> <Link to="/">Home</Link></li>
                {user.id ?
                    <>
                        <li>
                            <Link to="/transactions">Transactions</Link>
                        </li>
                        <li>
                            <Link to="/connect-account">Connect Account</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li onClick={() => {
                            dispatch({
                                type: "LOGOUT",
                            });
                        }}>Logout</li>
                    </>
                    :
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        <li>  <Link to="/login">Login</Link></li>
                    </>
                }

            </ul>
        </nav>
    )
}

export default Navbar