import { useState } from "react";
import { format } from "../utils/helpers";

function BudgetForm({ type }) {
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
    console.log(formState);
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
    </form>
  );
}

export default BudgetForm;
