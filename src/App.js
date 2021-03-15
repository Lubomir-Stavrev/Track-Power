import { Router, Switch, Route } from "react-router-dom";
import history from './components/history';


import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import './App.css';
import { Fragment } from "react";


function App() {

    return (
        <Fragment>

            <div>
                <Header>Track Power</Header>
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/Register" exact component={Register} />
                    </Switch>
                </Router>
            </div>

        </Fragment>
    )

}

export default App;