import React, { Component } from "react";
import "./App.css";
import ChatInput from './components/ChatInput/ChatInput'
import moduleName from './components/ChatHistory/ChatHistory'
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from "./components/ChatHistory/ChatHistory";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: []
    }
   
  }
  componentDidMount() {
    connect((msg) => {
      console.log("New Message")
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      console.log(this.state);
    });
  }
  send(event) {
    if(event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <ChatInput send={this.send}/>
        <ChatHistory chatHistory={this.state.chatHistory}/>
        <button onClick={this.send}>Hit</button>
      </div>
    );
  }
}

export default App;