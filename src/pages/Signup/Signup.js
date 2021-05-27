import { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from "../../context";
import styles from './Signup.module.scss'
const Signup = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { dispatch } = useContext(Context);
    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            name, phone, password
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
        <div className={styles.form}>
            <h2>Signup</h2>

            { error &&
                <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <input id="signup-phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <input className={styles.submitButton} type="submit" value="Signup" ></input>
                </div>
            </form>
        </div>
    )
}

export default Signup
