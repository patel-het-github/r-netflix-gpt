import { BG_URL } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
  return (
    <>
    <div className="fixed -z-20 ">
                <img src={BG_URL} alt="img" className="h-screen md:h-full object-cover"></img>
                
       </div>
       <div className="pt-[30%] md:p-0">
       <GptSearchBar/>
        <GptMovieSuggestions/>

       </div>
    </>
    
  )
}

export default GptSearch