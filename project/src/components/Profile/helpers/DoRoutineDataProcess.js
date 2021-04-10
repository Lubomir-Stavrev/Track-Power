import { Fragment } from 'react';
import services from '../../../server/service'
import moment from 'moment'

export default {

    processAndSaveWorkout(e, routineId) {

        let exercises = e.target.lastChild.children;
        let allTables = [];
        let exercisesData = [];
        let note = e.target.children[2].value;

        for (let i = 0; i < exercises.length; i++) {
            allTables.push(exercises[i].children[1]);
        }

        for (let j = 0; j < allTables.length; j++) {
            let exerciseSets = [];
            for (let k = 0; k < allTables[j].children.length; k++) {
                exerciseSets.push(
                    {
                        weight: allTables[j].children[k].children[0].firstChild.value,
                        reps: allTables[j].children[k].children[1].firstChild.value,
                        notes: allTables[j].children[k].children[2].firstChild.value,
                    }
                )
            }
            exercisesData.push({ exerciseSets, id: allTables[j].id });
        }
        let dateNow = moment().format('MMM Do HH mm');
        exercisesData.push({ logDate: { dateNow } })


        services.saveExercises(exercisesData, note, routineId).catch(err => { console.log(err); })
        services.setLastExercise(exercisesData, note, routineId).catch(err => { console.log(err); })

    },
    makeExerciseStructure(times, exId, exercisesAndSets) {
        let all = [];
        let exerSets = [];

        if (exercisesAndSets.length >= 1) {
            Object.values(exercisesAndSets)
                .forEach(el => {
                    if (el != undefined && el.exerciseSets) {
                        if (el.id == exId) {
                            exerSets.push(el);
                        }
                    }

                })
            Object.values(exerSets).forEach(row => {

                if (row.exerciseSets != undefined) {
                    row.exerciseSets.forEach((el, i) => {
                        i = i + 1
                        all.push(
                            <Fragment>
                                <tr key={i}>
                                    <td ><input type="text" placeholder={el.weight || 'weight'} name="weight" /></td>
                                    <td ><input type="text" placeholder={el.reps || 'reps'} name="reps" /></td>
                                    <td ><input type="text" placeholder={el.notes || 'notes'} name="notes" /></td>
                                </tr>
                            </Fragment>
                        )
                    })
                }

            })
        } else {
            for (let i = 0; i < times; i++) {
                all.push(
                    <Fragment>
                        <tr >
                            <td><input type="text" placeholder={'weight'} name="weight" /></td>
                            <td><input type="text" placeholder={'reps'} name="reps" /></td>
                            <td><input type="text" placeholder={'notes'} name="notes" /></td>
                        </tr>
                    </Fragment>
                )

            }
        }

        return all;
    }

}