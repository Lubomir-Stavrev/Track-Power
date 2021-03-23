import { Fragment } from 'react';
import React, { Component } from "react";
import style from './Header.module.css'

import { Link } from "react-router-dom";
import services from '../../server/service'


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayPhase: "none",
            isAuthenticated: services.isLogged(),
        }

        this.logout = this.logout.bind(this);
        this.showContant = this.showContant.bind(this);
        this.hideContant = this.hideContant.bind(this);
    }

    showContant(e) {
        this.setState({ displayPhase: "block" })
        this.setState({ isAuthenticated: services.isLogged() })
    }
    hideContant(e) {
        this.setState({ displayPhase: "none" });
        this.setState({ isAuthenticated: services.isLogged() })
    }

    logout() {
        services.signOut();
        this.setState({ isAuthenticated: false })
    }



    render() {
        return (
            <Fragment>
                <header onMouseLeave={(e) => this.hideContant(e)} id={style.header}>
                    <div className={style.barsContainer} onMouseOver={(e) => this.showContant(e)}
                    >
                        <div className={style.bar1}></div>
                        <div className={style.bar2}></div>
                        <div className={style.bar3}></div>
                    </div>
                    <div className={style.dropDownContant} style={{ display: this.state.displayPhase }}>
                        <Link to="/">Home</Link>
                        <br />
                        {this.state.isAuthenticated
                            ?
                            <Fragment>
                                <Link to="/userProfile/logs">Profile</Link>
                                <br />

                                <Link to="/" onClick={(e) => this.logout()}>Logout</Link>
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