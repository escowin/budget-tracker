import Item from "./Item";
import Menu from "./Menu";

function ItemList({ items }) {
  return (
    <section className="list-section">
      <ul className="list">
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </ul>
      <Menu menu={["add-item"]} type={"button"}/>
    </section>
  );
}

export default ItemList;
