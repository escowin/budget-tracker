import ItemProfile from "./ItemProfile";
import ItemForm from "./ItemForm";

function ItemList({ items, budgetId }) {
  return (
    <section className="list-section">
      <ul className="list" id="items">
        {items.map((item, i) => (
          <ItemProfile key={i} item={item} />
        ))}
      </ul>
      <ItemForm budgetId={budgetId} type={"add"}/>
    </section>
  );
}

export default ItemList;
