const express = require("express");

const router = express.Router();

//params dinamicos:
router.get("/categories/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    Category: categoryId,
    Product: productId,
  })
})

module.exports = router;