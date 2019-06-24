const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

//create
router.post("/items", (req, res) => {
  let item = new Item(req.body);
  item.save()
  .then(item => {
    res.status(200).json({"item": "Item added successfully"});
    console.log("Item added");
  })
  .catch(err => {
    res.status(400).send("Adding item failed");
    console.log(err);
  });
});

//read
router.get("/items", (req, res) => {
  Item.find()
  .then(fItems => res.json(fItems))
  .catch(err => console.log(err));
});

//update
router.put("/items/:id", (req, res) => {
  Item.findByIdAndUpdate(req.params.id, {name: req.body.name}, (err, uItem) => {
    if (err) console.log(err);
    else console.log(`Item updated: ${uItem.name}`);
  });
});

//delete
router.delete("/items/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id)
  .then(rItem => {
    res.status(200).json({"item": "Item removed succesfully"});
    console.log("Item removed");
  })
  .catch(err => {
    res.status(400).send("Removing item failed");
    console.log(err);
  })
});

module.exports = router;