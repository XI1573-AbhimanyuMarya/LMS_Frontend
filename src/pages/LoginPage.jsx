import React, { Component } from 'react';
import { loginPageView as LoginPageView} from '../views/loginPageView'
import { constants  } from '../modules/constants';
import { fetch } from '../modules/httpServices';
import { cloneDeep } from 'lodash';

class LoginPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isLoading: false,
            email: '',
            password: '',
            isValid: true,
            message: ''
        }
    }
    
    onInputChange = ( payload  ) => {
        this.setState( { ...this.state, ...payload, isValid: true } );
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState( { isLoading: true }, this.validateUserInfo )
    }

    validateUserInfo = () => {

        const { email, password } = this.state
        fetch.post( { url: constants.SERVICE_URLS.LOGIN, requestBody: { email, password }, callbackHandler: ( response ) => {

                const { status, message, payload } = response;
                const _state = cloneDeep( this.state );
                _state.isLoading = false;

                if( status === constants.SUCCESS ) {
                    _state.message = payload;
                    _state.isValid = true;
                } else {
                    _state.message = message;
                    _state.isValid = false;
                }

                this.setState( _state, this.redirectDashboardPage );

            }
        } );
    }

    redirectDashboardPage = () => {
        const _state = cloneDeep( this.state );
        if(_state.message === 'authincated user') {
            this.props.history.push('/employeeDashboard');
        }
    }

    render() {
        return (
            <div>
                <LoginPageView { ...{
                    ...this.state,
                    onInputChange: this.onInputChange,
                    onFormSubmit: this.onFormSubmit
                }}/>
            </div>
        )
    }
}

export default LoginPage

