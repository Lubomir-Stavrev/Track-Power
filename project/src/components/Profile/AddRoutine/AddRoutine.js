import { Fragment, useState, useEffect } from 'react';
import profile from '../Profile.module.css'
import addStyle from './Add.module.css';
import { Link } from "react-router-dom";
import history from '../../history'
import services from '../../../server/service'

export default ({ props, onAddingRoutineProps, routineProps, onSaving }) => {
    const [allExercises, setExercise] = useState({});
    const [routineName, setRoutineName] = useState('');

    useEffect(() => {
        setExercise(props);
        setRoutineName(routineProps[0]);

        return () => {
            console.log('unmount')
        }
    }, [])

    function handleRoutineChange(e) {
        e.preventDefault();

        if (e.target.name == 'routineName') {
            setRoutineName(e.target.value)
            setRoutineName(state => {

                onAddingRoutineProps(state);
                return state;
            })
        }
    }
    function removeExercise(e) {
        e.preventDefault();

        let exerciseId = e.target.parentNode.id;
        let exercises = allExercises;
        let newExercises = exercises.filter(el => el[0].id != exerciseId)

        setExercise(newExercises);


    }

    function saveRoutine(e) {
        e.preventDefault();
        if (allExercises.length <= 0) {
            return;
        }
        services.addRoutine(routineName, allExercises)
            .then(res => {
                onSaving();
                return history.push("/userProfile/routines");
            }).catch(err => {
                console.log(err);
                return <h1>An error has accured please try again</h1>;
            });
    }
    return (
        <Fragment>
            <form className={profile.addExerciseForm} >
                <input type="text" name="routineName"
                    value={routineName}
                    onChange={(e) => handleRoutineChange(e)} placeholder="Name" />
                <br />
                <button type="button" onClick={(e) => saveRoutine(e)} className={profile.saveButton}>Save</button>
                <br />
                <hr />
                <div>

                    {Object.values(allExercises).map(el => {
                        { console.log(el) }
                        return (

                            <div key={el[0].id} className={profile.logContainer}>
                                <div className={profile.date}>
                                    <h1>
                                        {el[0].exerciseName}
                                    </h1>
                                </div>
                                <div className={profile.workoutName}>
                                    <h1>
                                        Sets:  {el[0].sets}
                                    </h1>
                                </div>
                                <span id={el[0].id} className={addStyle.removeButtonContainer}>
                                    <button onClick={(e) => removeExercise(e)}>Remove</button>
                                </span>
                            </div>


                        );
                    })}
                </div>
                <Link to="/userProfile/addExercise">
                    <button type="submit" className="defaultButton" >
                        + Add Exercise
                </button>
                </Link>

            </form>

        </Fragment>
    );
}