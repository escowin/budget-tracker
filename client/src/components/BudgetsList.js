import BudgetProfile from "./BudgetProfile";

function BudgetsList({ budgets }) {
  console.log(budgets);
  return (
    <section>
      {budgets.map((budget, i) => (
        <BudgetProfile budget={budget} key={i} type={"article"}/>
      ))}
    </section>
  );
}

export default BudgetsList;
