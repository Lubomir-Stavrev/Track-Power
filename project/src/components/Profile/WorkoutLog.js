import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import services from '../../server/service'

export default (props) => {

    const [exercisesAndSets, setExercisesAndSets] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [routine, setRoutine] = useState([]);
    const [routineId, setRoutineId] = useState('');
    const [workoutId, setWorkoutId] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        console.log('Hi =>');
        setRoutineData()

        return () => {
            console.log('bye bye')
        }
    }, [])
    function setRoutineData() {
        let routineId = props.location.pathname.split('/')[3];
        let workoutId = props.location.pathname.split('/')[4];

        setRoutineId(routineId);
        setWorkoutId(workoutId);
        saveExercisesAndSets(routineId, workoutId)
        services.getRoutine(routineId)
            .then(res => {

                setExercises(res.routineExercises)

                setRoutine([res.routineName, res.routineNotes])
            }).catch(err => { console.log(err) })
    }

    function saveExercisesAndSets(rId, wId) {

        services.getWorkout(rId, wId).
            then(res => {

                setExercisesAndSets(res)
                setNote(res.note)

            }).catch(err => { console.log(err) })

    }

    function exercisesRows(times, exId) {
        let all = [];
        let exerSets = [];
        Object.values(exercisesAndSets)
            .forEach(el => {
                Object.values(el).forEach(set => {

                    if (el != undefined && set.exerciseSets != undefined) {
                        if (set.id == exId) {
                            exerSets.push(set);
                        }

                    }

                })

            })
        Object.values(exerSets).forEach(row => {

            if (row.exerciseSets != undefined) {
                row.exerciseSets.forEach(el => {

                    all.push(
                        <Fragment>
                            <tr >
                                <td><input type="text" defaultValue={el.weight || ''} placeholder={'weight'} name="weight" readOnly={true} /></td>
                                <td><input type="text" defaultValue={el.reps || ''} placeholder={'reps'} name="reps" readOnly={true} /></td>
                                <td><input type="text" defaultValue={el.notes || ''} placeholder={'notes'} name="notes" readOnly={true} /></td>
                            </tr>
                        </Fragment>
                    )
                })
            }

        })

        return all;
    }


    return (
        <Fragment>
            <form className={profileStyle.addExerciseForm} >
                <input
                    type="text"
                    name="routineName"
                    value={routine[0] || ''}
                    placeholder="Name"
                />
                <br />
                <input value={note || ''} type="text" name="notes" placeholder="Notes" />
                <br />
                <hr />
                <div>

                    {exercises.map(el => {
                        return (
                            <div key={el[0].id}

                                id={el[0].id} className={profileStyle.exerciseContainer}>
                                <div>
                                    <h1>
                                        {el[0].exerciseName}
                                    </h1>
                                </div>

                                {
                                    <table id={el[0].id}>
                                        {exercisesRows(el[0].sets, el[0].id)}
                                    </table>
                                }
                                <span>a</span>
                            </div>);

                    })}
                </div>
            </form>

        </Fragment>
    );
}