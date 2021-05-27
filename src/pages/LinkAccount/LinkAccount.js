import { useEffect, useContext, useCallback } from "react";
import { Context } from "../../context";
import Header from "../../components/Headers";
import InlineLink from "plaid-threads/InlineLink";
import styles from "./LinkAccount.module.scss";
const LinkAccount = (props) => {
    const { linkSuccess, isItemAccess, dispatch } = useContext(Context);

    const getInfo = useCallback(async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/info`, { method: "POST" });
        if (!response.ok) {
            dispatch({ type: "SET_STATE", state: { backend: false } });
            return { paymentInitiation: false };
        }
        const data = await response.json();
        const paymentInitiation = data.products.includes(
            "payment_initiation"
        );
        dispatch({
            type: "SET_STATE",
            state: {
                products: data.products,
            },
        });
        return { paymentInitiation };
    }, [dispatch]);

    const generateToken = useCallback(
        async (paymentInitiation) => {
            const path = paymentInitiation
                ? "/api/create_link_token_for_payment"
                : "/api/create_link_token";
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
                method: "POST",
            });
            if (!response.ok) {
                dispatch({ type: "SET_STATE", state: { linkToken: null } });
                return;
            }
            const data = await response.json();
            if (data) {
                if (data.error != null) {
                    dispatch({
                        type: "SET_STATE",
                        state: {
                            linkToken: null,
                            linkTokenError: data.error,
                        },
                    });
                    return;
                }
                dispatch({ type: "SET_STATE", state: { linkToken: data.link_token } });
            }
            localStorage.setItem("link_token", data.link_token); //to use later for Oauth
        },
        [dispatch]
    );

    useEffect(() => {
        const init = async () => {
            const { paymentInitiation } = await getInfo(); // used to determine which path to take when generating token
            // do not generate a new token for OAuth redirect; instead
            // setLinkToken from localStorage
            if (window.location.href.includes("?oauth_state_id=")) {
                dispatch({
                    type: "SET_STATE",
                    state: {
                        linkToken: localStorage.getItem("link_token"),
                    },
                });
                return;
            }
            generateToken(paymentInitiation);
        };
        init();
    }, [dispatch, generateToken, getInfo]);
    return (
        <div>
            <div className={styles.container}>
                <Header />
                {linkSuccess && isItemAccess && (
                    <div>
                        <p>
                            See your{" "}
                            <InlineLink
                                href="/profile"
                                target="_blank"
                            >
                                transactions
                        </InlineLink>
                        .
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LinkAccount