import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function Menu() {
  const navLinks = [{ path: "add-budget" }, { path: "profile" }];
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  return (
    <>
      {navLinks.map((link, i) => (
        <Link key={i} to={`/${link.path}`} className="link">
          {link.path}
        </Link>
      ))}
      <a href="/" onClick={logout} className="link">
        log out
      </a>
    </>
  );
}

export default Menu;
