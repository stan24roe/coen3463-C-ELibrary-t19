import React, {Component, PropTypes} from 'react';
import './public/stylesheets/font-awesome.mon.css';
import './public/stylesheets/w3-theme-black.css';
import './public/stylesheets/w31.css';

import UserApi from '../api/UserApi';

class Login extends Component {
    constructor(props,context) {
      super(props,context);
        this.state={
          username: "",
          user:"",
          error: "",
        }
        this.inLogin = this.inLogin.bind(this)
        
    }

    inLogin(e){
        e.preventDefault();
        let data = {
            username: this.refs.username.value,
            password: this.refs.password.value,
        }
        UserApi.inLogin(data).then((res)=>{
            console.log(res);
            const data = res.data;
            if(data.success){
              this.setState({
                user: res.data.response._id,
                username: data.response.username,
              });
              this.context.router.push('/todo');
              // window.location = data.redirect;
              console.log(data);
              return;
            }else{
              this.setState({
                error: data.response
              });
              console.log(data);
              console.log("Login Failed!");}
            
            
        }).catch((err)=>{
          console.log(err);
        });
       
    }
    
    render(){
    return (
      <div className="counter">
          
          <br/>
          <br/>

          LOGIN!
          <br/>
          {this.state.error}
          <br/>
          <label>Username</label>
          <input type="text" placeholder="juandelacruz" ref="username">
          </input>
          <br/>
          <label>Password</label>
          <input type="password" placeholder="" ref="password"> 
          </input>
          <br/>
          <button onClick={this.inLogin} value="Login">Login</button>


          
      </div>
    )
  }
}
Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default Login;
