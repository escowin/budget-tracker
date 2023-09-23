function BudgetProfile({ budget }) {
    console.log(budget);
  return (
    <article>
      <h2>{budget.title}</h2>
      <p>{budget.label}</p>
      <p>{budget.totalIncome}</p>
      <p>{budget.totalExpense}</p>
      <p>{budget.total}</p>
    </article>
  );
}

export default BudgetProfile;
