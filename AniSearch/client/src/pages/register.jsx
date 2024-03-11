import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { signup } from "../../api/auth";
import { ThemeContext  } from "../App"

export const Register = () => {

  const {userData, setUserData, user, setUser} = useContext(ThemeContext);
  const router = useNavigate();

    const SignUp = async () => {
      if(!userData.email.endsWith("@gmail.com") && !userData.email.endsWith("edu.in")){
        toast.error('Invalid email', {
          position: "top-left",
          theme: "dark",
          autoClose: 2000,
          });
      }else{
        toast.success('Registered succesfully', {
          theme: 'dark',
          position: 'top-left',
          autoClose: 1000
        });
        await signup(userData);
        router('/login');
      }
    } 

    return (
      <>  
          <div className="auth-card">
            <div className="input-fields">
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="ex. John Doe" required onChange={(e) => setUserData({...userData, "username": e.target.value})}/>
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="ex. johndoe@gmail.com" required onChange={(e) => setUserData({...userData, "email": e.target.value})}/>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="type password" required onChange={(e) => setUserData({...userData, "password": e.target.value})}/>
            </div>
            <div className="auth-btn">
              <button className="register-btn input-btn" onClick={SignUp}>Sign up</button>
              <Link to="/login"><button className="login-btn input-btn">Sign in</button></Link>
            </div>
          </div>
          <ToastContainer />
      </>
    )
  }
  