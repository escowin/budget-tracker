import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../utils/mutations";
import { format } from "../utils/helpers";
import Auth from "../utils/auth";

function LoginForm({ type }) {
  // server | type prop determines which mutation is performed
  const [login, { error }] = useMutation(
    type === "log-in" ? LOGIN_USER : ADD_USER
  );
  // state
  // - initially sets form values to empty strings
  const [formState, setFormState] = useState({ username: "", password: "" });
  // - updates form state values with user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // - uses state object in mutation, form type determines data used for authentication
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(type === "log-in" ? data.login.token : data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form id={`${format.id(type)}-form`} onSubmit={handleFormSubmit}>
      <h2>{format.title(format.string(type))}</h2>
      <label htmlFor="username">
        username
        <input
          name="username"
          value={formState.username}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="password">
        password
        <input
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">submit</button>
      {error && <p>error: {error}</p>}
    </form>
  );
}

export default LoginForm;
