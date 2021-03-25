import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import { Switch, Route, Link } from "react-router-dom";



export default ({
    props,
}) => {
    const [allExercises, setExercise] = useState({});
    useEffect(() => {
        setExercise(props);
        return () => {
            // Anything in here is fired on component unmount.
        }
    }, [])
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
                    {Object.values(allExercises).map(el => {
                        return (
                            <div>
                                <h1>{el[0].exerciseName}</h1>
                                <h2>{el[0].sets}</h2>
                            </div>
                        );
                    })}
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