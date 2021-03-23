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

        if (loginPassword.length < 6) {
            return;
        }
        service.login(loginEmail, loginPassword)
            .then(res => {
                if (res == 'Error') {
                    console.log(res)
                    return;
                }
                return history.push("/");

            })
    }

    return (
        <div className={style.authWrapper}>

            <form className={style.formDefault} onSubmit={(e) => handleLogin(e)}>

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

