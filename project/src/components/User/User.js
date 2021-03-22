import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import history from '../history'
import style from '../BackroundTemplate/BackroundTemplate.module.css'
import userStyle from '../User/User.module.css'

import services from '../../server/service'

const User = ({
    props,
}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(services.isLogged());
    function getEmail() {

        return JSON.parse(localStorage.getItem('auth'))
            ? JSON.parse(localStorage.getItem('auth')).email
            : history.push('/login');
    }
    return (

        <Fragment>
            <div id={userStyle.profileWrapper}>

                <div className={style.userTitle}>
                    Welcom <span className={style.highlightUser}>{getEmail()}</span>.
                </div>

                <div id={userStyle.profileMain}>
                    <table>
                        <tr>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th>
                        </tr>
                        <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                        </tr>
                    </table>
                </div>

                <div id={userStyle.navContainer}>
                    <div id={userStyle.iconsContainer}>
                        <i className={'fas ' + userStyle.dumbellLogo}>&#xf44b;</i>
                        <i className={userStyle.pencilLogo}>✎</i>


                    </div>
                </div>
            </div>
        </Fragment>


    );
}

export default User
