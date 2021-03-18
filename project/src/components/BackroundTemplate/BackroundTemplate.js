import { Component } from 'react';


import style from './BackroundTemplate.module.css'

class BackroundTemplate extends Component {

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
                            {this.props.children}
                        </div>
                    </section>

                </div>
            </div>
        );
    }

}

export default BackroundTemplate;