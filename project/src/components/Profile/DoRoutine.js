import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import { Link, useParams } from "react-router-dom";
import services from '../../server/service'
import history from '../history'
import moment from 'moment'

export default (props) => {

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
        services.getRoutine(routineId)
            .then(res => {
                setExercises(res.routineExercises)
                setRoutine([res.routineName, res.routineNotes])
            }).catch(err => { console.log(err) })
    }

    function exercisesRows(times) {
        let all = []
        for (let i = 0; i < times; i++) {
            all.push(
                <Fragment>
                    <tr >
                        <td><input type="text" placeholder="weight" name="weight" /></td>
                        <td><input type="text" placeholder="reps" name="reps" /></td>
                        <td><input type="text" placeholder="notes" name="notes" /></td>
                    </tr>
                </Fragment>
            )
        }
        return all;
    }
    function saveWorkout(e) {
        e.preventDefault();
        let exercises = e.target.lastChild.children;
        let allTables = [];
        let exercisesData = [];

        for (let i = 0; i < exercises.length; i++) {
            allTables.push(exercises[i].children[1]);
        }

        for (let j = 0; j < allTables.length; j++) {

            let exerciseSets = [];
            for (let k = 0; k < allTables[j].children.length; k++) {
                exerciseSets.push(
                    {
                        weight: allTables[j].children[k].children[0].firstChild.value,
                        reps: allTables[j].children[k].children[1].firstChild.value,
                        notes: allTables[j].children[k].children[2].firstChild.value,
                    }
                )
            }
            exercisesData.push({ exerciseSets, id: allTables[j].id });

        }
        let dateNow = moment().format('DD/M/y');
        exercisesData.push({ logDate: { dateNow } })

        services.saveExercises(exercisesData, routineId).catch(err => { console.log(err); })
        services.setLastExercise(exercisesData, routineId).catch(err => { console.log(err); })
    }

    return (
        <Fragment>
            <form onSubmit={(e) => saveWorkout(e)} className={profileStyle.addExerciseForm} >
                <input
                    type="text"
                    name="routineName"
                    value={routine[0]}
                    placeholder="Name"
                />
                <br />
                <input value={routine[1]} type="text" name="notes" placeholder="Notes" />
                <br />
                <button type="submit" className={profileStyle.saveButton}>Save Workout</button>
                <br />
                <hr />
                <div>

                    {Object.values(exercises).map(el => {
                        return (
                            <div key={el[0].id} className={profileStyle.exerciseContainer}>
                                <div >
                                    <h1>
                                        {el[0].exerciseName}
                                    </h1>
                                </div>

                                {
                                    <table id={el[0].id}>
                                        {exercisesRows(el[0].sets)}
                                    </table>
                                }
                                <span>a</span>
                            </div>
                        );
                    })}
                </div>

            </form>

        </Fragment>
    );
}