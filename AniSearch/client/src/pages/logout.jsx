import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../App";

export const Logout = () => {
  const {setUser} = useContext(ThemeContext);
  const router = useNavigate()

  localStorage.removeItem('user')
  setUser({});
  router('/login');
}
