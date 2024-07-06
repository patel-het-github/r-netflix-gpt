import Header from "./Header";
import useNowPlayingMovies from "../hooks/nowPlayingMovies";
import SecondaryContainer from "./SecondaryContainer";
import MainContainer from "./MainContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import usePopular from "../hooks/usePopular";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {

    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    useNowPlayingMovies();
    useTopRatedMovies();
    usePopular();
    useUpcomingMovies();
    

    return (
        <div>
            <Header/>

            { showGptSearch ? (<GptSearch/>) : (
                <>
                <MainContainer/>
                <SecondaryContainer/>
                </>
            )}
            
            
        </div>
    );
};
export default Browse