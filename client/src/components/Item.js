import Menu from "./Menu";

function Item({ item }) {
  // to-do: clicking on note will open item.note in module
  return (
    <li className="item" id={item._id}>
      <h3>{item.item}</h3>
      <p>{item.type}</p>
      <p>{item.num}</p>
      <p>note</p>
      <Menu menu={["edit", "delete"]} el={"button"} />
    </li>
  );
}

export default Item;
