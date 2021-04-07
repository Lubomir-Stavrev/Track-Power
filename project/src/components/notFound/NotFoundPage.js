import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import style from './NotFound.module.css'
export default class NotFound extends Component {

    render() {
        return (
            <Fragment>
                <div className={style.notFoundContainer}>
                    <h1>Not Found 404</h1>
                    <Link to="/">
                        <button className={style.goButton}>
                            Go Home
                        </button>
                    </Link>
                </div>

            </Fragment >
        );
    }

}

