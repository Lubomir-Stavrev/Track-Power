import { Fragment, useEffect, useState } from "react";
import profileStyle from '../Profile/Profile.module.css'
import { Link } from "react-router-dom";
import services from '../../server/service'

export default () => {
    const [allRoutines, setAllRoutines] = useState([]);
    useEffect(() => {

        services.getAllRoutines().then(res => {
            setAllRoutines(res)

        }).catch(err => {
            console.log(err);
        })

        return () => {
            console.log('bye ')
        }
    }, [])

    return (
        <Fragment>
            {allRoutines ? Object.values(allRoutines).map(el => {
                return (
                    <Fragment>
                        <div className={profileStyle.logContainer}>
                            <div className={profileStyle.workoutName}>
                                <h1>
                                    {el.routineName}
                                </h1>
                            </div>

                            <span>
                                <i class="fas fa-bars"></i>

                            </span>
                        </div>

                    </Fragment>
                );
            }) : <h2>There are no any routines :(</h2>
            }

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