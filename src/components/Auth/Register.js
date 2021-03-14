import React from 'react'

import style from './Auth.module.css'

export default () => {
    return (
        <div className="site-Wrapper" >

            <form className={style.formDefault} onSubmit="">

                <label>Email</label>
                <input className={style.inputDefault} placeholder="example@email.com" type="email" />
                <br />
                <label>Password</label>
                <input type="password" className={style.inputDefault} />
                <br />
                <label>Repeat Password</label>
                <input type="password" className={style.inputDefault} />
                <br />
                <button className="defaultButton" type="submit">Register</button>
            </form>
        </div>
    );

}

