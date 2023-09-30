import BudgetProfile from "./BudgetProfile";
// import BudgetForm from "./BudgetForm";

function BudgetsList({ budgets }) {
  return (
    <section className="list-section" id="budget-list">
      {budgets.map((budget, i) => (
        <BudgetProfile key={i} budget={budget} el={"article"} inList={true} />
      ))}
    </section>
  );
}

export default BudgetsList;
