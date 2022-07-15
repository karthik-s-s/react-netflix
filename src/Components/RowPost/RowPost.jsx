import React, { useEffect, useState } from "react";
import "./RowPost.css";
import axios from "../../axios";
import { imageUrl,API_KEY } from "../../Constants/constant";
import Youtube from "react-youtube";

function RowPost(props) {
  const [movies, setmovies] = useState([]);
  const [urlId,setUrlId] = useState('')
  useEffect(() => {
    axios
      .get(props.url)
      .then((responce) => {
        setmovies(responce.data.results);
      })
      .catch((err) => {
        alert("network Error");
      });
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const handleMovie = (id) => {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(responce=>{
      if(responce.data.results.length!==0){
        setUrlId(responce.data.results[0])
      }
      else{
        console.log("ERROR");
      }
      console.log(responce.data);
    })
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => {
          return (
            <img
              onClick={() => handleMovie(obj.id)}
              className={props.isSmall ? "smallPoster" : "poster"}
              src={`${imageUrl + obj.backdrop_path}`}
              alt=""
            />
          );
        })}
      </div>
      { urlId && <Youtube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default RowPost;
