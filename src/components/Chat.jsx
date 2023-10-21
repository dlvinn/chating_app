import { addDoc,collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase-config";
import '../styles/chat.css'
const Chat = ({room}) => {

    const [newMessage, setNewMessage] = useState("");
    const messageRef = collection(db, "Message");
    const [messages, setMessages] = useState([])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })
        setNewMessage("");

    }

    useEffect(()=>{
        const queryMessages = query(messageRef, where("room", "==", room),orderBy("createdAt"))
        //when you utry to set this orderBy straight with the query methods it will not work in order to make it work you are  gonna have to create an index and you can do it this way inside of your collectionyou have to go toquery builder option and then add a qeury and write the exact same query ywith where and the orderBY and then it will give you and error click on the error and then it will build an index for you once it will be done you can use your query
        const unsuscribe = onSnapshot(queryMessages, (result)=>{
            const messages = [];
            result.forEach((doc)=>{
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages);
        })
        return ()=> unsuscribe(); //you have to cleanup the onsnapshot
    },[])
  return (
    <div className="chat-app">
        <div className="header">
            <h1>Welcome to {room.toUpperCase()}</h1>
        </div>
        <div className="messages">
        {
        messages.map((message)=>(
            <div className="messages" key={message.id}>
                <span className="user">{message.user}</span>
                {message.text}
            </div>
            ))
        }
        </div>
        <form onSubmit={handleSubmit}className="new-message-form">
            <input 
                type="text" 
                className="new-message-input" 
                placeholder="enter your message..."
                onChange={(e)=> setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button type='submit' className="send-button">send</button>
        </form>
    </div>
  )
}
export default Chat