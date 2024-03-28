import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const guestNav = [
    { to: "/", text: "เข้าสู่ระบบ" },
    { to: "/register", text: "สมัครสมาชิก" },
  ];
  
  const userNav = [
  
    { to: "/user", text: "user" },
    { to: "/test", text: "EditUser"}
    
    
   
  ];
export default function Adminmenu() {
    const { user, logout } = useAuth();
    const finalNav = user?.id ? userNav : guestNav;
  
    const navigate = useNavigate();

    const hdlLogout = () => {
        logout()
        navigate('/')
    }
    return (
      <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Hello, {user?.fname ? user.fname : 'Guest'}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
            <li>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          ) }
        </ul>
      </div>
    </div>
    )
}