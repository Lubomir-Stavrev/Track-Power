import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import history from '../history'
import style from '../BackroundTemplate/BackroundTemplate.module.css'
import userStyle from '../User/User.module.css'

import services from '../../server/service'

const User = ({
    props,
}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(services.isLogged());
    function getEmail() {

        return JSON.parse(localStorage.getItem('auth'))
            ? JSON.parse(localStorage.getItem('auth')).email
            : history.push('/login');
    }
    return (

        <Fragment>
            <div id={userStyle.profileWrapper}>

                <div className={style.userTitle}>
                    Welcom <span className={style.highlightUser}>{getEmail()}</span>.
                </div>

                <div id={userStyle.profileMain}>
                    <div className={userStyle.logContainer}>
                        <div className={userStyle.date}>
                            <h1>
                                Friday 31
                            </h1>
                        </div>
                        <div className={userStyle.workoutName}>
                            <h1>
                                Workout (A)
                            </h1>
                        </div>
                    </div>
                    <div className={userStyle.logContainer}>
                        <div className={userStyle.date}>
                            <h1>
                                Friday 31
                            </h1>
                        </div>
                        <div className={userStyle.workoutName}>
                            <h1>
                                Workout (A)
                            </h1>
                        </div>
                    </div>
                    <div className={userStyle.logContainer}>
                        <div className={userStyle.date}>
                            <h1>
                                Friday 31
                            </h1>
                        </div>
                        <div className={userStyle.workoutName}>
                            <h1>
                                Workout (A)
                            </h1>
                        </div>
                    </div>
                    <div className={userStyle.logContainer}>
                        <div className={userStyle.date}>
                            <h1>
                                Friday 31
                            </h1>
                        </div>
                        <div className={userStyle.workoutName}>
                            <h1>
                                Workout (A)
                            </h1>
                        </div>
                    </div>
                    <div className={userStyle.logContainer}>
                        <div className={userStyle.date}>
                            <h1>
                                Friday 31
                            </h1>
                        </div>
                        <div className={userStyle.workoutName}>
                            <h1>
                                Workout (A)
                            </h1>
                        </div>
                    </div>
                    <div className={userStyle.logContainer}>
                        <div className={userStyle.date}>
                            <h1>
                                Friday 31
                            </h1>
                        </div>
                        <div className={userStyle.workoutName}>
                            <h1>
                                Workout (A)
                            </h1>
                        </div>
                    </div>
                    <div className={userStyle.logContainer}>
                        <div className={userStyle.date}>
                            <h1>
                                Friday 31
                            </h1>
                        </div>
                        <div className={userStyle.workoutName}>
                            <h1>
                                Workout (A)
                            </h1>
                        </div>
                    </div>
                </div>

                <div id={userStyle.navContainer}>

                    <i className={'fas ' + userStyle.dumbellLogo}>&#xf44b;</i>
                    <i className={userStyle.pencilLogo}>✎</i>
                </div>
            </div>
        </Fragment>


    );
}

export default User
