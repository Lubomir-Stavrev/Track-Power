import { useState, useEffect } from 'react';
import removeExerciseStyle from './RemoveExercise.module.css';
import services from '../../../server/service'

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

        services.removeExerciseFromRoutine(id, routineId)
            .then(data => {
                console.log(data);
                setRemoveButtonState('none')
                onRemove();

            }).catch(err => {
                console.log(err);
            })


    }

    return (
        <div className={removeExerciseStyle.optionContainer}>
            <span onClick={(e) => removeButtonState == 'block'
                ? setRemoveButtonState('none') : setRemoveButtonState('block')}>
                &#8942;
                                        </span>
            <div style={{ display: removeButtonState }} className={removeExerciseStyle.dropDownRemoveButtonContainer}>
                <button onClick={(e) => removeExercise(e)}>Remove</button>
            </div>
        </div>
    );
}