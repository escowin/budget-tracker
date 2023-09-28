import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BUDGET, DELETE_ITEM } from "../utils/mutations";
import { QUERY_BUDGET, QUERY_SELF } from "../utils/queries";
import { format } from "../utils/helpers";
import Auth from "../utils/auth";

function Menu({ menu, el, ulClass, _id, mutation }) {
  const navigate = useNavigate();
  const { id: _budgetId } = useParams();
  const [remove] = useMutation(
    mutation === "budget" ? DELETE_BUDGET : DELETE_ITEM,
    {
      // issue: deleting an item does not update budget cache
      update(cache, { data }) {
        const { self } = cache.readQuery({ query: QUERY_SELF });
        const updatedBudgets = self.budgets.filter(
          (budget) => budget._id !== _id
        );
        cache.writeQuery({
          query: QUERY_SELF,
          data: {
            self: {
              ...self,
              budgets: updatedBudgets,
              budgetCount: updatedBudgets.length,
            },
          },
        });
      },
    }
  );

  // DOM elements & attributes
  const Element = el === "link" ? Link : el;

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
              ...(mutation !== "budget" ? { budgetId: _budgetId } : {}),
            },
          });
        } catch (err) {
          console.error(err);
        }
        break;
      case "edit":
        console.log(option + " " + _id);
        await remove({ variables: { id: _id } });
        navigate("/");
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
