import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { format } from "../utils/helpers";

function Menu({ menu, el, type }) {
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };
  // onClick is defined through a conditional object
  return (
    <ul>
      {menu.map((option, i) => (
        <Link
          key={i}
          className="link"
          to={option === "log-out" ? "/" : `${option}`}
          {...(option === "log-out" ? { onClick: logout } : {})}
        >
          {format.string(option)}
        </Link>
      ))}
    </ul>
  );
}

export default Menu;
