const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const path = require("path");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport.js");
const userRoutes = require("./routes/users");
const gymRoutes = require("./routes/gyms");
// const donutRoutes = require("./routes/donuts");

const app = express();

app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/media", express.static(path.join(__dirname, "media")));

app.use(userRoutes);
app.use("/gyms", gymRoutes);
// app.use("/donuts", donutRoutes);

app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error!" });
});

db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
