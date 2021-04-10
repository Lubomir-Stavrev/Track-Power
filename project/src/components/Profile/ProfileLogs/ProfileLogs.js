import { Fragment, useState, useEffect } from 'react';
import profile from '../Profile.module.css'
import profileLogs from './ProfileLogs.module.css'
import services from '../../../server/service'
import { Link } from "react-router-dom";
import sadFace from '../profileImages/sad.png';
import moment from 'moment'

export default () => {
    const [allWorkouts, setAllWorkouts] = useState([]);

    useEffect(async () => {

        let data = await setRoutineData()
        setAllWorkouts(data)

        return () => {

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

                                let date = (nel[1].exercises[nel[1].exercises.length - 1].logDate.dateNow);
                                let name = el[1].routineName;

                                let workoutId = nel[0];
                                let routineId = el[1].routineId;
                                workouts.push({ date, name, workoutId, routineId })
                            })
                    }
                })
            }).catch(err => { console.log(err) })
        const Moment = require('moment')
        const array = await workouts;

        const sortedWorkouts = Object.values(array).sort((a, b) => new Moment(a.date).format('MMM Do HH mm') - new Moment(b.date).format('MMM Do HH mm')).reverse()
        let allWorkouts = Object.values(sortedWorkouts).map(el => {
            let splitedNewDate = el.date.split(' ').slice(0, 2);
            let newDate = splitedNewDate[0] + ' ' + splitedNewDate[1];
            el.date = newDate
            return el;
        })

        return await allWorkouts;
    }
    async function deleteWorkout(e) {
        e.preventDefault();

        let routineId = e.target.parentNode.id.split('/')[0];
        let workoutId = e.target.parentNode.id.split('/')[1];
        try {
            let res = await services.deleteWorkout(routineId, workoutId)
            let rotineData = await setRoutineData()
            setAllWorkouts(old => rotineData)

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>

            {allWorkouts.length > 0 ? allWorkouts.map((el, i) => {

                return (
                    <Link key={el.workoutId} className='linkWithoutStyles' to={`/userProfile/log/${el.routineId}/${el.workoutId}`}>
                        <div key={el.workoutId} className={profile.logContainer} >
                            <div className={profile.workoutName}>
                                <h1>
                                    {el.name}

                                </h1>
                            </div>
                            <div className={profile.date}>
                                <h1>
                                    {el.date}

                                </h1>
                            </div>
                            <div className={profileLogs.routineSettings}>
                                <span>
                                    <a id={el.routineId + '/' + el.workoutId}>
                                        <button type="submit" onClick={(e) => deleteWorkout(e)} className={profileLogs.deleteButton}>Delete</button>
                                    </a>
                                </span>
                            </div>
                        </div>

                    </Link>
                );
            }) :
                <div className={profile.emptyPageContainer}>
                    <h1>No Logs Yet!</h1>
                    <img src={sadFace} alt="" />
                </div>
            }
        </Fragment >
    );
}