import { ApolloProvider, ApolloClient, createHttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/css/index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Budget from "./pages/Budget";
import AddBudget from "./pages/AddBudget";
import Page404 from "./pages/Page404";
import Header from "./components/Header";
import Footer from "./components/Footer";

// client.link
// The authorization link to add authentication headers to GraphQL requests.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// The HTTP link that defines the GraphQL server's URI.
const httpLink = createHttpLink({ uri: "/graphql" });

// client.cache
// The cache configuration object
const mergeBudgetItems = {
  Budget: {
    fields: {
      items: {
        // defines how data is merged & stored in the Apollo Client's cache.
        merge(existing = [], incoming) {
          return incoming;
        },
      },
    },
  },
};

// Initializes the Apollo Client instance.
const client = new ApolloClient({
  // Configures the Apollo Client instance with the HTTP link, authorization link, and cache settings.
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ typePolicies: mergeBudgetItems }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/budget/:id" element={<Budget />} />
              <Route path="/add-budget" element={<AddBudget />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
          <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
