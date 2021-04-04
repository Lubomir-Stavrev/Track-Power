import React from 'react'
import { Link } from "react-router-dom";
import history from '../history'
import style from './Auth.module.css'
import service from '../../server/service';

export default () => {

    function handleLogin(e) {
        e.preventDefault();


        let loginEmail = e.target.email.value;
        let loginPassword = e.target.password.value;
        let loginUsername = e.target.username.value;

        if (loginUsername.length <= 4 || loginUsername.length >= 14) {
            return;
        }
        if (loginPassword.length < 6) {
            return;
        }
        service.login(loginEmail, loginPassword, loginUsername)
            .then(res => {
                if (res == 'Error') {
                    console.log(res)
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

                <Link to="/register" className={style.authRedirect}>
                    <span>Don't have an account yet?</span>
                </Link>


            </form>
        </div>
    );

}

