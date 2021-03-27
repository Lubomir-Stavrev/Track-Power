import React, { Component, Fragment } from "react";

import profileStyle from '../Profile/Profile.module.css'
import { Switch, Route, Link } from "react-router-dom";
import history from '../history'

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: [],
        }
        this.addExercise = this.addExercise.bind(this);
    }
    addExercise(e) {
        e.preventDefault();
        let exerciseName = e.target.exerciseName.value;
        let sets = e.target.sets.value;

        let allExercises = this.state.exercises;
        allExercises.push({ exerciseName, sets })

        this.props.onAddingExercise(allExercises);
        return history.push("/userProfile/addRoutine");

    }
    render() {


        return (
            <Fragment>
                <form onSubmit={(e) => this.addExercise(e)} className={profileStyle.addExerciseForm}>
                    <input type="text" name="exerciseName" placeholder="Exercise Name" />
                    <br />
                    <input type="number" name="sets" placeholder="Sets" />
                    <br />

                    <button
                        type="submit"
                        className="defaultButton"
                    >
                        Add
                </button>




                </form>

            </Fragment>
        );
    }
}