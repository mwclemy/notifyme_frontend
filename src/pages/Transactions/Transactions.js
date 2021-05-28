import { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './transactions.module.scss'
import Spinner from '../../components/Spinner/Spinner'
const Transactions = () => {

    const [transactions, setTransactions] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const getTransactions = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/transactions`, {
                headers: {
                    Authorization: localStorage.getItem('userId')
                }
            })
            setTransactions(response.data.transactions);
            setLoading(false)
        } catch (error) {
            if (error.response) {
                setLoading(false)
                setError(error.response.data.message)
            }
        }

    }
    useEffect(() => {
        getTransactions()
    }, [])

    return (<div className={styles.container}>
        { error &&
            <div className="error">{error}</div>}
        {transactions.length !== 0 &&
            <table>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(t => {
                        return (<tr key={t.transaction_id}>
                            <td>
                                {t.date}
                            </td>
                            <td>
                                {t.name}
                            </td>
                            <td>
                                {t.amount}
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        }

        {transactions.length === 0 && !loading && !error &&
            <div>
                No transactions yet.
            </div>
        }
        {loading && <Spinner />}
    </div >)

}

export default Transactions