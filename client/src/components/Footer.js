import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Menu from "./Menu";

function Footer() {
  const menu = ["add-budget", "profile", "log-out"];
  return (
    <footer>
      <nav>
        {Auth.loggedIn() ? (
          <Menu menu={menu} />
        ) : (
          <Link to="/login" className="link">
            Login
          </Link>
        )}
      </nav>
    </footer>
  );
}

export default Footer;
