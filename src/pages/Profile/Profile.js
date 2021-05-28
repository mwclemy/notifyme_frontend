import { useState, useEffect, useContext } from 'react'
import { Context } from "../../context";
import { Link } from 'react-router-dom'
import axios from 'axios';
import styles from "./profile.module.scss";
import Spinner from '../../components/Spinner/Spinner'
import Modal from '../../components/Modal/Modal';
const Profile = () => {
    const { user, dispatch } = useContext(Context);
    const [connectedAccounts, setConnectedAccounts] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [amount, setAmount] = useState('')
    const getConnectedAccounts = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/institutions`, {
                headers: {
                    Authorization: localStorage.getItem('userId')
                }
            })
            setLoading(false)
            setConnectedAccounts(response.data.institutions);
        } catch (error) {
            setLoading(false)
            if (error.response) {
                setError(error.response.message)
                alert(error.response.message)
            }
        }
    }

    const changeAmountHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/update_threshold_amount`, {
                threshold_amount: amount
            }, {
                headers: {
                    Authorization: localStorage.getItem('userId')
                }
            })
            setShowModal(false)
            dispatch({
                type: "SET_USER",
                state: {
                    user: response.data.user,
                    userId: localStorage.getItem('userId')
                },
            });
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        getConnectedAccounts()
    }, [])
    return (
        <div className={styles.container}>
            <h3>Profile</h3>
            <div className={styles.profile}>
                Name: {user.name}
            </div>
            <div className={styles.profile}>
                Phone: {user.phone}
            </div>
            <div className={styles.profile} onClick={() => setShowModal(true)}>
                Threshold: ${user.threshold_amount}
            </div>
            <h4>Connected Accounts</h4>
            { error &&
                <div className="error">{error}</div>}
            { connectedAccounts.length !== 0 &&
                <div className={styles.accounts}>
                    {connectedAccounts.map(account => {
                        return <p key={account.institution_id}>{account.name}</p>
                    })}
                </div>
            }

            {connectedAccounts.length === 0 && !loading && !error &&
                <div>
                    No account connected yet. <br />
                     You can connect one <Link to="/connect-account">here</Link>
                </div>
            }
            {loading && <Spinner />}
            <Modal show={showModal}>
                <div>
                    <h5>Change threshold amount</h5>
                    <p>From: ${user.threshold_amount}</p>
                    <form onSubmit={changeAmountHandler}>
                        <p>To: $<input type="number"
                            name="amount"
                            value={amount} onChange={(e) => setAmount(e.target.value)} required /></p>
                        <p>
                            <button onClick={() => setShowModal(false)}>Close</button>
                            <button>Save</button>
                        </p>

                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Profile