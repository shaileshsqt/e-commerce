const express = require("express");
// import express from "express";
const router = express.Router();
const authUser = require("../models/authUser");
const db = require("../db");

router.get("/", async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

// router.post("/register", async (req, res) => {
//   const userList = await authUser.find();

//   if (userList.length === 0) {
//     let user = new authUser({
//       // id: getValueForNextSequence("autoval"),
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password,
//     });
//     user = user.save();
//     if (!user) return res.status(404).send("User cannot be created");
//     res.send(user);
//   } else {
//     const Sort = await User.find({})
//       .sort({ studentId: -1 })
//       .limit(1)
//       .then((resu) => {
//         let user = new User({
//           // id: getValueForNextSequence("autoval"),
//           Name: req.body.Name,
//           Subject: req.body.Subject,
//           Gr_No: req.body.Gr_No,
//           Roll_No: req.body.Roll_No,
//           Result: req.body.Result,
//           studentId: parseInt(resu[0].studentId) + 1,
//         });

//         user = user.save();

//         if (!user) return res.status(404).send("User cannot be created");
//         res.send(user);
//       });
//   }
// });

router.post("/register", (req, res) => {
  let user = new authUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save()
    .then((result) => {
      if (!result) {
        return res
          .status(200)
          .send({ message: "user creation error", status_code: 0 });
      } else {
        return res.status(200).send({
          message: "User Created Successfully",
          data: result,
          status_code: 1,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating user",
        error,
        status_code: 0,
      });
    });
});

router.post("/login", async (req, res) => {
  console.log("req::", req.body);
  const user = await authUser.findOne({ email: req.body.email });
  console.log("find user log", user);

  if (!user) {
    return res
      .status(200)
      .send({ message: "Invalid username and password", status_code: 0 });
  }

  if (user.password == req.body.password) {
    res.status(200).send({
      data: user,
      message: "user login Successfully",
      status_code: 1,
    });
  } else {
    res.status(200).send({ message: "Password is mismatch", status_code: 0 });
  }
  //   return res
  //     .status(200)
  //     .send({ message: "User login Successfully!", data: user });
});

module.exports = router;
