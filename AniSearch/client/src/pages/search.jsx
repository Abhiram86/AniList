import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";

import search from "../assets/search.svg";
import refresh from "../assets/refresh.svg";
import bookmark from "../assets/bookmark.svg";
import heart from "../assets/heart.svg";

import { fetchData } from "../../api/fetchdata";
import { fetchAnime } from "../../api/fetchdata";
import { ThemeContext } from "../App";
import { saveData } from "../../api/save";

export const Search = () => {
  const [randomShows, setRandomShows] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchName, setSearchName] = useState("");
  const type = "random";
  const [page, setPage] = useState(1);
  const router = useNavigate()
  const {user} = useContext(ThemeContext);

  const reload = () => {
    fetchData(page, type)
      .then((data) => {
        setRandomShows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchAnime = () => {
    fetchAnime(searchName)
      .then((data) => {
        setSearchedResults(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleSave = async (anime) => {
    if(!user.username){
      toast.warning('Login with ur account to save', {
        theme: 'dark',
        position: 'top-left',
        autoClose: 2000,
        pauseOnHover: false,
        transition: Slide
      })
      return;
    }
    
    const animeData = {
      id: anime.id,
      status: anime.status,
      img: `https://shikimori.one/${anime.image.original}`,
      name: anime.name,
      score: anime.score,
      episodes: anime.episodes,
      email: user.email
    };
  
    try {
      const data = await saveData(animeData);
      if(data === 'saved'){
        toast.info('Already saved', {
          position: 'top-left',
          theme: 'dark',
          autoClose: 1000,
          pauseOnHover: false,
          transition: Slide
        })
        return;
      }
      toast.success('Saved', {
        position: 'top-left',
        theme: 'dark',
        autoClose: 1000,
        pauseOnHover: false,
        transition: Slide
      });
    } catch (error) {
      console.log('Error saving data:', error);
      toast.error('Failed to save', {
        position: 'top-left',
        theme: 'dark',
        autoClose: 2000,
        pauseOnHover: false,
        transition: Slide
      });
    }
  };

  useEffect(() => {
    fetchData(page, type)
      .then((data) => {
        setRandomShows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="search">
        <div className="search-bar">
          <form action="">
            <input type="text" onChange={(e) => setSearchName(e.target.value)}/>
            <img src={search} alt="search-img" onClick={searchAnime} />
          </form>
        </div>
        {!searchName.length > 0 ? 
        (<div className="refresh-box">
          <h1 className="user-heading">Some Random Shows</h1>
          <img src={refresh} onClick={reload} />
        </div>) :
        (<h1 className="user-heading">
          You are Searching for {searchName} 
        </h1>)}
        <div className="anime-list">
          {!searchedResults.length > 0 ?
            randomShows.map((anime, index) => (
              <div className="anime-card" key={index}>
                <div className="anime-img">
                  <h2 className="status"> {anime.status} </h2>
                  <img className="anime-poster" src={`https://shikimori.one/${anime.image.original}`} alt="poster" />
                  <img
                    className="bookmark"
                    src={bookmark}
                    alt="remove svg"
                    onClick={() => {handleSave(anime)}}
                  />
                </div>
                <div className="title">
                  <h2>{anime.name}</h2>
                </div>
                <div className="likes-and-episodes">
                  <div className="rating">
                    <img src={heart} alt="rating" />
                    <h2>{anime.score}</h2>
                  </div>
                  <div className="episodes">
                    <h2>episodes {anime.episodes}</h2>
                  </div>
                </div>
              </div>
            )): 
            searchedResults.map((anime, index) => (
              <div className="anime-card" key={index}>
                <div className="anime-img">
                  <h2 className="status"> {anime.status} </h2>
                  <img className="anime-poster" src={`https://shikimori.one/${anime.image.original}`} alt="poster" />
                  <img
                    className="bookmark"
                    src={bookmark}
                    alt="remove svg"
                    onClick={() => {handleSave(anime)}}
                  />
                </div>
                <div className="title">
                  <h2>{anime.name}</h2>
                </div>
                <div className="likes-and-episodes">
                  <div className="rating">
                    <img src={heart} alt="rating" />
                    <h2>{anime.score}</h2>
                  </div>
                  <div className="episodes">
                    <h2>episodes {anime.episodes}</h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
