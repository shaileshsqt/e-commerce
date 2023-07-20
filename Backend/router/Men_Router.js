const express = require("express");
const router = express.Router();
const MenStore = require("../models/MenStore");
const { ObjectId } = require("mongodb");

// get Marks
router.get("/", async (req, res) => {
  console.log("get all data");
  const getMenProduct = await MenStore.find();

  if (!getMenProduct) {
    res.status(500).json({ success: false });
  }
  res.send(getMenProduct);
});

router.get("/product", async (req, res) => {
  console.log("inside single id::", req.query.id);
  const product = await MenStore.findById({
    _id: new ObjectId(req.query.id),
  });
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "The product with the given ID not exists",
    });
  }
  res.status(200).send(product);
  // const id = req.params._id;

  // const getSingleProduct = await MenStore.findById({
  //   _id: new mongodb.ObjectId(req.params.id),
  // });
  // console.log("getSingleProduct", getSingleProduct);

  // if (!getSingleProduct) {
  //   res.status(500).json({ success: false });
  // }
  // res.send(getSingleProduct);

  // MenStore.findById(
  //   { _id: new mongodb.ObjectId(req.params.id) },
  //   function (err, docs) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Result : ", docs);
  //     }
  //   }
  // );
});
// Add
router.post("/AddMenProduct", (req, res) => {
  let data = new MenStore({
    title: req.body.title,
    image: req.body.image,
    img1: req.body.img1,
    img2: req.body.img2,
    img3: req.body.img3,
    img4: req.body.img4,
    price: req.body.price,
    category: req.body.category,
    id: req.body.id,
  });
  data
    .save()
    .then((result) => {
      if (!result) {
        return res
          .status(400)
          .send({ message: "Men Product creation error", status_code: 0 });
      } else {
        return res.status(200).send({
          message: "MenStore Created Successfully",
          data: result,
          status_code: 1,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating MenStore",
        error,
        status_code: 0,
      });
    });
});

// Update
router.put("/Update", async (req, res) => {
  // const id = req.params._id;
  const id = req.body.id;

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  MenStore.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else
        res.send({ message: "Product was updated successfully.", Data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
        error: err,
      });
    });
});

//delete
router.delete("/:id", async (req, res) => {
  // const id = req.params._id;
  const id = req.params.id.toString().trim();

  Marks.findByIdAndRemove(id, { useFindAndModify: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else
        res.send({ message: "Tutorial was Deleted successfully.", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error Deleting Tutorial with id=" + id,
        error: err,
      });
    });
});
module.exports = router;
