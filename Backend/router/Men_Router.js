const express = require("express");
const router = express.Router();
const MenStore = require("../models/MenStore");

// get Marks
router.get("/", async (req, res) => {
  const getMenProduct = await MenStore.find();

  if (!getMenProduct) {
    res.status(500).json({ success: false });
  }
  res.send(getMenProduct);
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
  const id = req.body.id

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
