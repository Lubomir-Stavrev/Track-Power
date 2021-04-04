import React from 'react'
import { Link } from "react-router-dom";
import history from '../history'
import style from './Auth.module.css'
import service from '../../server/service';

export default () => {

    function handleRegister(e) {
        e.preventDefault();

        let registerEmail = e.target.email;
        let registerPassword = e.target.password;
        let registerRePassword = e.target.rePassword;

        if (registerPassword.value != registerRePassword.value) {

            registerPassword.value = '';
            registerRePassword.value = '';
            return;
        }
        if (registerPassword.value.length < 6) {

            return;
        }
        service.register(registerEmail.value, registerPassword.value)
            .then(res => {
                if (res) {
                    console.log(res);
                    return;
                } console.log(res);
                history.push('/login')

            })
    }

    return (
        <div className={style.authWrapper} >

            <form className={style.formDefault} onSubmit={(e) => handleRegister(e)}>


                <label htmlFor="email">Email</label>
                <input className={style.inputDefault} name="email" placeholder="example@email.com" type="email" />
                <br />
                <label>Password</label>
                <input type="password" name="password" className={style.inputDefault} />
                <br />
                <label>Repeat Password</label>
                <input type="password" name="rePassword" className={style.inputDefault} />
                <br />

                <button className="defaultButton" type="submit">Register</button>

                <br />
                <Link to="/login" className={style.authRedirect}>
                    <span>Already have an account?</span>
                </Link>
            </form>
        </div>
    );

}

