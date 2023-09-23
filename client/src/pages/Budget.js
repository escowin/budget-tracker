import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_BUDGET } from "../utils/queries";
import Auth from "../utils/auth";

function Budget() {
  const loggedIn = Auth.loggedIn();
  const { id: _id } = useParams();
  // queries & returns budget data by using param object in graphql query
  const { loading, data } = useQuery(QUERY_BUDGET, { variables: { id: _id } });
  console.log(data);

  if (!loggedIn) {
    return <section>log in required</section>;
  }

  if (loading) {
    return <section>loading...</section>;
  }

  return <>{<div>budget page</div>}</>;
}

export default Budget;
