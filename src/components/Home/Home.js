import { Component, Fragment } from 'react';

import style from './Home.module.css'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogged: localStorage.getItem('name') ? true : false
        }

    }
    render() {
        return (
            <Fragment>
                <div className={style.siteWrapper} >

                    <h1 className="bigCenteredText" > Hello <i>!</i></h1>

                    <div className={style.centerAll} >
                        <button className="defaultButton">
                            Get Started
                             < i className="buttonArrow" > ⮞ </i>
                        </button >

                    </div>
                </div>

            </Fragment>

        );
    }
}

export default Home;