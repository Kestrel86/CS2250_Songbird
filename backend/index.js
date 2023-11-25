const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const mongoose = require('mongoose');
require('dotenv/config')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", router);

mongoose.connect(process.env.DB_URI)
.then(() => console.log('DB connected!'))
.catch(err => console.log(err))

const port = process.env.PORT || 4000; //modifiable on localhost:____ port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Video at 13 minutes

//REact backend video by Codr kai
