const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.log("error");
}

const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`MongoDB connected`);
});
const userRouter = require("./routers/userRouter");
const notesRouter = require("./routers/notesRouter");

app.use("/notes", notesRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
