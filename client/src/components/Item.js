function Item({ item }) {
  console.log(item)
  // clicking on note will open item.note in module
  return (
    <li className="item" id={item._id}>
      <h3>{item.item}</h3>
      <p>{item.type}</p>
      <p>{item.num}</p>
      <p>note</p>
      <div>
        <button>edit</button>
        <button>delete</button>
      </div>
    </li>
  );
}

export default Item;
