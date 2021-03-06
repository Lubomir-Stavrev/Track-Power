import React, { Component, Fragment } from "react";
import profile from '../Profile.module.css'
import history from '../../history'
import uniqid from 'uniqid'


export default class extends Component {
    constructor(props) {
        super(props);

        this.oldState = {
            exercises: [],
        }
        this.addExercise = this.addExercise.bind(this);
    }
    addExercise(e) {
        e.preventDefault();
        let exerciseName = e.target.exerciseName.value;
        let sets = e.target.sets.value;
        if (exerciseName.length > 15 || Number(sets) > 10) {
            return;
        }
        let id = uniqid();

        let allExercises = this.oldState.exercises;
        allExercises.push({ exerciseName, sets, id })

        this.props.onAddingExercise(allExercises);
        return history.push("/userProfile/addRoutine");
    }
    render() {
        return (
            <Fragment>
                <form onSubmit={(e) => this.addExercise(e)} className={profile.addExerciseForm}>
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
