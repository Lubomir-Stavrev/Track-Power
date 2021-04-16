import { Fragment, useEffect, useState } from "react";
import profile from '../Profile.module.css'
import profileRoutines from './ProfileRoutines.module.css'
import { Link } from "react-router-dom";
import services from '../../../server/service'
import sadFace from '../profileImages/sad.png';

export default () => {
    const [allRoutines, setAllRoutines] = useState([]);
    useEffect(async () => {

        let data = await getRoutines();
        if (data) {
            setAllRoutines(data);
        }
        return () => {

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
        if (rotineData) setAllRoutines(old => rotineData)
        else setAllRoutines([]);
    }
    return (
        <Fragment>


            {Object.keys(allRoutines).length !== 0 ? Object.entries(allRoutines).map(el => {
                return (

                    <Link key={el[1].routineId} className="linkWithoutStyles" to={`/userProfile/doRoutine/${el[1].routineId}`}>
                        <div key={el[1].routineId} className={profile.logContainer}>
                            <div className={profile.workoutName}>
                                <h1>
                                    {el[1].routineName}
                                </h1>
                            </div>

                            <div className={profileRoutines.routineSettings}>
                                <span>
                                    <a id={el[1].routineId}>
                                        <button type="submit" onClick={(e) => deleteRoutine(e)} className={profileRoutines.deleteButton}>Delete</button>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            }) : <div className={profile.emptyPageContainer}>
                <h1>No Rotines Yet!</h1>
                <img src={sadFace} alt="" />
            </div>}

            <div id={profileRoutines.addRoutine}>
                <Link to="/userProfile/addRoutine">
                    <span>
                        +
                    </span>
                </Link>
            </div>
        </Fragment>
    );
}