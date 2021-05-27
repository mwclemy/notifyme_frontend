import { useState, useEffect, useContext } from 'react'
import { Context } from "../../context";
import { Link } from 'react-router-dom'
import axios from 'axios';
import styles from "./profile.module.scss";
import Spinner from '../../components/Spinner/Spinner'
const Profile = () => {
    const { user } = useContext(Context);
    const [connectedAccounts, setConnectedAccounts] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
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
            <div className={styles.profile}>
                Threshold: ${user.threshold_amount}
            </div>
            <h4>Connected Accounts</h4>
            { error &&
                <div className="error">{error}</div>}
            { connectedAccounts.length !== 0 ?
                <div className={styles.accounts}>
                    {connectedAccounts.map(account => {
                        return <p key={account.institution_id}>{account.name}</p>
                    })}
                </div>
                :
                <div>
                    No account connected yet. <br />
                    You can connect one <Link to="/connect-account">here</Link>
                </div>
            }
            {loading && <Spinner />}
        </div>
    )
}

export default Profile