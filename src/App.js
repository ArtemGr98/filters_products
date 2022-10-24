import React, {useEffect} from 'react';
import './App.css';
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {authMeAsync} from "./redux/authSlice";
import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import ErrorBlock from "./components/common/ErrorBlock/ErrorBlock";
import Loader from "./components/common/Loader/Loader";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            dispatch(authMeAsync())
        }
    },[dispatch])

    const {error, status} = useSelector(state => state.auth)
    const isAuth = useSelector(state => state.auth.user.isAuth)

    return (
        <div className="App">
            {status === 'pending' && <Loader />}
            {error && <ErrorBlock error={error}/>}
            <Header />
            {isAuth ? <Products /> : <Login />}
        </div>
    );
}

export default App;
