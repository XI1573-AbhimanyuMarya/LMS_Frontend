import React, { Component } from 'react'
import { loginPageView as LoginPageView} from '../views/loginPageView'

class LoginPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <div>
                <LoginPageView />
            </div>
        )
    }
}

export default LoginPage

