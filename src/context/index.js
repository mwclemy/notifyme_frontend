import { createContext, useReducer, Dispatch } from "react";

const Context = createContext();

const AppProvider = (props) => {
    const initialState = {
        linkSuccess: false,
        isItemAccess: true,
        linkToken: "", // Don't set to null or error message will show up briefly when site loads
        accessToken: null,
        itemId: null,
        isError: false,
        backend: true,
        products: ["transactions"],
        linkTokenError: {
            error_type: "",
            error_code: "",
            error_message: "",
        },
        user: {}
    };
    const reducer = (state, action) => {
        switch (action.type) {
            case "SET_STATE":
                return { ...state, ...action.state };
            case "FETCH_USER":
                return {
                    ...state,
                    user: action.state.user,
                };
            case "SET_USER":
                localStorage.setItem("userId", JSON.stringify(action.state.userId));
                return {
                    ...state,
                    user: action.state.user,
                };
            case "LOGOUT":
                localStorage.removeItem('userId');
                return {
                    ...state,
                    user: {}
                };

            default:
                return { ...state }
        }
    };


    const [state, dispatch] = useReducer(reducer, initialState);

    const { Provider } = Context;

    return <Provider value={{ ...state, dispatch }}>{props.children}</Provider>;

}

export { Context, AppProvider }
