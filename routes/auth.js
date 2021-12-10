import express from "express";
import bcrypt from "bcrypt";
import { signup } from "../models/signup.js";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET || "0900";


const router = express.Router();

router.get("/signupuser", (req, res) => {
  signup.find({}, (err, data) => {
    res.send(data);
  });
});

router.post("/signupuser", async (req, res) => {
  const { fullName, email, gender, phoneNumber, password, address } = req.body;
  if (!fullName || !email || !gender || !phoneNumber || !password || !address) {
    console.log("signup field missing");
    res.status(403).send("signup field missing");
    return;
  } else {
    signup.findOne({ email: email }, async (err, user) => {
      if (user) {
        res.send("user already exist");
      } else {
        // Bcrypt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        const signupuser = await new signup({
          fullName: req.body.fullName,
          email: req.body.email,
          gender: req.body.gender,
          phoneNumber: req.body.phoneNumber,
          password: secPass,
          address: req.body.address,
        });
        signupuser.save().then(() => {
          // console.log("User created");
          res.send("user created");
        });
      }

      if (err) {
        res.status(415).send("error in signup: " + err);
      }
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(403).send("email or password is missing");
    return;
  }
  signup.findOne({ email: email }, async (err, user) => {
    // if (!user) {
    //   res.send("Incorrect email");
    //   return;
    // }
    if (err) {
      // res.status(500).send("Server error");
      res.send("Incorrect email");
      return;
    } else {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          // result === true
          // console.log(result);
          if (err) {
            res.status(500).send("Server error");
            // console.log(err);
          } else {
            if (result) {
              var token = jwt.sign(
                {
                  id: user._id,
                  fullName: user.fullName,
                  email: user.email,
                  gender: user.gender,
                  phoneNumber: user.phoneNumber,
                  address: user.address,
                },
                SECRET
              );
              res.cookie("token", token, {
                httpOnly: true,
                //expires: (new Date().getTime + 300000), // 5 minutes
                maxAge: 86400000,
              });
              res.send(user);
              // console.log(user);
            } else {
              res.send("Incorrect password");
            }
          }
        });
      } else {
      }
    }
  });
  // const user = await signup.findOne({ email: req.body.email });
  // bcrypt.compare(req.body.password, user.password, function (err, result) {
  //   // result === true
  //   if (!err) {
  //     if (result) {
  //       var token = jwt.sign(
  //         {
  //           id: user._id,
  //           fullName: user.fullName,
  //           email: user.email,
  //           gender: user.gender,
  //           phoneNumber: user.phoneNumber,
  //           address: user.address,
  //         },
  //         SECRET
  //       );
  //       res.cookie("token", token, {
  //         httpOnly: true,
  //         //expires: (new Date().getTime + 300000), // 5 minutes
  //         maxAge: 86400000,
  //       });
  //       res.send(user);
  //     } else {
  //       res.send("error");
  //     }
  //   }
  // });
});

router.post("/logout", (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
    });
    // res.send("token vanished");
    res.send("GoodBye!");
  } catch (error) {
    res.send(error);
  }
});

export default router;
