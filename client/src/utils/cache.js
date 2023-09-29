import { QUERY_SELF, QUERY_BUDGET } from "./queries";

export function updateSelfCache(cache, _id) {
  const { self } = cache.readQuery({
    query: QUERY_SELF,
  });
  const updatedBudgets = self.budgets.filter((budget) => budget._id !== _id);
  cache.writeQuery({
    query: QUERY_SELF,
    data: {
      self: {
        ...self,
        budgets: updatedBudgets,
        budgetCount: updatedBudgets.length,
      },
    },
  });
}

export function updateBudgetCache(cache, _budgetId, _id) {
  const { budget } = cache.readQuery({
    query: QUERY_BUDGET,
    variables: { id: _budgetId },
  });

  // Calculates properties to update cache data
  const updatedItems = budget.items.filter((item) => item._id !== _id);
  const totalIncome = updatedItems
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.num, 0);
  const totalExpense = updatedItems
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.num, 0);
  const total = totalIncome - totalExpense;

  cache.writeQuery({
    query: QUERY_BUDGET,
    data: {
      budget: {
        ...budget,
        items: updatedItems,
        totalIncome,
        totalExpense,
        total,
      },
    },
  });
}
