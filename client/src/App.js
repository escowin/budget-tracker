import { ApolloProvider, ApolloClient, createHttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/css/index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Budget from "./pages/Budget";
import Page404 from "./pages/Page404";
import Header from "./components/Header";
import Footer from "./components/Footer";

// configures the apollo client's http link for graphql queries
const httpLink = createHttpLink({ uri: "/graphql" });

// configures authentication for apollo client to include an authorization header in graphql queries
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// configures how Budget items data is merged in the apollo client's cache
const mergeBudgetItems = {
  Budget: {
    fields: {
      items: {
        merge(existing = [], incoming) {
          return incoming;
        },
      },
    },
  },
};

// configures the apollo client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ typePolicies: mergeBudgetItems }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/budget/:id" element={<Budget/>}/>
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
