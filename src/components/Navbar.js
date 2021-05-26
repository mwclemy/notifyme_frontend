import { Link } from 'react-router-dom'
import { Context } from "../context";
import { useContext } from 'react'
const Navbar = () => {
    const { user, dispatch } = useContext(Context);
    return (
        <nav className="navBar">
            <ul>
                <li> <Link to="/">Home</Link></li>
                {' | '}
                {user.id ?
                    <>
                        <li>
                            <Link to="/link-account">Link Account</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li onClick={() => {
                            dispatch({
                                type: "LOGOUT",
                            });
                        }}>Logout</li>
                        {' | '}
                    </>
                    :
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        {' | '}
                        <li>  <Link to="/login">Login</Link></li>
                    </>
                }

            </ul>
        </nav>
    )
}

export default Navbar