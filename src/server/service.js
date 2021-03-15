import userModel from './setFireBase'

const addKeyForAuth = 'AIzaSyCKJc85IX3FGMfxT3eZHehnQbRZ1N34WVs';
const usersURL = 'https://myownspa-default-rtdb.europe-west1.firebasedatabase.app/users.json';


export default {

    login(email, password) {

        return userModel.signInWithEmailAndPassword(email, password)
            .then(function (data) {
                console.log(data)
                localStorage.setItem('auth', JSON.stringify({ uid: data.user.uid, email }));
            }).catch(err => {
                return 'Error';
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

                return 'Error';
            })
    },
}