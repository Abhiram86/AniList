import { useState, useContext, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

import remove from "../assets/remove.svg";
import heart from "../assets/heart.svg";

import { getSavedData } from "../../api/save";
import { removeData } from "../../api/save";

import { ThemeContext  } from "../App";

export const Saved = () => {

    const [save, setSave] = useState([])
    const {user, setUser} = useContext(ThemeContext);

    const handleRemove = async (id) => {
      toast.success('will be removed', {
        position: 'top-left',
        theme: 'dark',
        autoClose: 2000,
        transition: Slide,
        pauseOnHover: false
      })
      await removeData(id, user.email)
    }

  
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('user'))
      if(data){
        setUser(data);
      }
    }, [])

    useEffect(() => {

      const handleGetSaveData = async (email) => {
        const data = await getSavedData(email)
        setSave(data)
      }

      handleGetSaveData(user.email)
    }, [save])

    return (
      <>
        <div className="anime-list">
        {user.email && save.length > 0 ? save.map((anime, index) => (
          <div className="anime-card" key={index}>
            <div className="anime-img">
              <h2 className="status"> {anime.status} </h2>
              <img
                className="anime-poster"
                src={anime.img}
                alt="poster"
              />
              <img
                className="bookmark"
                src={remove}
                alt="remove svg"
                onClick={() => handleRemove(anime._id)}
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
        )) : user.email ? 
        (<div className="saveText">
          <h1>
          No saved collections
        </h1>
        </div>) :
        <h1 className="saveErr">
          login to view ur saved collection
        </h1>}
      </div>
      <ToastContainer />
      </>
    )
  }
  