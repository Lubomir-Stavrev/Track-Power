import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import services from '../../server/service'
import history from '../history'
import dataProcessing from './helpers/DoRoutineDataProcess'

import RemoveExerciseButton from './RemoveЕxerciseButton';

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
        console.log('Right after WOW')
        setRoutineId(old => routineId);

        saveExercisesAndSets(routineId)
        services.getRoutine(routineId)
            .then(res => {
                console.log(res);
                if (res.routineExercises) {

                    setExercises(old => res.routineExercises);
                } else {
                    setExercises([]);
                }

                setRoutine([res.routineName])
            }).catch(err => { console.log(err) })
    }

    function saveExercisesAndSets(rId) {

        services.getLastWorkout(rId).
            then(res => {

                if (res) {
                    setExercisesAndSets(res.allExercises)
                    setNoteRoutine(res.note)
                }

            }).catch(err => { console.log(err) })

    }

    function getExerciseStructure(times, exId) {
        let exercises = dataProcessing.makeExerciseStructure(times, exId, exercisesAndSets)

        return exercises;
    }

    function saveWorkout(e) {
        e.preventDefault();
        if (exercises) {
            dataProcessing.processAndSaveWorkout(e, routineId);
        }

        return history.push("/userProfile/routines");
    }

    function handleExerciseRemove() {

        setRoutineData()


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


                    {exercises.length != 0 ? Array.from(exercises).map(el => {
                        if (el) {
                            return (
                                < Fragment >


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
                                        <RemoveExerciseButton onRemove={handleExerciseRemove} key={el[0].id} id={el[0].id}></RemoveExerciseButton>
                                    </div>
                                </Fragment>

                            );
                        }

                    }) : <h1>No exercises</h1>}
                </div>
            </form>

        </Fragment >
    );
}