import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ITEM } from "../utils/mutations";

function ItemForm({ budgetId }) {
  // Server graphql mutation
  const [item, { error }] = useMutation(ADD_ITEM);

  // Form
  const fields = [
    { name: "item", max: 25, type: "input" },
    { name: "type", max: 10, type: "radio", radios: ["income", "expense"] },
    { name: "num", max: 1000, type: "number" },
    { name: "note", max: 100, type: "input" },
  ];

  // Maps array object key w/ empty string value to define initial form state
  const initialState = Object.fromEntries(
    fields.map((field) => [field.name, ""])
  );
  const [formState, setFormState] = useState(initialState);

  // user input updates state object's corresponding key-value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // sends data from client to server
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // converts `num` key-value from string to float
    const num = parseFloat(formState.num);

    // client-side value type validation
    if (!isNaN(num)) {
      const mutation = { budgetId, ...formState, num: num };
      try {
        await item({ variables: { ...mutation } });
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Invalid format for 'num'");
    }
  };

  // UI display
  const radioField = (field) => {
    return (
      <>
        <legend>{field.name}</legend>
        {field.radios.map((radio, i) => (
          <label htmlFor={radio} key={i}>
            {radio}
            <input
              type={field.type}
              id={radio}
              name={field.name}
              value={radio}
              checked={formState[field.name] === radio}
              onChange={handleChange}
            />
          </label>
        ))}
      </>
    );
  };

  return (
    <form onSubmit={handleFormSubmit}>
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
