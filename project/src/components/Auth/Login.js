import { React, useState, Fragment } from 'react'
import { Link } from "react-router-dom";
import history from '../history'
import style from './Auth.module.css'
import service from '../../server/service';
export default () => {

    const [errorMessage, setErrorMessage] = useState('');
    function handleLogin(e) {
        e.preventDefault();


        let loginEmail = e.target.email.value;
        let loginPassword = e.target.password.value;
        let loginUsername = e.target.username.value;
        if (loginUsername.length <= 4) {
            setErrorMessage('The username should be at least 4 characters long!')
            return;
        } else if (loginUsername.length > 13) {
            setErrorMessage('The username should be no more than 13 characters long!')
        }
        service.login(loginEmail, loginPassword, loginUsername)
            .then(res => {
                if (res?.err) {
                    console.log(res.err.message);
                    setErrorMessage(res.err.message)
                    return;
                }
                return history.push("/");

            })
    }

    return (
        <div className={style.authWrapperLogin}>

            <form className={style.formDefault} onSubmit={(e) => handleLogin(e)}>
                <label htmlFor="username">Username</label>
                <input className={style.inputDefault} name="username" placeholder="pesho" type="text" />
                <br />
                <label htmlFor="email">Email</label>
                <input className={style.inputDefault} name="email" placeholder="example@email.com" type="text" />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className={style.inputDefault} />
                <br />
                <button className="defaultButton" type="submit">Login</button>
                <br />
                {errorMessage ?
                    setTimeout(function () { setErrorMessage(old => { return '' }) }, 3000) &&
                    <Fragment>
                        <div className={style.errorMessage}>
                            <span>{errorMessage}</span>
                        </div>
                        <br />
                    </Fragment>
                    :
                    <br />
                }
                <Link to="/register" className={style.authRedirect}>
                    <span>Don't have an account yet?</span>
                </Link>


            </form>
        </div>
    );

}

