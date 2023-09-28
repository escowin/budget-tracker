import BudgetProfile from "./BudgetProfile";

function BudgetsList({ budgets }) {
  return (
    <section>
      {budgets.map((budget, i) => (
        <BudgetProfile key={i} budget={budget} el={"article"} inList={true} />
      ))}
    </section>
  );
}

export default BudgetsList;
