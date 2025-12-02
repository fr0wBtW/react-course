import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([{
 // const array = React.useState([{ shortcut array destructuring

    message: "hello chatbot",
    sender: "user",
    id: "1"
  },{
    message: "Hello! How can I help you?" ,
    sender: "robot",
    id: "2"
  },{
        message:"can you get me today date?",
        sender:"user",
        id:"3"
  },{
        message:"Today is 26.11.2025", 
        sender:"robot",
        id:"4"
  }]);
//  const [chatMessages, setChatMessages] = array; there is a shortcut above
// const chatMessages = array[0]; above is the same but shortcut
 // const setChatMessages = array[1];

  return (
  <div className="app-container">
    <ChatMessages
    chatMessages={chatMessages}
    />
    <ChatInput 
    chatMessages={chatMessages}
    setChatMessages={setChatMessages}
    />
  </div>
);
}

export default App
