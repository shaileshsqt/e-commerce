const express = require("express");
const router = express.Router();
const WomenStore = require("../models/WomenStore");
const { ObjectId } = require("mongodb");

// get Marks
router.get("/", async (req, res) => {
  console.log("get all data");
  const getMenProduct = await WomenStore.find();

  if (!getMenProduct) {
    res.status(500).json({ success: false });
  }
  res.send(getMenProduct);
});

//Get WomenStore Product by id
router.get("/product", async (req, res) => {
  console.log("inside single id::", req.query.id);
  const product = await WomenStore.findById({
    _id: new ObjectId(req.query.id),
  });
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "The product with the given ID not exists",
    });
  }
  res.status(200).send(product);
});

//Add WomenStore Product
router.post("/AddWomenProduct", (req, res) => {
  let data = new WomenStore({
    title: req.body.title,
    image: req.body.image,
    img1: req.body.img1,
    img2: req.body.img2,
    img3: req.body.img3,
    img4: req.body.img4,
    price: req.body.price,
    actualPrice: req.body.actualPrice,
    category: req.body.category,
    id: req.body.id,
  });
  data
    .save()
    .then((result) => {
      if (!result) {
        return res.status(400).send({
          message: "WomenStore Product creation error",
          status_code: 0,
        });
      } else {
        return res.status(200).send({
          message: "WomenStore Created Successfully",
          data: result,
          status_code: 1,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating WomenStore",
        error,
        status_code: 0,
      });
    });
});

module.exports = router;
