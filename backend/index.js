require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
require("./db");

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json());
app.use('/api',require("./routes/CreateUser"))
app.use('/api',require("./routes/DisplayData"))
app.use('/api',require("./routes/OrderData"))

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
