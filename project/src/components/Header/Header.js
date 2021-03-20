import { Fragment } from 'react';
import React, { Component } from "react";
import style from './Header.module.css'

import { NavLink, Link } from "react-router-dom";


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = { displayPhase: "none" }
    }


    render() {
        return (
            <Fragment>
                <header id={style.header}>
                    <div className={style.barsContainer} onClick={(e) =>
                        this.state.displayPhase == 'none' ? this.setState({ displayPhase: "block" }) :
                            this.setState({ displayPhase: "none" })}>
                        <div className={style.bar1}></div>
                        <div className={style.bar2}></div>
                        <div className={style.bar3}></div>
                    </div>
                    <div className={style.dropDownContant} style={{ display: this.state.displayPhase }}>
                        <Link to="/">Home</Link>
                        <br />
                        {localStorage.getItem('auth')
                            ?
                            <Fragment>

                                <Link to="/logout">Logout</Link>
                            </Fragment>

                            :
                            <Fragment>
                                <Link to="/login">Login</Link>
                                <br />
                                <Link to="/register">Register</Link>
                            </Fragment>
                        }

                    </div>

                </header>

            </Fragment >
        );
    }

}


export default Header;