const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");



const app = express();
app.use(cors());
app.use(express.json()); // Allows Parsing of JSON request bodies

// MYSQL Connection

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'react_express_db'
});

db.connect(err => {
  if(err) throw err;
  console.log("MySQL connected...")
});


// GET ALL ITEMS IN THE DATABASE

app.get('/api/items', (req, res) =>{
    db.query("SELECT * FROM items", (err, results)=> {
      if(err) throw err;
      res.json(results);
    });
});



// PUT: UPDATE AN ITEM

app.put('/api/items/:id', (req, res) =>{
    const { id } = req.params;
    const { name, last_name } = req.body;

    db.query("UPDATE items SET name = ?, last_name = ? WHERE id = ?", [name, last_name, id], (err) =>{
      if(err) throw err;
      res.json({id, name, last_name});
    });
});


app.post('/api/items', (req, res) =>{
      const {name, last_name} = req.body;
      db.query("INSERT INTO items (name, last_name) VALUES (?, ?)", [name, last_name], (err, result) =>{
        if(err) throw err;
        res.json({ id: result.insertId, name, last_name})
      });
});


// DELETE: remove an Item


app.delete('/api/items/:id', (req, res) =>{
  const { id } = req.params;
  db.query("DELETE FROM items WHERE id = ?", [id], (err)=>{
    if(err) throw err;
    res.json({message: "Item deleted"});
  });
});




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
