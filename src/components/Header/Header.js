import { Fragment } from 'react';
import React, { Component } from "react";
import style from './Header.module.css'



function isAuth() {

    return localStorage.getItem('name') ? true : false;
}
class Header extends Component {

    constructor(props) {
        super(props)

    }
    render() {
        return (
            <Fragment>


                <header className={style.siteHeader}>
                    <a href="/">

                        <h1 className={style.bigCenteredTitle}>{this.props.children}</h1>
                    </a>

                    <div id={style.authOptions}>
                        <ul>

                            {!isAuth() ?
                                <Fragment>

                                    <li>
                                        <a onClick="" href="/login">Login</a>
                                    </li>
                                    <li>
                                        <a href="/register">Register</a>
                                    </li>
                                </Fragment> :
                                <li>
                                    <a href="logout">Logout</a>
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