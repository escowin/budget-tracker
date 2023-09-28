import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BUDGET, DELETE_ITEM } from "../utils/mutations";
import { QUERY_SELF } from "../utils/queries";
import { format } from "../utils/helpers";
import Auth from "../utils/auth";

function Menu({ menu, el, ulClass }) {
  const navigate = useNavigate();
  // const [remove] = useMutation(DELETE_BUDGET, {
  //   update(cache, { data }) {
  //     const { self } = cache.readQuery({ query: QUERY_SELF });
  //   },
  // });
  const Element = el === "link" ? Link : el;

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  const linkAttributes = (option) => {
    return option === "log-out" ? { to: "/", onClick: logout } : { to: option };
  };

  const btnAttributes = (option) => {
    return { onClick: () => handleChange(option) };
  };

  const handleChange = (option) => {
    switch (option) {
      case "delete":
        console.log(option);
        break;
      case "edit":
        console.log(option);
        break;
      case "back":
        navigate(-1);
        break;
      default:
        console.log("invalid case");
    }
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
