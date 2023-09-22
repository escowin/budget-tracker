import { Link } from "react-router-dom";

function Header() {
  const date = new Date().getFullYear()
  return (
    <header>
      <h1>
        <Link to={"/"} className="link">Budgeteur</Link>
      </h1>
      <p>&copy; {date} Edwin m escobar</p>
    </header>
  );
}

export default Header;
