import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import BudgetForm from "./BudgetForm";

function BudgetProfile({ budget, el, inList, idAttr }) {
  // State variables
  const [editSelected, setEditSelected] = useState(false);

  // Menu configuartion. Boolean `inList` prop
  const menu = {
    el: "button",
    options: inList ? ["delete"] : ["edit", "delete", "back"],
    model: "budget",
    // id: budget._id
  };

  // Semantic div wrapper defined by `el` prop
  const Element = el;

  // Dynamic & conditional attributes used in elements
  const className = `budget ${inList ? "item" : "profile"} ${
    budget.total >= 0 ? "green" : "red"
  }`;
  const endPoint = `/budget/${budget._id}`;

  // Conditional child elements
  const content = (
    <>
      {inList ? (
        <>
          <Link to={endPoint} className="link">
            {budget.title}
          </Link>
          <p>{budget.label}</p>
          <p className="green">{budget.totalIncome}</p>
          <p className="red">{budget.totalExpense}</p>
          <p>{budget.total}</p>
        </>
      ) : (
        <>
          <h2>
            {budget.label} {budget.title}
          </h2>
          <p className="green">income</p>
          <p className="green">{budget.totalIncome}</p>
          <p className="red">expense</p>
          <p className="red">{budget.totalExpense}</p>
          <p>total</p>
          <p>{budget.total}</p>
        </>
      )}
    </>
  );

  return (
    <Element className={className} id={idAttr}>
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
