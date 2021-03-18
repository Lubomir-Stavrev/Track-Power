import React from 'react'
import { Link } from "react-router-dom";
import history from '../history'

import style from './Auth.module.css'
import service from '../../server/service';

export default () => {

    function handleLogin(e) {
        e.preventDefault();
        let email = document.getElementById('login-Email');
        let password = document.getElementById('login-Password');

        if (password.value.length < 6) {
            return;
        }
        service.login(email.value, password.value)
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

                <label>Email</label>
                <input className={style.inputDefault} id="login-Email" placeholder="example@email.com" type="text" />
                <br />
                <label>Password</label>
                <input type="password" id="login-Password" className={style.inputDefault} />
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

