import BudgetProfile from "./BudgetProfile";
// import BudgetForm from "./BudgetForm";

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
