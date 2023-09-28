import { Link } from "react-router-dom";
import Menu from "./Menu";
function BudgetProfile({ budget, el, inList }) {
  console.log(inList)
  // type value defines parent return element
  const Element = el === "article" ? "article" : "section";

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
      <Menu menu={inList ? ["delete"] : ["edit", "delete"]} el={"button"} />
    </Element>
  );
}

export default BudgetProfile;
