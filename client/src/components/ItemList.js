import Item from "./Item";
import ItemForm from "./ItemForm";
import Menu from "./Menu";

function ItemList({ items }) {
  return (
    <section className="list-section">
      <ul className="list" id="items">
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </ul>
      <ItemForm/>
      <Menu menu={["add-item"]} type={"button"}/>
    </section>
  );
}

export default ItemList;
