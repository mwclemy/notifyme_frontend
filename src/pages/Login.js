import { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from "../context";
const Login = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { dispatch } = useContext(Context);
    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
            phone, password
        })
            .then((response) => {
                dispatch({
                    type: "SET_USER",
                    state: {
                        user: response.data.user,
                        userId: response.data.user_id
                    },
                });
            })
            .catch((err) => {
                setError(err.response.data.message)
            })
    }

    return (
        <div>
            <h2>Log into your accout!</h2>

            { error &&
                <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login-phone">Phone:</label>
                    <input id="login-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="signup-password">Password:</label>
                    <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Log in!" ></input>
                </div>
            </form>
        </div>
    )
}

export default Login