import { Fragment } from 'react';
import { Link } from "react-router-dom";
import history from '../history'
import style from '../BackroundTemplate/BackroundTemplate.module.css'

function User(props) {

    function getEmail() {

        return JSON.parse(localStorage.getItem('auth'))
            ? JSON.parse(localStorage.getItem('auth')).email
            : history.push('/login');
    }
    function signOut(e) {
        localStorage.removeItem('auth');
    }
    return (

        <Fragment>

            <div className={style.userTitle}>
                Welcom <span className={style.highlightUser}>{getEmail()}</span>.
            </div>
            <div>

            </div>
        </Fragment>


    );
}

export default User
