import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
import service from '../../server/service'
import history from '../history';
export default ({ onRemove, id }) => {
    const [removeButtonState, setRemoveButtonState] = useState('none');

    useEffect(() => {
        console.log('mount from button');

        return () => {
            console.log('unmount from button');
        }
    }, []);

    function removeExercise(e) {
        e.preventDefault();

        let routineId = window.location.pathname.split('/')[3];

        service.removeExerciseFromRoutine(id, routineId)
            .then(data => {
                console.log(data);
                setRemoveButtonState('none')
                onRemove();

            }).catch(err => {
                console.log(err);
            })


    }

    return (
        <div className={profileStyle.optionContainer}>
            <span onClick={(e) => removeButtonState == 'block'
                ? setRemoveButtonState('none') : setRemoveButtonState('block')}>
                &#8942;
                                        </span>
            <div style={{ display: removeButtonState }} className={profileStyle.dropDownRemoveButtonContainer}>
                <button onClick={(e) => removeExercise(e)}>Remove</button>
            </div>
        </div>
    );
}