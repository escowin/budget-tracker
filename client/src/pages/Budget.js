import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_BUDGET } from "../utils/queries";
import Auth from "../utils/auth";
import BudgetProfile from "../components/BudgetProfile"
import ItemList from "../components/ItemList";

function Budget() {
  const loggedIn = Auth.loggedIn();
  // data is received by using param object in graphql query
  const { id: _id } = useParams();
  const { loading, data } = useQuery(QUERY_BUDGET, { variables: { id: _id } });
  const budget = data?.budget || {};
  console.log(budget);

  if (!loggedIn) {
    return <section>log in required</section>;
  }

  // tbd: use global state to track username. if username !== budget.username, redirect to Home

  if (loading) {
    return <section>loading...</section>;
  }

  // BudgetProfile & BudgetForm(edit) switch depending on state (editProfile = true)
  // BudgetForm includes title, label, and description
  // item mutations: post, put, delete.
  // updating budget updates user server & cache data
  return <>
    <BudgetProfile budget={budget}/>
    <ItemList items={budget.items}/>
  </>;
}

export default Budget;
