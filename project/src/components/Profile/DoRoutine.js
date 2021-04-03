import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import services from '../../server/service'

export default (props) => {

    const [exercisesAndSets, setExercisesAndSets] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [routine, setRoutine] = useState([]);
    const [routineId, setRoutineId] = useState('');


    useEffect(() => {
        console.log('Hi =>');
        setRoutineData()

        return () => {
            console.log('bye bye')
        }
    }, [])
    function setRoutineData() {
        let routineId = props.location.pathname.split('/')[3];

        setRoutineId(routineId);

        saveExercisesAndSets(routineId)
        services.getRoutine(routineId)
            .then(res => {

                setExercises(res.routineExercises)

                setRoutine([res.routineName, res.routineNotes])
            }).catch(err => { console.log(err) })
    }

    function saveExercisesAndSets(rId) {

        services.getLastWorkout(rId).
            then(res => {

                setExercisesAndSets(res)

            }).catch(err => { console.log(err) })

    }

    function exercisesRows(times, exId) {
        let all = [];
        let exerSets = [];

        Object.values(exercisesAndSets)
            .forEach(el => {
                if (el != undefined && el.exerciseSets) {
                    if (el.id == exId) {
                        exerSets.push(el);
                    }
                }

            })

        Object.values(exerSets).forEach(row => {

            if (row.exerciseSets != undefined) {
                row.exerciseSets.forEach(el => {

                    all.push(
                        <Fragment>
                            <tr >
                                <td><input type="text" placeholder={el.weight || 'weight'} name="weight" /></td>
                                <td><input type="text" placeholder={el.reps || 'reps'} name="reps" /></td>
                                <td><input type="text" placeholder={el.notes || 'notes'} name="notes" /></td>
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
                <input value={routine[1] || ''} type="text" name="notes" placeholder="Notes" />
                <br />
                <button type="submit" className={profileStyle.saveButton}>Save Workout</button>
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