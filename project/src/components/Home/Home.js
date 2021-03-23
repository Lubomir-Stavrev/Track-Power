import { Fragment } from 'react';
import { Link } from "react-router-dom";

import style from '../BackroundTemplate/BackroundTemplate.module.css'

function Home(props) {

    function isLogged() {
        if (localStorage.getItem('auth')) {
            return true;
        }
        return false;
    }
    return (

        <Fragment>

            <div className={style.title}>
                Welcom to<span className={style.highlight}> Track Power</span>.
                            </div>
            <div>
                {isLogged ?
                    <Link to="/userProfile/logs">
                        <button className="defaultButton">
                            Get Started
                                <i className="buttonArrow">➤</i>
                        </button>
                    </Link>
                    :
                    <Link to="/login">
                        <button className="defaultButton">
                            Get Started
                                <i className="buttonArrow">➤</i>
                        </button>
                    </Link>
                }

            </div>
        </Fragment>


    );
}

export default Home
