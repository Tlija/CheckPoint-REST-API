const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const port = 3000;
const app = express();
const dbURL =
  "mongodb+srv://hachem:hachemtlija@mongodb.aip2eaa.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURL, (err, done) => {
  if (err) {
    console.log(err);
  }
  if (done) {
    console.log("base de donne  connecte avec succe");
  }
});
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (error) {
    console.log(err);
  }
});

//Post
app.post("/add", async (req, res) => {
  try {
    const newUser = await new User({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    });

    await newUser.save((err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log("user added successfully");
      }
    });
    res.send({ msg: "user added ", newUser });
  } catch (error) {
    console.log(err);
  }
});
//put

app.put("/edit/:id", async (req, res) => {
  try {
  const user=await  User.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name });
 
    if (user) {
        res.send()({msg:"updated successfully",use});
    }
   

} catch (err) {
    console.log(err.message);
  }
});
app.delete("/delete/:id", async (req, res) => {

    User.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
      if (err) {
       return res.status(400).send(err.message);
      }
      if (result) {
        return res.send("deleted successfully");
      }
    });

});

app.listen(port, (err) => {
  err ? console.log(err) : console.log(`le server is runing on port ${port}`);
});
