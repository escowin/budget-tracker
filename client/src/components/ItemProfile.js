import { useState } from "react";
import ItemForm from "./ItemForm"
import Menu from "./Menu";

function ItemProfile({ item }) {
  // state variables
  const [editSelected, setEditSelected] = useState(false);
  const menu = { options: ["edit", "delete"], el: "button", model: "item" };

  const content = (
    <article>
      <h3>{item.item}</h3>
      <p>{item.type}</p>
      <p>{item.num}</p>
      <p>{item.note}</p>
    </article>
  );
  // to-do: clicking on note will open item.note in module
  return (
    <li className="item" id={item._id}>
      {!editSelected ? content : <ItemForm type={"edit"} setEditSelected={setEditSelected} />}
      <Menu menu={menu} _id={item._id} setEditSelected={setEditSelected} />
    </li>
  );
}

export default ItemProfile;
