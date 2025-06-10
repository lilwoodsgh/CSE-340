const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by details view
 * ************************** */
invCont.buildDetail = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id);
  const data = await invModel.getVehicleById(inv_id);
  const nav = await utilities.getNav();
  const vehicleHtml = utilities.buildVehicleDetail(data[0]);
  const title = `${data[0].inv_make} ${data[0].inv_model}`;
  res.render("./inventory/detail", {
    title,
    nav,
    vehicle: vehicleHtml,
    errors: null
  });
};


module.exports = invCont