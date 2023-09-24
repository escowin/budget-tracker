import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SELF } from "../utils/queries";
import Auth from "../utils/auth";
import UserProfile from "../components/UserProfile";
import BudgetsList from "../components/BudgetsList";

function Home() {
  // Boolean defined by local storage jwt's expiration status
  const loggedIn = Auth.loggedIn();
  // Defined by decoded jwt value
  const loggedUser = Auth.getProfile().data.username;
  // Destructred boolean & object defined from graphql query
  const { loading, data } = useQuery(QUERY_SELF);
  // Destructured objects are either defined as queried server data, or as empty objects.
  const { budgets, ...userData } = data?.self || {};

  // Conditional render dictated by queried boolean value
  if (loading) {
    return <section>Loading...</section>;
  }

  return (
    // Conditional render dictated by security requirements
    <>
      {loggedIn && loggedUser === userData.username ? (
        <>
          <UserProfile user={userData} />
          <BudgetsList budgets={budgets} />
        </>
      ) : (
        <section>
          <Link to="/login" className="link">
            log in
          </Link>{" "}
          to view contents
        </section>
      )}
    </>
  );
}

export default Home;
