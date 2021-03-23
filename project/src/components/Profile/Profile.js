import { Fragment, useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import history from '../history'
import style from '../BackroundTemplate/BackroundTemplate.module.css'
import profileStyle from '../Profile/Profile.module.css'
import ProfileLogs from './ProfileLogs'
import ProfileRoutines from './ProfileRoutines'
import addRoutine from './addRoutine'
import services from '../../server/service'

const Profile = ({
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
            <div id={profileStyle.profileWrapper}>

                <div className={style.userTitle}>
                    Welcom <span className={style.highlightUser}>{getEmail()}</span>.
                </div>

                <div id={profileStyle.profileMain}>
                    <Switch>
                        <Route path="/userProfile/logs" exact component={ProfileLogs} />
                        <Route path="/userProfile/routines" exact component={ProfileRoutines} />
                        <Route path="/userProfile/addRoutine" exact component={addRoutine} />
                    </Switch>

                </div>

                <div id={profileStyle.navContainer}>

                    <i >
                        <Link to="/userProfile/logs" className={profileStyle.pencilLogo}>
                            ✎
                        </Link>


                    </i>
                    <i >
                        <Link to="/userProfile/routines" className={'fas ' + profileStyle.dumbellLogo}>
                            &#xf44b;
                        </Link>
                    </i>
                </div>
            </div>
        </Fragment>


    );
}

export default Profile
