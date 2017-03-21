import React, {PropTypes} from 'react';
import './public/stylesheets/font-awesome.mon.css';
import './public/stylesheets/w3-theme-black.css';
import './public/stylesheets/w31.css';

import Login from '../components/Login.js';
import Register from '../components/Register.js';



function User(props){
    return(
        <div>

        
            {props.login?
                <div className="App-section" onFocus={props.handleLogin}>
                                     <div className = "form">
                    <Login/>   
                    <br/>

                    <button onClick={props.switch} value="RegForm">Register</button> 
                    </div>
                </div>:
                <div className="App-section" onFocus={props.handleRegister}>  
                                    <div className = "form">                
                    <Register />
                    <br/>

                    <button onClick={props.switch} value="LoginForm">Back</button>
                    </div>
                </div>
            }
            
        </div>
    );
}

User.PropTypes = {
    login: PropTypes.bool.isRequired,
    switch: PropTypes.func.isRequired,
    handleRegister: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
}

export default User;
