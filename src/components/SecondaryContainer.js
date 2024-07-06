import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies);
    return <div className=" bg-black  static  ">
        <div className="mt-0 md:-mt-52 pl-12 relative z-50 bg-transparent ">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Popular"} movies={movies.popular}/>
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
        
        </div>
    </div>;

};

export default SecondaryContainer;