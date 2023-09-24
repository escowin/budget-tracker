import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BUDGET, EDIT_BUDGET } from "../utils/mutations";
import { format } from "../utils/helpers";

function BudgetForm({ type }) {
  // server | type prop determines which mutation is performed
  const [budget, { error }] = useMutation(type === "add" ? ADD_BUDGET : EDIT_BUDGET);

  // defines state & form properties to keep component DRY
  const fields = [
    { name: "title", max: 50 },
    { name: "label", max: 10 },
    { name: "description", max: 250 },
  ];

  // maps array object key w/ empty string value to define initial form state
  const initialState = Object.fromEntries(fields.map((field) => [field.name, ""]));
  const [formState, setFormState] = useState(initialState);

  // updates state object's key-values with corresponding user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value })
  };

  // performs graphql mutation
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // to-do: update user cache w/ succesful mutation
    try {
      await budget({
        variables: { ...formState },
      })
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>{format.title(type)} budget</h2>
      {fields.map((field, i) => (
        <label key={i} htmlFor={field.name}>
          {field.name}
          <input
            id={field.name}
            name={field.name}
            maxLength={field.max}
            value={formState[field.name]}
            onChange={handleChange}
          />
        </label>
      ))}
      <button type="submit">submit</button>
      {error && <p>error</p>}
    </form>
  );
}

export default BudgetForm;
