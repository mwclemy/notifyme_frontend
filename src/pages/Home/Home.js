import styles from './Home.module.scss'
const Home = () => {
    return (
        <div className={styles.home}>
            <p>
                Do you struggle keeping track of all <br />
            Transactions in one place and <br />
            Setting up a threshold spending amount to not exceed?
            </p>
            <p>
                With <b>NotifyMe</b>, you can now get notified<br />
            Whenever you exceeds a given amount from all of your accounts via <b>SMS text.</b>
            </p>
            <div className={styles.footer}>
                <span>&copy;Copyright 2021</span>
                <span>Made with <span className={styles.heart}>&#10084;</span> by Clement</span>
            </div>
        </div>
    )
}

export default Home