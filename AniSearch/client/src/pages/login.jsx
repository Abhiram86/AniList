import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { login } from "../../api/auth";
import { ThemeContext  } from "../App"


export const Login = () => {

  const { userData, setUserData, user, setUser } = useContext(ThemeContext);
  const router = useNavigate()

  const Login = async () => {
    const data = await login(userData);
    setUser(data);
    if(data && data.password === userData.password){
      setTimeout(() => {
        router('/');
      }, 1500);
      toast.success('Logged in succesfully', {
        position: 'top-left',
        theme: 'dark',
        autoClose: 1000
      });
    }
    else{
      setUser({})
      toast.error('No User available check email or password', {
        position: 'top-left',
        theme: 'dark',
        autoClose: 2000
      });
      // return <h1>No User available check email or password</h1>
    }
  }

    return (
      <>
    <div className="auth-card login">
    <div className="input-fields">
      <label htmlFor="email">Email</label>
      <input type="text" placeholder="ex. johndoe@gmail.com" required onChange={(e) => setUserData({...userData, "email": e.target.value})}/>
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="type password" required onChange={(e) => setUserData({...userData, "password": e.target.value})}/>
    </div>
    <div className="auth-btn">
        <button className="login-btn input-btn" onClick={Login}>Login</button>
    </div>
  </div>
  <ToastContainer />
  </>
  )
}
