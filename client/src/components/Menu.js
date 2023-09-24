import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { format } from "../utils/helpers";

function Menu({ menu }) {
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  // onClick is defined through a conditional object
  return (
    <>
      {menu.map((link, i) => (
        <Link
          key={i}
          className="link"
          to={link === "log-out" ? "/" : `${link}`}
          {...(link === "log-out" ? { onClick: logout } : {})}
        >
          {format.string(link)}
        </Link>
      ))}
    </>
  );
}

export default Menu;
