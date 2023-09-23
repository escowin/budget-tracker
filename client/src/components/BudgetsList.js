import BudgetProfile from "./BudgetProfile";

function BudgetsList({ budgets }) {
  console.log(budgets);
  return (
    <section>
      {budgets.map((budget, i) => (
        <BudgetProfile budget={budget} key={i}/>
      ))}
    </section>
  );
}

export default BudgetsList;
