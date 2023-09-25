import Auth from "../utils/auth";
import BudgetForm from "../components/BudgetForm";

function AddBudget() {
  const loggedIn = Auth.loggedIn();
  if (!loggedIn) {
    return <section>log in to view contents</section>;
  }

  return <BudgetForm type={"add"} />;
}
export default AddBudget;
