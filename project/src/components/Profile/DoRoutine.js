import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import { Link, useParams } from "react-router-dom";
import services from '../../server/service'
import history from '../history'


export default (props) => {

    const [exercises, setExercises] = useState([]);
    const [routine, setRoutine] = useState([]);

    useEffect(() => {
        console.log('Hi =>');
        setRoutineData()

        return () => {
            console.log('bye bye')
        }
    }, [])
    function setRoutineData() {
        let routineId = props.location.pathname.split('/')[3];

        services.getRoutine(routineId)
            .then(res => {
                setExercises(res.routineExercises)
                setRoutine([res.routineName, res.routineNotes])
            }).catch(err => { console.log(err) })
    }

    function looper(times) {
        let all = []
        for (let i = 0; i < 1; i++) {

            all.push(
                <Fragment>



                    <table>

                        <tr>
                            <td>
                                <input type="text" placeholder="kgs" />

                            </td>
                            <td>
                                <input type="text" placeholder="reps" />

                            </td>
                            <td>
                                <input type="text" placeholder="notes" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="kgs" />

                            </td>
                            <td>
                                <input type="text" placeholder="reps" />

                            </td>
                            <td>
                                <input type="text" placeholder="notes" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="kgs" />

                            </td>
                            <td>
                                <input type="text" placeholder="reps" />

                            </td>
                            <td>
                                <input type="text" placeholder="notes" />
                            </td>
                        </tr>

                    </table>


                </Fragment>
            )
        }

        return all;
    }

    return (
        <Fragment>
            <form className={profileStyle.addExerciseForm} >
                <input
                    type="text"
                    name="routineName"
                    value={routine[0]}
                    placeholder="Name"
                />
                <br />
                <input value={routine[1]} type="text" name="notes" placeholder="Notes" />
                <br />
                <button type="button" className={profileStyle.saveButton}>Start</button>
                <br />
                <hr />
                <div>

                    {Object.values(exercises).map(el => {
                        return (
                            <div key={el[0].id} className={profileStyle.logContainer}>
                                <div className={profileStyle.date}>
                                    <h1>
                                        {el[0].exerciseName}
                                    </h1>
                                </div>

                                {
                                    looper(el[0].sets)
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