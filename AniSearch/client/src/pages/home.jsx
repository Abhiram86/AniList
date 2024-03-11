import { useState, useEffect, useContext, useRef } from "react";
import { saveData } from "../../api/save";
import { useInView } from "react-intersection-observer"
import { toast, ToastContainer, Slide } from "react-toastify";

import { fetchData } from "../../api/fetchdata";

import heart from "../assets/heart.svg";
import bookmark from "../assets/bookmark.svg";
import loader from "../assets/tube-spinner.svg";

import { ThemeContext } from "../App";

export const Home = () => {
  const { user, loading, isLoading } = useContext(ThemeContext);

  const {ref, inView} = useInView({
    threshold: 0.5
  })

  const type = "ranked";
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);

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
    isLoading(true);
    fetchData(page, type)
      .then((data) => {
        setShows(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isLoading(false);
      });
  }, []);

  useEffect(() => {
    if(inView){
      setPage(prev => prev + 1)
      fetchData(page + 1, type)
      .then((data) => {
        setShows([...shows, ...data])
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [inView])

  return (
    <>
      <div className="user-heading">
        {user.username ? (
          <h1>Hello {user.username}</h1>
        ) : (
          <h1>Please Login</h1>
        )}
      </div>
      <div className="anime-list">
        {loading ? (
          <div className="loader"><img src={loader} alt="loading..." /></div>
        ) : (
          shows.map((anime, index) => (
            <div className="anime-card" key={index} ref={index === page*12 - 1 ? ref : null}>
              <div className="anime-img">
                <h2 className="status"> {anime.status} </h2>
                <img
                  className="anime-poster"
                  src={`https://shikimori.one/${anime.image.original}`}
                  alt="poster"
                />
                <img
                  className="bookmark"
                  src={bookmark}
                  alt="bookmark svg"
                  onClick={() => handleSave(anime)}
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
          ))
        )}
      </div>
      <ToastContainer />
    </>
  );
};
