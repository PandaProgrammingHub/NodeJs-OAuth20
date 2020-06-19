const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const route = require("./routes/index");
const authRoute = require("./routes/auth");
const MonogoStore = require("connect-mongo")(session);
const port = process.env.PORT || 3000;

const connectDB = require("./config/db");
const { Mongoose } = require("mongoose");

//Load Config
dotenv.config({ path: "./config/config.env" });

// Passport Config
require("./config/passport")(passport);

connectDB();

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MonogoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", route);
app.use("/auth", authRoute);

//App Listen
app.listen(port, () =>
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${port}`)
);
