import { Fragment, useEffect, useState } from "react";
import profileStyle from '../Profile/Profile.module.css'
import { Link } from "react-router-dom";
import services from '../../server/service'

export default () => {
    const [allRoutines, setAllRoutines] = useState([]);
    useEffect(async () => {

        console.log('HEllo');
        let data = await getRoutines();
        setAllRoutines(data);
        return () => {
            console.log('bye ')
        }
    }, [])

    function getRoutines() {
        return services.getAllRoutines().then(res => {
            return res;
        }).catch(err => {
            console.log(err);
        })
    }

    async function deleteRoutine(e) {
        e.preventDefault();
        let routineId = e.target.parentNode.id;

        let res = await services.deleteRoutine(routineId);
        let rotineData = await getRoutines();
        setAllRoutines(old => rotineData);
    }
    return (
        <Fragment>


            {allRoutines ? Object.entries(allRoutines).map(el => {
                return (

                    <Link key={el[1].routineId} className="linkWithoutStyles" to={`/userProfile/doRoutine/${el[1].routineId}`}>
                        <div key={el[1].routineId} className={profileStyle.logContainer}>
                            <div className={profileStyle.workoutName}>
                                <h1>
                                    {el[1].routineName}
                                </h1>
                            </div>

                            <div className={profileStyle.routineSettings}>
                                <span>
                                    <a id={el[1].routineId}>
                                        <button type="submit" onClick={(e) => deleteRoutine(e)} className={profileStyle.deleteButton}>Delete</button>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            }) : <h2>There are no any routines :(</h2>}

            <div id={profileStyle.addRoutine}>
                <Link to="/userProfile/addRoutine">
                    <span>
                        +
                    </span>
                </Link>
            </div>
        </Fragment>
    );
}