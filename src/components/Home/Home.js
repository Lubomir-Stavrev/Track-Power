import { Component } from 'react';

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
            <div className={style.siteWrapper} >


                <div className={style.centerAll} >
                    <div>
                        <h1 className="bigCenteredText" > Hello! </h1>
                        <button className="defaultButton">
                            Get Started
                             < i className="buttonArrow" > ⮞ </i>
                        </button >
                    </div>
                </div>
            </div>


        );
    }
}

export default Home;