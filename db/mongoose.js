const mongoose = require("mongoose");

const mongo = mongoose
  .connect(
    "mongodb+srv://Dojeto:Dojeto123@cluster0.cfclt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongo;