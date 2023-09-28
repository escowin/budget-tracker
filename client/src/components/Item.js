import Menu from "./Menu";

function Item({ item }) {
  const menu = { options: ["edit", "delete"], el: "button" };
  
  // to-do: clicking on note will open item.note in module
  return (
    <li className="item" id={item._id}>
      <h3>{item.item}</h3>
      <p>{item.type}</p>
      <p>{item.num}</p>
      <p>note</p>
      <Menu menu={menu.options} el={menu.el} />
    </li>
  );
}

export default Item;
