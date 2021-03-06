import userModel from './setFireBase'

const usersURL = 'https://myownspa-default-rtdb.europe-west1.firebasedatabase.app/users.json';
const db = 'https://track-power-default-rtdb.firebaseio.com/';


export default {

    async login(email, password, username) {

        return await userModel.signInWithEmailAndPassword(email, password)
            .then(async function (data) {

                localStorage.setItem('auth', JSON.stringify({ uid: data.user.uid, email, username }));
            }).catch(async err => {
                let error = {};
                error.err = err;
                return await error;
            })
    },
    async register(email, password) {

        return await userModel.createUserWithEmailAndPassword(email, password)
            .then(async function (data) {
                await fetch(usersURL, {
                    method: 'POST',
                    body: JSON.stringify({
                        admin: false,
                        email,
                    })
                })
            }).catch(async err => {
                let error = {};
                error.err = err;
                return await error;
            })
    },
    isLogged() {

        if (localStorage.getItem('auth')) {
            return true;
        }
        return false;
    },
    signOut() { localStorage.removeItem('auth'); },

    addRoutine(routineName, routineExercises) {

        return fetch(db + '.json', {
            method: 'POST',
            body: JSON.stringify({
                routineName,
                routineExercises,
                uid: JSON.parse(localStorage.getItem('auth')).uid
            })
        }).then(res => res.json());
    },
    async getAllRoutines() {

        let allRoutines = [];
        await fetch(db + '.json')
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach(el => {

                    if (el[1].uid == JSON.parse(localStorage.getItem('auth')).uid) {
                        el[1].routineId = el[0]
                        allRoutines.push(el[1])
                    }
                })
            });
        let userRoutines = await Object.assign({}, allRoutines);
        return await userRoutines;

    },

    deleteRoutine(id) {
        return fetch(db + id + '/.json', {
            method: 'DELETE'
        }).then(res => res.json())
            .catch(err => {
                throw new Error(err);
            })
    },

    deleteWorkout(rId, wId) {
        return fetch(db + `${rId}/allWorkouts/${wId}/.json`, {
            method: 'DELETE'
        }).then(res => res.json())
            .catch(err => {
                throw new Error(err);
            })
    },

    getRoutine(id) {
        return fetch(db + id + '/.json')
            .then(res => res.json())
            .then(data => {
                return data;
            }).catch(err => {
                throw new Error(err);
            })
    },


    setLastExercise(allExercises, note, id) {
        let exercises = { allExercises, note };
        return fetch(db + id + '/lastWorkout/.json', {
            method: 'PATCH',
            body: JSON.stringify({
                exercises,
            })
        }).then(res => res.json())
            .then(data => {
                return data;
            }).catch(err => { throw new Error(err) })

    },
    saveExercises(exercises, note, id) {

        return fetch(db + id + '/allWorkouts/.json', {
            method: 'POST',
            body: JSON.stringify({
                exercises,
                note
            })
        }).then(res => res.json())
            .then(data => {
                return data;
            }).catch(err => { throw new Error(err) })

    },

    getWorkout(rID, wId) {
        return fetch(db + `${rID}/allWorkouts/` + wId + '/.json')
            .then(res => res.json())
            .then(data => {
                return data;
            }).catch(err => {
                console.log(err);
            })
    },
    getLastWorkout(rID) {
        return fetch(db + `${rID}/lastWorkout/exercises/.json`)
            .then(res => res.json())
            .then(data => {
                return data;
            }).catch(err => {
                console.log(err);
            })
    },
    async removeExerciseFromRoutine(exerciseId, routineId) {
        let exerciseRowToDelete = '';
        await fetch(db + routineId + '/routineExercises/.json')
            .then(res => res.json())
            .then(data => {

                if (data) {

                    return Object.entries(data).forEach(exercise => {
                        if (exercise[1]) {

                            if (exercise[1][0].id == exerciseId) {
                                exerciseRowToDelete = exercise[0];
                            }
                        }
                    })
                }
            }).catch(err => { throw new Error(err) })

        console.log(exerciseRowToDelete)
        return await fetch(db + routineId + `/routineExercises/${exerciseRowToDelete}/0/.json`, {
            method: "DELETE"
        }).then(resDel => resDel.json())
            .then(dataDel => { return dataDel })
            .catch(err => { throw new Error(err) });
    }

}