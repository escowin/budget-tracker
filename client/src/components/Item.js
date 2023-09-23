function Item({ item }) {
  // clicking on note will open item.note in module
  return (
    <li id={item._id}>
      <h3>{item.name}</h3>
      <p>{item.type}</p>
      <p>{item.num}</p>
      <p>note</p>
      <p>edit</p>
      <p>delete</p>
    </li>
  );
}

export default Item;
