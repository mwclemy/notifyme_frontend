import { useState, useEffect, useContext } from 'react'
import { Context } from "../../context";
import axios from 'axios';
import styles from "./profile.module.scss";
import Spinner from '../../components/Spinner/Spinner'
const Profile = () => {
    const { user } = useContext(Context);
    const [connectedAccounts, setConnectedAccounts] = useState([])

    const getConnectedAccounts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/institutions`, {
                headers: {
                    Authorization: localStorage.getItem('userId')
                }
            })
            setConnectedAccounts(response.data.institutions);
        } catch (error) {
            if (error.response) {
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
            { connectedAccounts.length === 0 ? <Spinner /> :
                <div className={styles.accounts}>
                    {connectedAccounts.map(account => {
                        return <p key={account.institution_id}>{account.name}</p>
                    })}
                </div>}
        </div>
    )
}

export default Profile