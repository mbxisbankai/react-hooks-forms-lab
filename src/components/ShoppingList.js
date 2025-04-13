import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";


function ShoppingList({ items, setItems }) {
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [ typedItem, setTypedItem ] = useState("All");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function searchChange(event){
    setTypedItem(event.target.value);
  }

  function handleSubmit(newItem){
    setItems((items) => [...items, newItem])
  }



  const itemsToDisplay = items.filter((item) => {
    const categoryMatch = 
      selectedCategory === "All" || item.category === selectedCategory;

    const searchMatch = 
      typedItem === "All" || item.name.toLowerCase().includes(typedItem.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="ShoppingList">
      <ItemForm items={items} setItems={setItems} onItemFormSubmit={handleSubmit}/>
      <Filter onSearchChange={searchChange} search={typedItem} onCategoryChange={handleCategoryChange}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
