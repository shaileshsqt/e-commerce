const express = require("express");
// import { Express } from "express";
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 4001;
const db = require("./db");
const authUser = require("./router/user_Route");
const MenStore = require("./router/Men_Router");
// const StudentModel = require("../Backend/models/student_model");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Router
app.use("/auth", authUser);
app.use("/Men", MenStore);

app.listen(port, console.log(`server running on this ${port}`));
