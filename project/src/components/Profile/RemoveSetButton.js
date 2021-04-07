import { Fragment, useState, useEffect } from 'react';
import profileStyle from '../Profile/Profile.module.css'
export default () => {
    const [removeButtonState, setRemoveButtonState] = useState('none');
    return (

        <div className={profileStyle.optionContainer}>
            <span onClick={(e) => removeButtonState == 'block'
                ? setRemoveButtonState('none') : setRemoveButtonState('block')}>
                &#8942;
                                        </span>
            <div style={{ display: removeButtonState }} className={profileStyle.dropDownRemoveButtonContainer}>
                <button>Remove</button>
            </div>
        </div>
    );
}