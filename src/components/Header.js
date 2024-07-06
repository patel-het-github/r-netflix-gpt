import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser,removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { AVATAR, LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";


const Header = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user = useSelector((store => store.user));
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    const handleSignOut= () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });

          
    };

    useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
            if (user) {
              
              const {uid, email, displayName} = user;
              dispatch(addUser({uid:uid, email:email, displayName: displayName}));
              navigate("/browse");
              
              
            } else {
              // User is signed out
              // ...
              dispatch(removeUser());
              navigate("/");
              
            }
          });

          return () => unsubscribe();

    }, []);

    const handleGptSearchClick = () => {
      dispatch(toggleGptSearchView());

    };

    return (
      <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black  z-10 flex flex-col md:flex-row justify-between ">
        <div className="flex mx-auto md:mx-0">
        <img className="w-44 "
         src={LOGO} alt="logo"></img>
         <h1 className=" text-blue-500  pt-3  -ml-3  text-2xl font-bold ">-𝓖𝓟𝓣</h1>
        </div>
      
      
     {user && <div className="flex py-4 sm:mx-auto md:mr-4">
          <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>{showGptSearch ?  "𝓗𝓸𝓶𝓮𝓹𝓪𝓰𝓮" : "𝓖𝓟𝓣 𝓢𝓮𝓪𝓻𝓬𝓱" }</button>
          <img className="h-9 w-9 " alt="usericon"  src={AVATAR}></img>
          <button className="font-bold text-lg  -mt-1 text-white" onClick={handleSignOut}>(Sign Out)</button>
          
      </div>}

      
  </div>
    )
}
export default Header