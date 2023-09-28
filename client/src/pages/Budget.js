import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_BUDGET } from "../utils/queries";
import Auth from "../utils/auth";
import BudgetProfile from "../components/BudgetProfile";
import ItemList from "../components/ItemList";

function Budget() {
  // Boolean defined by local storage jwt's expiration status
  const loggedIn = Auth.loggedIn();
  // Defined by using the retrieved url endpoint :id parameter
  const { id: _id } = useParams();
  // Destructred boolean & object derined from param-dependent graphql query
  const { loading, data } = useQuery(QUERY_BUDGET, { variables: { id: _id } });
  // Defined as either queried server data or empty
  const budget = data?.budget || {};

  // tbd: use global state to track username. if state username !== budget.username, redirect to Home
  if (!loggedIn) {
    return <section>log in required</section>;
  }

  // Conditional render dictated by queried boolean value
  if (loading) {
    return <section>loading...</section>;
  }

  // BudgetProfile & BudgetForm(edit) switch depending on state (editProfile = true)
  // BudgetForm includes title, label, and description
  // item mutations: post, put, delete.
  // updating budget updates user server & cache data
  return (
    <>
      <BudgetProfile budget={budget} el={"section"} inList={false}/>
      <ItemList items={budget.items} budgetId={_id}/>
    </>
  );
}

export default Budget;
