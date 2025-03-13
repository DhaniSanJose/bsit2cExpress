import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");




  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);




  const addItem = () => {
    axios
      .post(API_URL, { name: firstName, last_name: lastName })

      .then((response) => {
        
        setItems([...items, response.data])
          setFirstName("");
          setLastName("");
      })
      
        .catch((error) => console.error("Error Adding items:", error));
  };








  // update item

  const updateItem = (id, field, value) => {

    const updateItem = items.find(item => item.id === id);
    if(!updateItem) return;

      const updateData = {
        name: updateItem.name,
        last_name: updateItem.last_name,
        [field]: value // update the field dynamically
      };

    axios.put(`${API_URL}/${id}`, updateData)
        .then(response => {
            setItems(items.map(item => (item.id === id ? response.data : item)));
        })
        .catch(error => console.error("Error updating item:", error));
};



  const deleteItem = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div>
      <h1>React + Express REST API</h1>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      <button onClick={addItem}>Add Item</button>
      <ul>
        
        
        {items.map((item) => (
          <li key={item.id}>
           
           
            <input 
            type="text" 
            value={item.name} 
            onChange={(e) => updateItem(item.id, "name", e.target.value)} 
            />



            <input 
            type="text" 
            value={item.last_name} 
            onChange={(e) => updateItem(item.id, "last_name", e.target.value)} 
            />



            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}





      </ul>
    </div>
  );
}

export default App;
