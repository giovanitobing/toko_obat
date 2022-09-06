const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const { userRoutes, avatarRoutes, tokenRoutes } = require("./routes");

dotenv.config();
const PORT = process.env.PORT;
const { sequelize } = require("./library/sequelize");
// sequelize.sync({ alter: true });

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/avatar", avatarRoutes);
app.use("/token", tokenRoutes);

app.use("/avatar", express.static(`${__dirname}/public/avatar`));

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.listen(PORT, () => {
  console.log("server is running in port : " + PORT);
});
