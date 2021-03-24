import { Fragment } from "react";
import profileStyle from '../Profile/Profile.module.css'
import { Switch, Route, Link } from "react-router-dom";


export default () => {

    return (
        <Fragment>
            <form className={profileStyle.addExerciseForm}>
                <input type="text" name="name" placeholder="Name" />
                <br />
                <input type="text" name="notes" placeholder="Notes" />
                <br />
                <button type="submit" className={profileStyle.saveButton}>Save</button>
                <br />
                <hr />
                <div>

                </div>

                <Link to="/userProfile/addExercise">
                    <button
                        type="submit"
                        className="defaultButton" >
                        + Add Exercise
                </button>
                </Link>

            </form>

        </Fragment>
    );
}