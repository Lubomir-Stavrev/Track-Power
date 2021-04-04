import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import services from '../../server/service'
import moment from 'moment'
import history from '../history'

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
                console.log(res);
                setExercisesAndSets(res.allExercises)
                setNoteRoutine(res.note)

            }).catch(err => { console.log(err) })

    }

    function exercisesRows(times, exId) {
        let all = [];
        let exerSets = [];

        if (exercisesAndSets.length >= 1) {
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
        } else {
            for (let i = 0; i < times; i++) {
                all.push(
                    <Fragment>
                        <tr >
                            <td><input type="text" placeholder={'weight'} name="weight" /></td>
                            <td><input type="text" placeholder={'reps'} name="reps" /></td>
                            <td><input type="text" placeholder={'notes'} name="notes" /></td>
                        </tr>
                    </Fragment>
                )

            }
        }
        return all;
    }

    function saveWorkout(e) {
        e.preventDefault();
        let exercises = e.target.lastChild.children;
        let allTables = [];
        let exercisesData = [];
        let note = e.target.children[2].value;

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
        let dateNow = moment().format('MMM Do');
        exercisesData.push({ logDate: { dateNow } })


        services.saveExercises(exercisesData, note, routineId).catch(err => { console.log(err); })
        services.setLastExercise(exercisesData, note, routineId).catch(err => { console.log(err); })
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
                            </div>);

                    })}
                </div>
            </form>

        </Fragment>
    );
}