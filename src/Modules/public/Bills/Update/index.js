const express = require("express");
const pool = require("../../../../pool");
const billsUpdate = express.Router();

billsUpdate.put("/", async (req, res) => {
  try {
    const { id } = req.query;
    const changed = [];
    let i = 1;
    for (let prop in req.body) {
      changed.push(`${prop} = $${i++}`);
    }
    const { rows } = await pool.query(
      `UPDATE public."Bills" SET ${changed} WHERE 1=1 AND id=$${i} RETURNING *`,
      [...Object.values(req.body), id]
    );
    res.json({
      success: true,
      msg: "Bills was updated successfully.",
      data: rows,
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});

module.exports = billsUpdate;
