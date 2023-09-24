import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Menu from "./Menu";

function Footer() {
  const date = new Date().getFullYear()
  const menu = ["add-budget", "profile", "log-out"];
  
  return (
    <footer>
      <nav>
        {Auth.loggedIn() ? (
          <Menu menu={menu} type={"link"} />
        ) : (
          <Link to="/login" className="link">
            Login
          </Link>
        )}
      </nav>
      <p>&copy; {date} Edwin m escobar</p>
    </footer>
  );
}

export default Footer;
