import React from 'react'

import style from './Auth.module.css'

import service from '../../server/service';

export default () => {

    function handleRegister(e) {

        let email = document.getElementById('register-Email');
        let password = document.getElementById('register-Password');
        let rePassword = document.getElementById('register-RePassword');

        if (password.value != rePassword.value) {

            password.value = '';
            rePassword.value = '';
            return;
        }
        if (password.value.length < 6) {

            return;
        }
        service.register(email.value, password.value)
            .then(res => {
                if (res == 'Error') {

                    return;
                }

            })
    }

    return (
        <div className="site-Wrapper" >

            <form className={style.formDefault} onSubmit={(e) => handleRegister(e)}>

                <label>Email</label>
                <input className={style.inputDefault} id="register-Email" placeholder="example@email.com" type="email" />
                <br />
                <label>Password</label>
                <input type="password" id="register-Password" className={style.inputDefault} />
                <br />
                <label>Repeat Password</label>
                <input type="password" id="register-RePassword" className={style.inputDefault} />
                <br />
                <button className="defaultButton" type="submit">Register</button>
            </form>
        </div>
    );

}

