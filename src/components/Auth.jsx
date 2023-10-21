import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase-config"
import Cookies from "universal-cookie"
const cookie = new Cookies();
const Auth = ({setIsAuth}) => {

    const signInWithGoogle = async()=>{
        try{  
        const result = await signInWithPopup(auth,provider)
        cookie.set("auth-token", result.user.refreshToken)
        setIsAuth(true)
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="auth">
        <p>Sign In To Continue</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}
export default Auth