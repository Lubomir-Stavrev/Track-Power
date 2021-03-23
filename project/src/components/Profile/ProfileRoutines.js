import { Fragment } from "react";
import profileStyle from '../Profile/Profile.module.css'
import { Link } from "react-router-dom";
export default () => {

    return (
        <Fragment>
            <div className={profileStyle.logContainer}>
                <div className={profileStyle.date}>
                    <h1>
                        Friday 31
                            </h1>
                </div>
                <div className={profileStyle.workoutName}>
                    <h1>
                        Workout (A)
                            </h1>
                </div>
            </div>
            <div id={profileStyle.addRoutine}>
                <Link to="/userProfile/addRoutine">
                    <span>
                        +
                    </span>
                </Link>
            </div>
        </Fragment>
    );
}