import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Menu from "./Menu";

function Header() {
  return (
    <header>
      <nav>{Auth.loggedIn() ? <Menu /> : <Link to="/login">Login</Link>}</nav>
    </header>
  );
}

export default Header;
