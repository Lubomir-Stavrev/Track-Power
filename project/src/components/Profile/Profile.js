import { Fragment, useState, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from "react-router-dom";
import style from '../BackroundTemplate/BackroundTemplate.module.css'
import profileStyle from '../Profile/Profile.module.css'
import ProfileLogs from './ProfileLogs/ProfileLogs'
import ProfileRoutines from './ProfileRoutines/ProfileRoutines'
import AddRoutine from './AddRoutine/AddRoutine'
import DoRoutine from './DoRoutine/DoRoutine'
import WorkoutLog from './WorkoutLog/WorkoutLog'
import NotFoundPage from '../notFound/NotFoundPage'
import { Icon, InlineIcon } from '@iconify/react';
import dumbbellIcon from '@iconify-icons/mdi/dumbbell';


import AddExercise from './AddRoutine/AddExercise'

const Profile = () => {
    const [allExercises, setExercise] = useState([]);
    const [routineProps, setRoutineProps] = useState([]);
    const [isRoutineActive, setIsRoutineActive] = useState(false);
    const [isLogActive, setIsLogActive] = useState(false);
    const history = useHistory()
    useEffect(() => {
        console.log('mount from Profile')

        let urlPath = window.location.href.split('/')[4];

        if (urlPath == 'routines') {
            setIsRoutineActive(true);
            setIsLogActive(false);
        } else if (urlPath == 'logs') {
            setIsRoutineActive(false);
            setIsLogActive(true);
        }
        return () => {
            console.log('umount')
        }
    }, [history])
    function getEmail() {

        return JSON.parse(localStorage.getItem('auth'))
            ? JSON.parse(localStorage.getItem('auth')).username
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

                        <Route component={NotFoundPage} />

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
                            <Icon icon={dumbbellIcon} />
                        </Link>
                    </i>
                </div>
            </div>
        </Fragment>
    );
}

export default Profile
