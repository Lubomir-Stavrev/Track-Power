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

            <div className={style.title}>
                Welcom <span className={style.highlight}>{getEmail()}</span>.
            </div>
            <div>

                <Link to="/">
                    <button onClick={(e) => signOut(e)} className="defaultButton">
                        Logout
                        </button>
                </Link>

            </div>
        </Fragment>


    );
}

export default User
