import Item from "./Item";
import ItemForm from "./ItemForm";

function ItemList({ items, budgetId }) {
  return (
    <section className="list-section">
      <ul className="list" id="items">
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </ul>
      <ItemForm budgetId={budgetId}/>
    </section>
  );
}

export default ItemList;
