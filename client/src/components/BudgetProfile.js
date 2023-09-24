import { Link } from "react-router-dom";

function BudgetProfile({ budget, type }) {
  // type value defines parent return element
  const Element = type === "article" ? "article" : "section";
  
  // defines static and conditional classes
  const commonClassName = `item budget ${budget.total >= 0 ? "green" : "red"}`;

  // defines child elements
  const content = (
    <>
      <h2>
        <Link to={`/budget/${budget._id}`} className="link">
          {budget.title}
        </Link>
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
    </Element>
  );
}

export default BudgetProfile;
