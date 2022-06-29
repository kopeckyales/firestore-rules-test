import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from 'react'
import {Conversation} from "./Conversation"

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(getAuth(), setUser)
  }, [])

  return (
    <div>
      <button disabled={user !== undefined} onClick={() => {
        signInWithEmailAndPassword(getAuth(), process.env.REACT_APP_USER_EMAIL, process.env.REACT_APP_USER_PASSWORD)

      }}>Login</button>
      <button disabled={user === undefined} onClick={() => {
        signOut(getAuth())

      }}>Logout</button>
      <br />
      User id: {user ? user.uid : "Not logged in"}
      <br />
      <br />
      <Conversation />
    </div>
  );
}

export default App;
