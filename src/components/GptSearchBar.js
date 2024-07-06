import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { json } from "react-router-dom";
import { addGptMovieResult } from "../utils/gptSlice";
import { useDispatch } from "react-redux";


const GptSearchBar = () => {

  const dispatch = useDispatch();

  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  };

  
  return (
    <div className="pt-[10%] flex justify-center rounded-lg ">
      <form className="w-full md:w-1/2 bg-purple-700 grid grid-cols-12 rounded-lg   " onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type="text" className="p-4 m-2 col-span-10 rounded-lg" placeholder="What would you like to watch today?"></input>
        <button className="col-span-2 mt-2 w-24 ml-1 py-1    bg-blue-500 text-white rounded-lg h-14" onClick={handleGptSearchClick}>
          Search
        </button>

      </form>

    </div>
  )
}

export default GptSearchBar   