import { Fragment } from 'react';
import React, { Component } from "react";
import style from './Header.module.css'

import { NavLink, Link } from "react-router-dom";


function isAuth() {

    return localStorage.getItem('auth') ? true : false;
}
class Header extends Component {

    constructor(props) {
        super(props)

    }
    render() {
        return (
            <Fragment>


                <header className={style.siteHeader}>
                    <Link to="/">
                        <h1 className={style.bigCenteredTitle}>{this.props.children}</h1>

                    </Link>



                    <div id={style.authOptions}>
                        <ul>

                            {!isAuth() ?
                                <Fragment>

                                    <li>
                                        <Link to="/login">
                                            login
                                        </Link>


                                    </li>
                                    <li>
                                        <Link to="/register">
                                            Register
                                        </Link>

                                    </li>
                                </Fragment> :
                                <li>
                                    <a href="logout" onClick={localStorage.removeItem('auth')}>Logout</a>
                                </li>
                            }

                        </ul>

                    </div>

                </header >
            </Fragment>
        );
    }

}


export default Header;