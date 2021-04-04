import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import services from '../../server/service'
import { Link } from "react-router-dom";
import uniqid from 'uniqid'
import history from '../history'

export default () => {
    const [allWorkouts, setallWorkouts] = useState([]);

    useEffect(async () => {
        console.log('Hi =>');
        let data = await setRoutineData()
        setallWorkouts(data)

        return () => {
            console.log('bye bye')
        }
    }, [])

    async function setRoutineData() {
        let workouts = []
        await services.getAllRoutines()
            .then(res => {
                Object.entries(res).forEach(el => {
                    if (el[1].allWorkouts) {
                        Object.entries(el[1].allWorkouts)
                            .forEach(nel => {
                                console.log(nel)
                                let date = (nel[1].exercises[nel[1].exercises.length - 1].logDate.dateNow);
                                let name = el[1].routineName;

                                let workoutId = nel[0];
                                let routineId = el[1].routineId;
                                workouts.push({ date, name, workoutId, routineId })
                            })
                    }
                })
            }).catch(err => { console.log(err) })
        return await workouts;
    }
    async function deleteWorkout(e) {
        e.preventDefault();

        let routineId = e.target.parentNode.id.split('/')[0];
        let workoutId = e.target.parentNode.id.split('/')[1];
        try {
            let res = await services.deleteWorkout(routineId, workoutId)
            let rotineData = await setRoutineData()
            setallWorkouts(old => rotineData)

        } catch (err) {
            console.log(err);
        }



    }

    return (
        <Fragment>

            {allWorkouts.length > 0 ? allWorkouts.map((el, i) => {



                return (
                    <Link key={el.workoutId} className='linkWithoutStyles' to={`/userProfile/log/${el.routineId}/${el.workoutId}`}>
                        <div key={el.workoutId} className={profileStyle.logContainer} >
                            <div className={profileStyle.workoutName}>
                                <h1>
                                    {el.name}

                                </h1>
                            </div>
                            <div className={profileStyle.date}>
                                <h1>
                                    {el.date}

                                </h1>
                            </div>
                            <div className={profileStyle.routineSettings}>
                                <span>
                                    <a id={el.routineId + '/' + el.workoutId}>
                                        <button type="submit" onClick={(e) => deleteWorkout(e)} className={profileStyle.deleteButton}>Delete</button>
                                    </a>
                                </span>
                            </div>
                        </div>

                    </Link>
                );
            }) :
                <div>
                    <h1>There are no any workouts here :(</h1>
                    <h2>Yet ;)</h2>
                </div>
            }
        </Fragment >
    );
}