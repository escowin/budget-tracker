import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SELF } from "../utils/queries";
import Auth from "../utils/auth";
import UserProfile from "../components/UserProfile";
import BudgetsList from "../components/BudgetsList";

function Home() {
  const loggedIn = Auth.loggedIn();
  const { loading, data } = useQuery(QUERY_SELF);
  const { budgets, ...userData } = data?.self || {};

  if (loading) {
    return <section>Loading...</section>;
  }

  return (
    <>
      {loggedIn && data ? (
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
