import React, {Component} from 'react';
import UserApi from '../api/UserApi';

class Register extends Component {
  constructor(props) {
  super(props);
    this.state={
      username: "",
      error: "",
      emailerror:"",
      isLoading: false

    }
    this.onRegister = this.onRegister.bind(this)
    this.onEmail = this.onEmail.bind(this)
  }

  
 
  onEmail(e){
    var regex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(this.refs.email.value,) ===false){
        this.setState({
          emailerror: "Invalid Email Format"
        })
    }
    
    
  }

  onRegister(e){
        e.preventDefault();
        let data={
            first_name: this.refs.first_name.value,
            last_name: this.refs.last_name.value,
            username: this.refs.username.value,
            password: this.refs.password.value,
            email: this.refs.email.value,
        }
        UserApi.onRegister(data).then((res)=>{
            console.log(res.data); //access data here //check the console
            const data = res.data;
            if(data.success){
              this.setState({  
                user: data.response._id,
                username: data.response.username,
              });
              this.context.router.push('/todo');
              console.log(data);
              return;
            }else{
              this.setState({
                error: data.response.message
              });
              console.log(data);
              console.log("Register Failed!");
            }
        }).catch((err)=>{
          console.log(err);
        });
  }

  render() {
    return (
      <div className="info">

                <br/>
          <br/>
                <br/>
          <br/>
           <p>{this.state.emailerror}</p>
          <p>{this.state.error}</p>
                    <br/>
 <table >
 <tr><td>

          <label>First name</label></td>
          <td><input type="text" placeholder="Juan" ref="first_name">
          </input>
           </td>
</tr>
 <tr><td>
          <label>Last name</label></td>
          <td><input type="text" placeholder="Dela Cruz" ref="last_name"> 
          </input> </td></tr>

 <tr><td>
          <label>Username</label></td>
          <td><input type="text" placeholder="juandelacruz" ref="username">
          </input> </td></tr>

 <tr><td>
          <label>Password</label></td>
          <td><input type="password" placeholder="" ref="password"> 
          </input> </td></tr>

  <tr><td>         
          <label>E-mail</label></td>
          <td><input type="text" placeholder="juan@yahoo.com" ref="email" onKeyPress={this.onEmail} > 
          </input> </td></tr>
    </table>      
          <br/>
          <button onClick={this.onRegister} value="Register">Register</button>

      </div>
    )
  }
}

Register.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default Register;
