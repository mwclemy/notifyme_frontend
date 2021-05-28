import { useState, useEffect, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import './App.css';

import Navbar from './components/NavBar/Navbar.js'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import LinkAccount from './pages/LinkAccount/LinkAccount';
import { Context } from "./context";
import Transactions from './pages/Transactions/Transactions';
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
          return <Redirect to="/transactions" />
        } else {
          return <Signup />
        }
      }} />

      <Route path="/login" render={(routeInfo) => {
        if (user.id) {
          return <Redirect to="/transactions" />
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

      <Route path="/connect-account" render={(routeInfo) => {
        if (user.id) {
          return <LinkAccount />
        } else {
          return <Redirect to="/login" />
        }
      }} />

      <Route path="/transactions" render={(routeInfo) => {
        if (user.id) {
          return <Transactions />
        } else {
          return <Redirect to="/login" />
        }
      }} />
    </div>
  );
}

export default App;