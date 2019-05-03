const express = require("express");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const bodyParser = require("body-parser");
const items = require("./routes/api/itemRoute");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/mern1", {useNewUrlParser: true})
.then(console.log("Connected to MongoDB"));
app.use("/", items);

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`);});