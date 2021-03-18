import userModel from './setFireBase'

const addKeyForAuth = 'AIzaSyCKJc85IX3FGMfxT3eZHehnQbRZ1N34WVs';
const usersURL = 'https://myownspa-default-rtdb.europe-west1.firebasedatabase.app/users.json';


export default {

    async login(email, password) {

        return await userModel.signInWithEmailAndPassword(email, password)
            .then(async function (data) {

                localStorage.setItem('auth', JSON.stringify({ uid: data.user.uid, email }));
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
}