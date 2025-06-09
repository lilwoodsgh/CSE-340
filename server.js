/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/basecontroller")
const utilities = require('./utilities'); // adjust path if needed

// filepath: C:\Users\USER\CSE-340\server.js
// ...existing code...
function buildNav() {
  // Your navigation building logic here
  return '<nav>...</nav>';
}
// ...existing code...


/* ***********************
 * View Engine and Template
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")// not at views root
app.use(async (req, res, next) => {
  res.locals.nav = await utilities.getNav(); // or buildNav()
  next();
});


/* ***********************
 * Routes
 *************************/
app.use(static)

//Index route
app.get("/", function(req, res){
  res.render("index", {title: "Home"})
})
app.get("/", baseController.buildHome)


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
