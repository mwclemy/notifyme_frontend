import React, { useEffect, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from "plaid-threads/Button";

import { Context } from "../../context";

const Link = () => {
  const { linkToken, dispatch } = useContext(Context);

  const onSuccess = React.useCallback(
    (public_token) => {
      // send public_token to server
      const setToken = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/set_access_token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": localStorage.getItem('userId')
          },
          body: `public_token=${public_token}`,
        });
        if (!response.ok) {
          dispatch({
            type: "SET_STATE",
            state: {
              itemId: `no item_id retrieved`,
              accessToken: `no access_token retrieved`,
              isItemAccess: false,
            },
          });
          return;
        }
        const data = await response.json();
        dispatch({
          type: "SET_STATE",
          state: {
            itemId: data.item_id,
            accessToken: data.access_token,
            isItemAccess: true,
          },
        });
      };
      setToken();
      dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
      window.history.pushState("", "", "/");
    },
    [dispatch]
  );

  let isOauth = false;
  const config = {
    token: linkToken,
    onSuccess,
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <Button type="button" large onClick={() => open()} disabled={!ready}>
      Connect Account
    </Button>
  );
};

Link.displayName = "Link";

export default Link;
