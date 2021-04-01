import userModel from './setFireBase'

const addKeyForAuth = 'AIzaSyCKJc85IX3FGMfxT3eZHehnQbRZ1N34WVs';
const usersURL = 'https://myownspa-default-rtdb.europe-west1.firebasedatabase.app/users.json';
const db = 'https://track-power-default-rtdb.firebaseio.com/';


export default {

    async login(email, password) {

        return await userModel.signInWithEmailAndPassword(email, password)
            .then(async function (data) {

                localStorage.setItem('auth', JSON.stringify({ uid: data.user.uid, email, }));
            }).catch(err => {
                return err;
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
            }).catch(err => {

                return err;
            })
    },
    isLogged() {

        if (localStorage.getItem('auth')) {
            return true;
        }
        return false;
    },
    signOut() { localStorage.removeItem('auth'); },

    addRoutine(routineName, routineNotes, routineExercises) {

        return fetch(db + '.json', {
            method: 'POST',
            body: JSON.stringify({
                routineName,
                routineNotes,
                routineExercises,
                uid: localStorage.getItem('auth').uid
            })
        }).then(res => res.json());
    },
    async getAllRoutines() {

        let allRoutines = await fetch(db + '.json').then(res => res.json()).then(data => { return data });

        return await allRoutines

    },

    deleteRoutine(id) {
        return fetch(db + id + '/.json', {
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


    setLastExercise(exercises, id) {
        return fetch(db + id + '/lastWorkout/.json', {
            method: 'PATCH',
            body: JSON.stringify({
                exercises
            })
        }).then(res => res.json())
            .then(data => {
                return data;
            }).catch(err => { throw new Error(err) })


    },
    saveExercises(exercises, id) {
        return fetch(db + id + '/allWorkouts/.json', {
            method: 'POST',
            body: JSON.stringify({
                exercises
            })
        }).then(res => res.json())
            .then(data => {
                return data;
            }).catch(err => { throw new Error(err) })

    }
}