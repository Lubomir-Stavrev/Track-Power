import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import services from '../../server/service'
import history from '../history'
import dataProcessing from './helpers/DoRoutineDataProcess'

export default (props) => {

    const [exercisesAndSets, setExercisesAndSets] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [routine, setRoutine] = useState([]);
    const [noteRoutine, setNoteRoutine] = useState([]);
    const [routineId, setRoutineId] = useState('');

    useEffect(() => {
        console.log('mount')
        setRoutineData()

        return () => {
            console.log('umount')
        }
    }, [])
    function setRoutineData() {
        let routineId = props.location.pathname.split('/')[3];

        setRoutineId(routineId);

        saveExercisesAndSets(routineId)
        services.getRoutine(routineId)
            .then(res => {
                console.log(res)
                setExercises(res.routineExercises)

                setRoutine([res.routineName])
            }).catch(err => { console.log(err) })
    }

    function saveExercisesAndSets(rId) {

        services.getLastWorkout(rId).
            then(res => {

                setExercisesAndSets(res.allExercises)
                setNoteRoutine(res.note)

            }).catch(err => { console.log(err) })

    }

    function getExerciseStructure(times, exId) {
        let exercises = dataProcessing.makeExerciseStructure(times, exId, exercisesAndSets)

        return exercises;
    }

    function saveWorkout(e) {
        e.preventDefault();
        dataProcessing.processAndSaveWorkout(e, routineId);

        return history.push("/userProfile/routines");
    }
    return (
        <Fragment>
            <form onSubmit={(e) => saveWorkout(e)} className={profileStyle.addExerciseForm} >
                <input
                    type="text"
                    name="routineName"
                    value={routine[0] || ''}
                    placeholder="Name"
                    readOnly={true}
                />
                <br />
                <input type="text" defaultValue={noteRoutine || ''} name="notes" placeholder="Notes" />
                <br />
                <button type="submit" className={profileStyle.saveButton}>Save Workout</button>
                <br />
                <hr />
                <div>

                    {exercises.map(el => {
                        return (
                            <Fragment>

                                <div key={el[0].id}

                                    id={el[0].id} className={profileStyle.exerciseContainer}>
                                    <div>
                                        <h1>
                                            {el[0].exerciseName}
                                        </h1>
                                    </div>

                                    {
                                        <table id={el[0].id}>
                                            {getExerciseStructure(el[0].sets, el[0].id)}
                                        </table>
                                    }

                                </div>


                            </Fragment>

                        );

                    })}
                </div>
            </form>

        </Fragment >
    );
}