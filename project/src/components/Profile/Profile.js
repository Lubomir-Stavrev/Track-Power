import { Fragment, useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import history from '../history'
import style from '../BackroundTemplate/BackroundTemplate.module.css'
import profileStyle from '../Profile/Profile.module.css'
import ProfileLogs from './ProfileLogs'
import ProfileRoutines from './ProfileRoutines'
import AddRoutine from './AddRoutine'
import DoRoutine from './DoRoutine'
import WorkoutLog from './WorkoutLog'
import services from '../../server/service'

import AddExercise from './AddExercise'

const Profile = ({
    props,
}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(services.isLogged());
    const [allExercises, setExercise] = useState([]);
    const [routineProps, setRoutineProps] = useState([]);
    const [isRoutineActive, setIsRoutineActive] = useState(false);
    const [isLogActive, setIsLogActive] = useState(false);


    function getEmail() {

        return JSON.parse(localStorage.getItem('auth'))
            ? JSON.parse(localStorage.getItem('auth')).email
            : history.push('/login');
    }

    function handleAddingExercise(exercise) {
        let all = allExercises;
        all.push(exercise);
        setExercise(all);
    }

    function handleAddingRoutineProps(name, notes) {

        setRoutineProps([name, notes]);
    }
    function handleSave() {
        setExercise([]);
        setRoutineProps([]);
    }

    return (

        <Fragment>
            <div id={profileStyle.profileWrapper}>

                <div className={style.userTitle}>
                    <h4>
                        Welcome
                    </h4>
                    <span className={style.highlightUser}>{getEmail()}</span>.
                </div>

                <div id={profileStyle.profileMain}>
                    <Switch>
                        <Route path="/userProfile/doRoutine/" component={DoRoutine} />
                        <Route path="/userProfile/log/" component={WorkoutLog} />
                        <Route path="/userProfile/logs" exact component={ProfileLogs} />
                        <Route path="/userProfile/routines" exact component={ProfileRoutines} />
                        <Route path="/userProfile/addExercise" exact >
                            <AddExercise onAddingExercise={handleAddingExercise}></AddExercise>
                        </Route>

                        <Route path="/userProfile/AddRoutine" exact >
                            <AddRoutine
                                onAddingRoutineProps={handleAddingRoutineProps}
                                routineProps={routineProps}
                                props={allExercises}
                                onSaving={handleSave}
                            >

                            </AddRoutine>
                        </Route>


                    </Switch>

                </div>

                <div id={profileStyle.navContainer}>

                    <i onClick={() => { setIsLogActive(true); setIsRoutineActive(false); }}>
                        <Link to="/userProfile/logs" className={isLogActive ? profileStyle.pencilLogoActive : profileStyle.pencilLogo}>
                            ✎
                        </Link>
                    </i>
                    <i onClick={() => { setIsRoutineActive(true); setIsLogActive(false); }}>
                        <Link to="/userProfile/routines" className={isRoutineActive ? 'fas ' + profileStyle.dumbellLogoActive : 'fas ' + profileStyle.dumbellLogo}>
                            &#xf44b;
                        </Link>
                    </i>
                </div>
            </div>
        </Fragment>
    );
}


export default Profile
