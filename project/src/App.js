import { Switch, Route } from "react-router-dom";
import { Fragment } from "react";
import './App.css';



import BackroundTemplate from './components/BackroundTemplate/BackroundTemplate';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import User from './components/User/User'
import Header from './components/Header/Header'



function App() {

    return (
        <Fragment>
            <BackroundTemplate>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/userProfile" exact component={User} />
                </Switch>


            </BackroundTemplate>
        </Fragment>
    )

}

export default App;