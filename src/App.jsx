import './App.css';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import { useRef, useState } from 'react';
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
const cookie = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null)
  const inputRef = useRef(null)

  const signUserOut = async()=>{
    signOut(auth);
    cookie.remove('auth-token');
    setIsAuth(false);
    setRoom(null);
  }
  if(!isAuth){ 
  return (
    <div className="App">
      <Auth setIsAuth={setIsAuth}/>
    </div>
  );
  }
  return(<>
    {room ? 
    <Chat room={room}/>
    : 
    <div className='room'>
      <label>enter room name</label>
      <input placeholder='the room name' ref={inputRef}/>
      <button onClick={()=>{
        setRoom(inputRef.current.value)
      }}>enter chat</button>
    </div>
    }
  <div className="sign-out">
    <button onClick={signUserOut}>Sign out</button>
  </div>
  </>)
}

export default App;
