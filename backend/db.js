require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.DATABASE_URL;

mongoose.connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const collection1 = mongoose.connection.db.collection("food_items");
    const collection2 = mongoose.connection.db.collection("foodCategory");
    
    try {
      const data1 = await collection1.find({}).toArray();
      global.food_items = data1;

      const data2 = await collection2.find({}).toArray();
      global.foodCategory = data2;
       
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
