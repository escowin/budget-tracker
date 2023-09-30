import Auth from "../utils/auth";
import Menu from "./Menu";

function Footer() {
  const date = new Date().getFullYear();
  const menu = {
    el: "link",
    options: Auth.loggedIn ? ["add-budget", "profile", "log-out"] : ["login"],
  };

  // Menu options are determined by user login status
  return (
    <footer>
      <nav>
        <Menu menu={menu} />
      </nav>
      <p>&copy; {date} Edwin m escobar</p>
    </footer>
  );
}

export default Footer;
