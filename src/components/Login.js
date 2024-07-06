import { useRef, useState } from "react"
import Header from "./Header"
import { cheackValidData } from "../utils/validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../utils/firebase";
//import { Navigate, useNavigate } from "react-router-dom";
import {  updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
   // const navigate=useNavigate();
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name=useRef(null);

    const handleButtonClick = () => {
        const message=cheackValidData(email.current.value,password.current.value);

        setErrorMessage(message);
        
        if(message) return;

        if(!isSignInForm){
            createUserWithEmailAndPassword(
                auth, email.current.value, password.current.value
            )
             .then((userCredential) => {
            // Signed up 
               const user = userCredential.user;
               updateProfile(user, {
                displayName: name.current.value , photoURL: "https://example.com/jane-q-user/profile.jpg",
              }).then(() => {
                // Profile updated!
                const {uid, email, displayName} = auth.currentUser;
               dispatch(addUser({uid:uid, email:email, displayName: displayName}));
                
                // ...
              }).catch((error) => {
                // An error occurred
                setErrorMessage(error.message);
                // ...
              });
               console.log(user);
              
            // ...
              })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+" - " +errorMessage);
             // ..
             });

        }else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+" - " +errorMessage);
            });



        }

    };
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div >
            <Header/>
            <div className="absolute ">
                <img src={BG_URL} alt="img" className=""></img>
                
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-3/12 h-8/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-100 md:bg-opacity-80" name="form1">
                <h1 className="font-bold text-3xl py-4 mx-auto">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full mx-auto bg-gray-800 rounded-md"/>}

                <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full mx-auto bg-gray-800 rounded-md" />

                

                <input ref={password} type="password" placeholder="password" className="p-4 my-4 w-full mx-auto bg-gray-800 rounded-md"/>

                <p className="text-red-500  text-md  py-1">{errorMessage}</p>

                <button className="p-3 my-3 bg-blue-600 w-full mx-auto rounded-md " onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

                <p className="pt-2 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>

            </form>
            
        </div>
    )
}
export default Login