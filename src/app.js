// ************ Require's ************
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookies = require('cookie-parser');
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// ************ express() ************
const app = express();

// ************ Middlewares ************
app.use(session({secret : "secret", resave: false, saveUninitialized: false})); // Use session (cross all soft)
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false })); // Para poder tomar los parámetros desde el POST
app.use(express.json()); // Para poder trabajar con stringify y demás
app.use(cookies());       // Para trabajar con las cookies
app.use(userLoggedMiddleware);

//process.env.PORT -> Heroku PORT
app.listen(process.env.PORT || 42133, () => {
  console.log("Server initiated in port 42133");
  console.log("Hostname: http://localhost:42133");
});

// ************ Template Engine ************
app.set("view engine", "ejs"); // Defines that the view engine used will be ejs.
app.set("views", path.join(__dirname, "/views")); // Defines path to the views folder.

// ************ Routes ************
const mainRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

app.use("/", mainRouter);
app.use('/', usersRouter);
app.use("/products", productsRouter);
