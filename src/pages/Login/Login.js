import { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from "../../context";
import styles from './Login.module.scss'
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
            .catch((error) => {
                if (error.response) {
                    setError(error.response.message)
                    alert(error.response.message)
                }
            })
    }

    return (
        <div className={styles.form}>
            <h2>Login</h2>

            { error &&
                <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <input className={styles.submitButton} type="submit" value="Login" ></input>
                </div>
            </form>
        </div>
    )
}

export default Login