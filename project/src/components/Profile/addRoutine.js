import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import { Switch, Route, Link } from "react-router-dom";



export default ({
    props,
    onAddingRoutineProps,
    routineProps
}) => {
    const [allExercises, setExercise] = useState({});
    const [routineName, setRoutineName] = useState('');
    const [routineNotes, setRoutineNotes] = useState('');
    useEffect(() => {

        console.log('Hello again !');
        setExercise(props);
        setRoutineName(routineProps[0]);
        setRoutineNotes(routineProps[1]);
        return () => {
            console.log('bye bye')
        }
    }, [])

    function handleRoutineChange(e) {
        e.preventDefault();

        if (e.target.name == 'routineName') {
            setRoutineName(e.target.value)
        } else if (e.target.name == 'notes') {
            setRoutineNotes(e.target.value)
        }

        onAddingRoutineProps(routineName, routineNotes);

    }
    return (

        <Fragment>

            <form className={profileStyle.addExerciseForm} >
                <input
                    type="text"
                    name="routineName"
                    value={routineName}
                    onChange={(e) => handleRoutineChange(e)} placeholder="Name"
                />
                <br />
                <input type="text" value={routineNotes} name="notes" onChange={(e) => handleRoutineChange(e)} placeholder="Notes" />
                <br />
                <button type="submit" className={profileStyle.saveButton}>Save</button>
                <br />
                <hr />

                <div>
                    {Object.values(allExercises).map(el => {
                        return (
                            <div className={profileStyle.logContainer}>
                                <div className={profileStyle.date}>
                                    <h1>
                                        {el[0].exerciseName}
                                    </h1>
                                </div>
                                <div className={profileStyle.workoutName}>
                                    <h1>
                                        Sets:  {el[0].sets}
                                    </h1>
                                </div>
                                <span>a</span>
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