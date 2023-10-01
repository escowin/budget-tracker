import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import BudgetForm from "./BudgetForm";

function BudgetProfile({ budget, el, inList }) {
  // state variables
  const [editSelected, setEditSelected] = useState(false);

  // boolean value determines menu options
  const menu = {
    el: "button",
    options: inList ? ["delete"] : ["edit", "delete", "back"],
    model: "budget",
    // id: budget._id
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
      {!editSelected ? (
        content
      ) : (
        <BudgetForm setEditSelected={setEditSelected} />
      )}
      <Menu menu={menu} _id={budget._id} setEditSelected={setEditSelected} />
    </Element>
  );
}

export default BudgetProfile;
