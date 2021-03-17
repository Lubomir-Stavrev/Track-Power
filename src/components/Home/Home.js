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
            <div className={style.overflowWrap}>
                <div className={style.modalWrapFlex}>
                    <section id={style.home}>
                        <div className={style.lines}>
                            <div className={style.line}></div>
                            <div className={style.line}></div>
                            <div className={style.line}></div>
                        </div>
                        <div className={style.flex}>
                            <div className={style.title}>
                                Welcom to<span className={style.highlight}> Track Power</span>.
                            </div>
                            <div>
                                <button className="defaultButton">
                                    Get Started
                                <i className="buttonArrow">➤</i>
                                </button>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        );
    }

}

export default Home;