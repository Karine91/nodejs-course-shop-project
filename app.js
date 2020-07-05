require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const csrf = require("csurf");
const flash = require("connect-flash");

const MongoDbStore = require("connect-mongodb-session")(
  session
);

const User = require("./models/user");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");

const app = express();
const store = new MongoDbStore({
  uri: process.env.DB_URI,
  collection: "sessions",
});

const csrfProtection = csrf();

app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.user;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);
app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.status(404).render("500", {
    pageTitle: "Page not found",
    path: "500",
  });
});

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
