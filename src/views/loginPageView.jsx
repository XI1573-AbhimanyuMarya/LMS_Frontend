import React from 'react';
import XebiaLogo from '../images/Logo.svg'
import Image from '../images/Image.png'
import { isEmpty, toString } from 'lodash';

export const loginPageView = (payload) => {

    const { email, password, isValid, onInputChange, isLoading, onFormSubmit } = payload

    const isDisabledButton = ( isEmpty( toString( email ) ) || isEmpty( toString( password ) ) );

    return (
        <div className='LoginPage'>
            <img src={XebiaLogo} alt="Xebia" className='Logo' />
            <div className="FormContainer">
                <div className="Container">
                    <span>Learning Management System</span>
                    <img src={Image} alt="Learning Management System" />
                    <form onSubmit={ onFormSubmit }>
                        <label className='borderText'>Email</label>
                        <input type="text" className="InputBox" value={ email } onChange={ (e) => onInputChange( {email: e.currentTarget.value} ) } />
                        <lable className='borderText'>Password</lable>
                        <input type="password" className="InputBox" value={ password } onChange={ (e) => onInputChange( {password: e.currentTarget.value} ) } />
                        { isValid ? null : <div className='forgot-password forgot-password-red'>Please Enter Correct Email and Password.</div> }
                        <button type='submit' className="LoginButton" disabled={ isDisabledButton }>
                            { isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    <span className='forgot-password'>Forgot Password?</span>
                </div>
            </div>          
            <footer className='Footer'>© All rights are reserved with Xebia IT Architect</footer>
        </div>
    )
}
