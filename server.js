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
const inventoryRoute = require("./routes/inventoryroute")


function buildNav() {
  // Your navigation building logic here
  return '<nav>...</nav>';
}



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
app.use("/inv", inventoryRoute)

//Index route
app.get("/", function(req, res){
  res.render("index", {title: "Home"})
})
app.get("/", baseController.buildHome)
app.get("/", utilities.handleErrors(baseController.buildHome))


// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  console.error("Global Error Handler:", err.message)

  let nav = "<nav><a href='/'>Home</a></nav>"
  try {
    nav = await require("./utilities").getNav()
  } catch (navErr) {
    console.error("Navigation load failed:", navErr.message)
  }

  res.status(500).render("errors/error", {
    title: "Server Error",
    message: err.message,
    nav
  })
})



/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 3000 // Default to 3000 if PORT is not set
const host = process.env.HOST || "localhost" // Default to localhost if HOST is not set

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
});
