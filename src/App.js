import { useState, useEffect, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import './App.css';

import Navbar from './components/Navbar.js'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import LinkAccount from './pages/LinkAccount';
import { Context } from "./context";
function App() {
  const { user, dispatch } = useContext(Context);

  const fetchUser = () => {
    if (localStorage.getItem('userId')) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
        headers: {
          "Authorization": localStorage.getItem('userId')
        }
      })
        .then((response) => {
          dispatch({
            type: "FETCH_USER",
            state: {
              user: response.data.user,
            },
          });
        })
    }
  }
  useEffect(fetchUser, [])

  return (
    <div>
      <Navbar />

      <Route path="/" exact component={Home} />

      <Route path="/signup" render={(routeInfo) => {
        if (user.id) {
          return <Redirect to="/profile" />
        } else {
          return <Signup />
        }
      }} />

      <Route path="/login" render={(routeInfo) => {
        if (user.id) {
          return <Redirect to="/profile" />
        } else {
          return <Login />
        }
      }} />

      <Route path="/profile" render={(routeInfo) => {
        if (user.id) {
          return <Profile />
        } else {
          return <Redirect to="/login" />
        }
      }} />

      <Route path="/link-account" render={(routeInfo) => {
        if (user.id) {
          return <LinkAccount />
        } else {
          return <Redirect to="/login" />
        }
      }} />
    </div>
  );
}

export default App;