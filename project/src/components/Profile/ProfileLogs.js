import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import services from '../../server/service'
import { Link } from "react-router-dom";
import uniqid from 'uniqid'

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
                        Object.values(el[1].allWorkouts)
                            .forEach(nel => {
                                let date = (nel.exercises[nel.exercises.length - 1].logDate.dateNow);
                                let name = el[1].routineName;

                                let id = uniqid();
                                workouts.push({ date, name, id })
                            })
                    }
                })
            }).catch(err => { console.log(err) })
        return await workouts;
    }

    return (
        <Fragment>

            {allWorkouts.length > 0 ? allWorkouts.map((el, i) => {


                return (
                    <Link key={el.id} className='linkWithoutStyles' to={`/userProfile/log/${el.id}`}>
                        <div key={el.id} className={profileStyle.logContainer} >
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