const { Pool } = require("pg")
require("dotenv").config()

const isRender = process.env.DATABASE_URL.includes("render.com")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRender ? { rejectUnauthorized: false } : false,
})

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("executed query", { text })
      return res
    } catch (error) {
      console.error("error in query", { text, error })
      throw error
    }
  },
}
