import React  from 'react';
import io from 'socket.io-client';
import {emojify} from 'react-emojione';
import Linkify from 'react-linkify';


class ChatRoom extends React.Component{
  constructor(props){
    super(props);
    this.state = {newMessage : '', allMessages: []};

    this.inputValue = this.inputValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  componentDidMount(){ 
    this.socket = io('http://3.120.96.16:3000');
    this.socket.on('messages',(messages) => {
      console.log(messages);
      this.setState({allMessages: messages})
      });
      
    this.socket.on('new_message', (message) =>{
      console.log("New message: "+ message);
      this.setState({allMessages: [...this.state.allMessages, message]
      });
    });
  }

  componentWillUnmount(){
    this.socket.disconnect();
  }

  inputValue(e){
    this.setState({newMessage: e.target.value, infoMsg: ''});
  }

  onSubmit(e){
    e.preventDefault();
    if(this.state.newMessage.length > 200){
      this.setState({infoMsg: 'The message should be between 1-200 characters long'});
      return;
    } else if(this.state.newMessage.length === 0){
      this.setState({infoMsg: 'The message should be at least 1 character long'});
      return;
    }

    this.socket.emit('message', {
      username: this.props.userName,
      content:this.state.newMessage
    }, (response) => {
     this.state.allMessages.push({username: this.props.userName, content: this.state.newMessage});
     this.setState({allMessages: this.state.allMessages, newMessage: ''})
      //console.log('EMITED', response);
    });
  }

  renderMessage(){
    //console.log('renderMessage');
    let {allMessages} = this.state;

    const componentDecorator = (href, text, key) => (
      <a href={href} key={key} target="_blank">
        {text}
      </a>
    );

    return allMessages.map(({username, content}, idx) =>(
      <div key = {idx}>
         <span style = {{color: 'blue'}}>{username}:</span>
        <span style = {{color: 'red'}}><Linkify componentDecorator={componentDecorator} >{emojify(content)}</Linkify></span>
      </div>
    ));

  }

  render(){
    return (
      <div className = 'root'>
        <div className ='window'>
        <form onSubmit ={this.onSubmit}>
          <div className ='topicWindow'>
            <h1>Welcome {this.props.userName}</h1>
          </div>
          <div className = 'chatWindow'>
            <div className = 'chatText'>
              {this.renderMessage()}
            </div>
            <p>{this.state.infoMsg}</p>
          </div>
          <input className = 'chatBox'
          placeholder ='Write you chat message here...'
          onChange = {this.inputValue}
          value = {this.state.newMessage}>
          </input>
          </form>
          <button onClick = {this.props.onLogOut}>LOG OUT</button>
          </div>
      </div>
    )
  }
}

export default ChatRoom;
