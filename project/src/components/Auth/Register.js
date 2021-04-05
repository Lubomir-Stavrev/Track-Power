import { React, useState, Fragment } from 'react'
import { Link } from "react-router-dom";
import history from '../history'
import style from './Auth.module.css'
import service from '../../server/service';
import isStrongPassword from 'validator/lib/isStrongPassword';
export default () => {

    const [errorMessage, setErrorMessage] = useState('');


    function handleRegister(e) {
        e.preventDefault();

        let registerEmail = e.target.email;
        let registerPassword = e.target.password;
        let registerRePassword = e.target.rePassword;

        if (registerPassword.value != registerRePassword.value) {

            registerPassword.value = '';
            registerRePassword.value = '';
            setErrorMessage('Passwords should match!')
            return;
        }
        if (!isStrongPassword(registerPassword)) {
            setErrorMessage('The password is too week! It should contains at least one s$mbol!')
        }

        service.register(registerEmail.value, registerPassword.value)
            .then(res => {
                if (res?.err) {
                    console.log(res.err.message);
                    setErrorMessage(res.err.message)
                    return;
                }
                history.push('/login')

            }).catch(err => {
                console.log(err);
                return;
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
                <Link to="/login" className={style.authRedirect}>
                    <span>Already have an account?</span>
                </Link>
            </form>
        </div>
    );

}

