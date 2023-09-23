import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SELF } from "../utils/queries";
import Auth from "../utils/auth";

function Home() {
  const loggedIn = Auth.loggedIn();
  const { loading, data } = useQuery(QUERY_SELF);
  const userData = data?.self || {}
  console.log(userData);

  if (loading) {
    return <section>Loading...</section>;
  }

  return (
    <>
      {loggedIn && data ? (
        <section>home page for {userData.username}</section>
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
