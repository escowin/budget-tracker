import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_BUDGET, EDIT_BUDGET } from "../utils/mutations";
import { format } from "../utils/helpers";
import { QUERY_SELF } from "../utils/queries";

// to-do: merge budget & item forms into one, pass 'fields' as a prop to determine form elements
function BudgetForm({ type, setEditSelected, _id }) {
  // defines state & form properties to keep component DRY
  const fields = [
    { name: "title", max: 50 },
    { name: "description", max: 250 },
    {
      name: "label",
      max: 10,
      type: "radio",
      radios: ["personal", "business", "estate"],
    },
  ];

  const navigate = useNavigate();
  // server | type prop determines which mutation is performed
  const [budget, { error }] = useMutation(
    type === "add" ? ADD_BUDGET : EDIT_BUDGET,
    {
      // updates user cache data object
      update(cache, { data: { addBudget } }) {
        try {
          const queryData = cache.readQuery({ query: QUERY_SELF });
          const user = queryData?.self;

          if (user) {
            const updatedBudgets = [addBudget, ...user.budgets];

            cache.writeQuery({
              query: QUERY_SELF,
              data: {
                self: {
                  ...user,
                  budgets: updatedBudgets,
                  budgetCount: updatedBudgets.length,
                },
              },
            });
          }
        } catch (err) {
          console.error(err);
          console.warn("saved first budget");
        }
      },
    }
  );

  // maps array object key w/ empty string value to define initial form state
  const initialState = Object.fromEntries(
    fields.map((field) => [field.name, ""])
  );
  const [formState, setFormState] = useState(initialState);

  // updates state object's key-values with corresponding user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };
  console.log(type);

  // performs graphql mutation
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const mutation = {
        ...formState,
        ...(type === "edit" ? { id: _id } : {}),
      };

      await budget({
        variables: mutation,
      });
      type === "add" ? navigate("/") : setEditSelected(false);
    } catch (err) {
      console.error(err);
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

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>{format.title(type)} budget</h2>
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

export default BudgetForm;
