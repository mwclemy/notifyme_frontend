import { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './transactions.module.scss'
import Spinner from '../../components/Spinner/Spinner'
const Transactions = () => {

    const [transactions, setTransactions] = useState([])
    const getTransactions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/transactions`, {
                headers: {
                    Authorization: localStorage.getItem('userId')
                }
            })
            setTransactions(response.data.transactions);
        } catch (error) {
            if (error.response) {
                alert(error.response.message)
            }
        }

    }
    useEffect(() => {
        getTransactions()
    }, [])

    return (<div>
        {transactions.length === 0 ? <Spinner /> :
            <table className={styles.container}>
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
    </div >)

}

export default Transactions