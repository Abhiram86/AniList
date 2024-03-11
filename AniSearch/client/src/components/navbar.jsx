import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import { useContext } from "react";

export const Navbar = () => {

  const {user} = useContext(ThemeContext);

  return (
    <div className="navbar">
        <div><Link to='/' className="links"><b>Home</b></Link></div>
        <div><Link to='/popular' className="links"><b>Popular</b></Link></div>
        <div><Link to='/saved' className="links"><b>Saved</b></Link></div>
        <div><Link to='/search' className="links"><b>Search</b></Link></div>
        {user.username ? (
          <div  className="authL"><Link to='/logout' className="links"><b>Logout</b></Link></div>
          ) : (
            <div  className="authL"><Link to='/register' className="links"><b>Register</b></Link></div>
          )}
    </div>
  )
}
