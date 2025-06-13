const pool = require("../database/")
const invModel = {};


/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

// Get single vehicle by ID
invModel.getVehicleById = async function (inv_id) {
  return await pool.query(
    `SELECT * FROM public.inventory WHERE inv_id = $1`,
    [inv_id]
  ).then(result => result.rows);
};

module.exports = pool






module.exports = {getClassifications}
module.exports = {getClassifications, getInventoryByClassificationId};