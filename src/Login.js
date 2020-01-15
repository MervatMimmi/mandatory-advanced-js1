import React from 'react';
import ChatRoom from './ChatRoom';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userName: '', validName: false};

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onLogOut = this.onLogOut.bind(this);  
    }   

    onLogOut(){
        this.setState({validName:false, userName: ''}); 
      }
      
    onSubmit(e){
        e.preventDefault();
        //console.log("submit");
        if(this.state.userName !== ''){
            let nameRegex = /^[A-ZÅÄÖa-zåäö\d\s-_]{1,12}$/;
            let valid = nameRegex.test(this.state.userName)
            if(valid){
            this.setState({validName: true});
            }
        }   
    }

    onChange(e){
        this.setState({userName:e.target.value})
    }

    render() {
        //console.log("Login username: " +this.state.userName);
        if(this.state.validName){
            return(
                <div>
                    <div className = 'chatroomContainer'>
                        <ChatRoom userName= {this.state.userName} onLogOut={this.onLogOut} />
                    </div>
                </div>
             )
        }
        else{
        return(
           <div className = 'loginContainer'>
               <div>
                   <form className= 'loginForm'>
                       <label>
                           <h2>SIGN IN</h2>
                        </label>
                       <input
                       onChange = {this.onChange}
                       value = {this.state.userName}
                       required = 'required'
                      
                       placeholder ='Username max 12 characters'
                       ></input>
                       <button onClick = {this.onSubmit}>LOG IN</button>
                   </form>
               </div>
           </div>
            )
        }
    }
}


export default Login;
