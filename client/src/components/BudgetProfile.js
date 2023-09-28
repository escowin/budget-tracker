import { Link } from "react-router-dom";
import Menu from "./Menu";

function BudgetProfile({ budget, el, inList }) {
  // boolean value determines menu options
  const menu = {
    element: "button",
    options: inList ? ["delete"] : ["edit", "delete", "back"],
    mutation: "budget"
  };

  // el value defines semantic div wrapper
  const Element = el;

  // defines static and conditional classes
  const commonClassName = `item budget ${budget.total >= 0 ? "green" : "red"}`;

  // defines child elements
  const content = (
    <>
      <h2>
        {inList ? (
          <Link to={`/budget/${budget._id}`} className="link">
            {budget.title}
          </Link>
        ) : (
          budget.title
        )}
      </h2>
      <p>{budget.label}</p>
      <p className="green">{budget.totalIncome}</p>
      <p className="red">{budget.totalExpense}</p>
      <p>{budget.total}</p>
    </>
  );

  return (
    <Element className={commonClassName}>
      {content}
      <Menu menu={menu.options} el={menu.element} _id={budget._id} mutation={menu.mutation} />
    </Element>
  );
}

export default BudgetProfile;
