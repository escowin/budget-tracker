function ItemForm() {
  const fields = [
    { name: "item", max: 25, type: "input" },
    { name: "type", max: 10, type: "radio", radios: ["income", "expense"] },
    { name: "value", max: 1000, type: "number" },
    { name: "note", max: 100, type: "input" },
  ];

  const radioField = (field) => {
    console.log(field);
    return (
      <>
        <legend>{field.name}</legend>
        {field.radios.map((radio, i) => (
          <label htmlFor={radio} key={i}>
            {radio}
            <input type={field.type} id={radio} name={field.name} />
          </label>
        ))}
      </>
    );
  };

  return (
    <form>
      <h2>Add item</h2>
      {fields.map((field, i) =>
        field.type === "radio" ? (
          <fieldset key={i}>{radioField(field)}</fieldset>
        ) : (
          <label key={i} htmlFor={field.name}>
            {field.name}
            <input id={field.name} name={field.name} type={field.input} />
          </label>
        )
      )}
      <button type="submit">submit</button>
    </form>
  );
}

export default ItemForm;
