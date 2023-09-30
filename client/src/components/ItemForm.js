import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ITEM, EDIT_ITEM } from "../utils/mutations";

function ItemForm({ budgetId }) {
  // Defines attributes of form elements
  const fields = [
    { name: "item", max: 25, type: "input" },
    { name: "type", max: 10, type: "radio", radios: ["income", "expense"] },
    { name: "num", max: 1000, type: "number" },
    { name: "note", max: 100, type: "input" },
  ];

  // Server graphql mutation
  const [item, { error }] = useMutation(ADD_ITEM);

  // Creates an initial state object with all fields set to empty strings.
  const initialState = Object.fromEntries(
    fields.map((field) => [field.name, ""])
  );
  const [formState, setFormState] = useState(initialState);

  // Updates the form state by merging its existing values with captured user-input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Sends data from client to server
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Converts `num` key-value from string to float type
    const num = parseFloat(formState.num);

    // Clientside validation | `num` must be a number value to allow mutation
    if (!isNaN(num)) {
      const mutation = { budgetId, ...formState, num: num };
      try {
        // succesful mutation resets form state
        await item({ variables: { ...mutation } });
        setFormState(initialState);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Invalid format for 'num'");
    }
  };

  // UI display
  // Maps array objects into jsx return.
  const radioField = (field) => {
    return (
      <>
        <legend>{field.name}</legend>
        {field.radios.map((radio, i) => (
          <label htmlFor={radio} key={i}>
            <input
              type={field.type}
              id={radio}
              name={field.name}
              value={radio}
              checked={formState[field.name] === radio}
              onChange={handleChange}
            />
            {radio}
          </label>
        ))}
      </>
    );
  };

  // Conditoinally renders form elements.
  return (
    <form onSubmit={handleFormSubmit} className="item-form">
      <h2>Add item</h2>
      {fields.map((field, i) =>
        field.type === "radio" ? (
          <fieldset key={i}>{radioField(field)}</fieldset>
        ) : (
          <label key={i} htmlFor={field.name}>
            {field.name}
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formState[field.name]}
              onChange={handleChange}
            />
          </label>
        )
      )}
      <button type="submit">submit</button>
      {error && <p>error</p>}
    </form>
  );
}

export default ItemForm;
