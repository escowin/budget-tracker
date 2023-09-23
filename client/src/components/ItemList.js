import Item from "./Item";

function ItemList({ items }) {
  return (
    <section>
      <ul className="list">
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default ItemList;
