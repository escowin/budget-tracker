import { Link } from "react-router-dom";

function BudgetProfile({ budget }) {
  console.log(budget);
  return (
    <article className={`item budget ${budget.total >= 0 ? "green" : "red"}`}>
      <h2>
        <Link to={`/budget/${budget._id}`} className="link">{budget.title}</Link>
      </h2>
      <p>{budget.label}</p>
      <p className="green">{budget.totalIncome}</p>
      <p className="red">{budget.totalExpense}</p>
      <p>{budget.total}</p>
    </article>
  );
}

export default BudgetProfile;
