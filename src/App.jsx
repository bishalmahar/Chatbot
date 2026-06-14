import { useState} from 'react'
import { Chatbot} from 'supersimpledev'
import './App.css'
import robotImage from './assets/robot.png'
import userImage from './assets/user.png'

 function InputMessage({message,setMessage}){
        const[inputText,setInputText]=useState('')
        
        function saveMessage(event){ 
            setInputText(event.target.value);
          
        }

         async function sendMessage(){
          setInputText('');

          const newChatMessage = [
            ...message,
            {
              message : inputText,
              sender : "user",
              key :crypto.randomUUID()
            }
          ]
            setMessage([
              ...newChatMessage,
              {
                message : 'Loading...',
                sender : 'robot',
                key :crypto.randomUUID()
              }
            ]);

          const response = await Chatbot.getResponseAsync(inputText);

          setMessage([
            ...newChatMessage,
            {
              message: response,
              sender: 'robot',
              key: crypto.randomUUID() // same key so it replaces the loading message
            }
          ]);

          

        }

        function enterMessage(event){
          if (event.key === 'Enter'){
             sendMessage();
          }else if (event.key === 'Escape'){
            setInputText('');
          }
        }
        return(
          <div className="Textbox-container">
            <input className="Text-box"
              placeholder="Send a message to chatbot" 
              size="30"
              onChange={saveMessage}
              value={inputText}
              onKeyDown={enterMessage}
            />
            <button className="send-button" onClick={sendMessage}>
              send
            </button>
          </div>
        );
      }
      function ChatMessage({message,sender}){  
        return(
          <div className={sender==='user'?"text-user":"text-robot"}>
            {sender==="robot" &&( 
            <img src={robotImage} width='35'/>
            )}
            <div className="text-message">
            {message} 
            </div> 
            {sender==="user" &&(
              <img src={userImage} width='35'/>
            )}
          </div>
        );
      }

      function ChatMessages({message}){
        
        return(
          <div className="whole-message">
           {message.map((message)=>{
                return(
                  <ChatMessage
                    message={message.message}
                    sender ={message.sender}
                    key ={message.key}
                  />
                )
            })
            }
          </div>
        );
      }

 function App(){
        const[message,setMessage]= useState([])
        
        return(
          <div className="App-container"> 
            <ChatMessages
            message = {message}/>
             <InputMessage 
            message = {message}
            setMessage = {setMessage}/>
          </div>
        );
      } 

export default App
