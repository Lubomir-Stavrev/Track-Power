import { Fragment } from "react";
import profileStyle from '../Profile/Profile.module.css'
import { Switch, Route, Link } from "react-router-dom";

export default () => {

    return (
        <Fragment>
            <form className={profileStyle.addExerciseForm}>
                <input type="text" name="exerciseName" placeholder="Exercise Name" />
                <br />
                <input type="number" name="sets" placeholder="Sets" />
                <br />
                <Link to="/userProfile/addExercise">
                    <button
                        type="submit"
                        className="defaultButton" >
                        Ok
                </button>
                </Link>

            </form>

        </Fragment>
    );
}