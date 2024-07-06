import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopular } from "../utils/moviesSlice";

const usePopular = () => {

    const dispatch = useDispatch();
    const popular = useSelector((store) => store.movies.popular);

    const getPopularMovies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS);
        const json= await data.json();
        console.log(json.results);
        dispatch(addPopular(json.results));
    };

    useEffect(() => {
       !popular && getPopularMovies();
        

    },[]);

};

export default usePopular;