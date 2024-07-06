import MovieCard from "./MovieCard"

const MovieList = ({title,movies}) => {
  return (
    <div className="pl-5 pt-2 ">
         <h1 className="text-2xl py-4 text-white">{title}</h1>
        <div className="flex overflow-x-scroll" style={{ "-ms-overflow-style": "none", "scrollbar-width": "none", "overflow": "-moz-scrollbars-none" }}>
           
                <div className="flex scrollbar-none" >

                { movies && movies.map((movie) => (<MovieCard key={movie.id} posterPath={movie.poster_path}/>))}
               


                </div>

        </div>
       
    </div>
  );
};

export default MovieList;