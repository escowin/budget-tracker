import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Menu from "./Menu";

function Footer() {
  return (
    <footer>
      <nav>
        {Auth.loggedIn() ? (
          <Menu />
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
