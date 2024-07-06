import { IMG_CDN } from "../utils/constants"

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className="w-40 pr-4 pb-3 ">
        <img className= "rounded-lg"  alt="Movie Card" src={IMG_CDN + posterPath}></img>
    </div>
  )
}

export default MovieCard