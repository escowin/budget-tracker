import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { format } from "../utils/helpers";

function Menu({ menu, el, ulClass }) {
  const Element = el === "link" ? Link : el;

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  const linkAttributes = (option) => {
    return option === "log-out" ? { to: "/", onClick: logout } : { to: option };
  };

  const btnAttributes = (option) => {
    return { onClick: () => console.log(option) };
  };

  return (
    <ul className={ulClass}>
      {menu.map((option, i) => (
        <li key={i}>
          <Element
            className={el}
            {...(el === "link"
              ? linkAttributes(option)
              : btnAttributes(option))}
          >
            {format.string(option)}
          </Element>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
