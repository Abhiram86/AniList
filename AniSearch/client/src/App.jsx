import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';

import './App.css';

import { Home } from './pages/home';
import { Popular } from './pages/popular';
import { Saved } from './pages/saved';
import { Register } from './pages/register';
import { Search } from './pages/search';
import { Navbar } from './components/navbar';
import { Logout } from './pages/logout';
import { Login } from './pages/login';

export const ThemeContext = createContext(null);

function App() {

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [user, setUser] = useState({});
  const [save, setSave] = useState([]);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))
    if(data){
      setUser(data)
    }
  }, [])
 
  return (
    <div className='main-wrapper'>
      <Router>
      <ThemeContext.Provider value = {{userData, setUserData, user, setUser, save, setSave, loading, isLoading}}>
          < Navbar />
          <Routes>
            <Route path='/' element={< Home />}/>
            <Route path='/popular' element={< Popular />}/>
            <Route path='/saved' element={< Saved />}/>
            <Route path='/register' element={< Register />}/>
            <Route path='/search' element={< Search />}/>
            <Route path='/login' element={< Login />}/>
            <Route path='/logout' element={< Logout />}/>
          </Routes>
        </ThemeContext.Provider>
      </Router>
    </div>
  )
}

export default App
