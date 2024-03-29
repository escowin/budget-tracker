import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_BUDGET, DELETE_ITEM } from "../utils/mutations";
import { updateSelfCache, updateBudgetCache } from "../utils/cache";
import { format } from "../utils/helpers";
import Auth from "../utils/auth";

function Menu({ menu, ulClass, _id, setEditSelected }) {
  const navigate = useNavigate();
  const { id: _budgetId } = useParams();

  // model determines graphql delete mutation
  const [remove] = useMutation(
    menu.model === "budget" ? DELETE_BUDGET : DELETE_ITEM,
    {
      update(cache, { data }) {
        // existing property determines cache update
        switch (true) {
          case !!data.deleteBudget:
            updateSelfCache(cache, _id);
            break;
          case !!data.deleteItem:
            updateBudgetCache(cache, _budgetId, _id);
            break;
          default:
            console.error("invalid case");
        }
      },
    }
  );

  // DOM elements & attributes
  const Element = menu.el === "link" ? Link : menu.el;

  const linkAttributes = (option) => {
    return option === "log-out"
      ? { to: "/", onClick: (e) => handleChange(option, e) }
      : { to: option };
  };

  const btnAttributes = (option) => {
    return { onClick: () => handleChange(option) };
  };

  // option determines case logic
  const handleChange = async (option, e) => {
    switch (option) {
      // bug: logging out throws errors in home, but can still access '/login' endpoint
      case "log-out":
        e.preventDefault();
        Auth.logout();
        break;
      case "back":
        navigate(-1);
        break;
      case "delete":
        try {
          await remove({
            variables: {
              id: _id,
              ...(menu.model !== "budget" ? { budgetId: _budgetId } : {}),
            },
          });
        } catch (err) {
          console.error(err);
        }
        break;
      case "edit":
        // clicking 'edit' button multiple times toggles boolean value
        setEditSelected(prevValue => !prevValue)
        break;
      default:
        console.log("invalid case");
    }
  };

  return (
    <ul className={ulClass}>
      {menu.options.map((option, i) => (
        <li key={i}>
          <Element
            className={menu.el}
            {...(menu.el === "link"
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
