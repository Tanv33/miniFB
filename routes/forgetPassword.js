import express from "express";
import nodemailer from "nodemailer";
import { otpUser } from "../models/otpUser.js";
import { signup } from "../models/signup.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/otp", function (req, res) {
  if (!req.body.email) {
    res.status(403).send("Required field mssing");
    return;
  }
  signup.findOne({ email: req.body.email }, async (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      if (data) {
        // console.log(data);
        // res.send(data);
        function generateRandomNumber(min, max) {
          return Math.random() * (max - min) + min;
        }
        const otp = generateRandomNumber(11111, 99999).toFixed(0);
        // console.log(otp);
        const salt = await bcrypt.genSalt(10);
        const otpBycrpt = await bcrypt.hash(otp, salt);
        // console.log(otpBycrpt);
        const newOtpUSer = new otpUser({
          otp: otpBycrpt,
          email: data.email,
        });
        newOtpUSer.save((err, result) => {
          // console.log(result);
          if (result) {
            res.send("User Matched");
            const transporter = nodemailer.createTransport({
              service: "gmail",
              port: 587,
              auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD,
              },
            });

            const mailOptions = {
              from: "tanveerniazi2000@gmail.com",
              // to: data.email,
              to: data.email,
              subject: "OTP confirmation",
              text: `Your OTP Code is ${otp} This OTP is valid till 5 minutes`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                // console.log(error);
              } else {
                // console.log("Email sent: " + info.response);
              }
            });
          } else {
            res.status(500).send("Internal Server Error");
          }
        });
      } else {
        res.status(404).send("User not Found");
      }
    }
  });
});

router.post("/newpassword", (req, res) => {
  if (!req.body.otp || !req.body.password || !req.body.confrimpassword) {
    res.status(403).send("required field missing");
    return;
  }
  if (req.body.password !== req.body.confrimpassword) {
    res.status(403).send("Please check your new password fields");
    return;
  }
  // console.log(req.body);
  otpUser
    .findOne({ email: req.body.email })
    .sort({ _id: -1 })
    .exec((err, otpData) => {
      if (err) {
        res.status(403).send("Error in database");
      } else {
        // console.log(otpData);
        if (otpData) {
          const otpCreated = new Date(otpData.created).getTime;
          const now = new Date().getTime;
          const diff = now - otpCreated;
          if (diff > 300000 || otpData.used) {
            res.status(403).send("OTP expire");
          } else {
            bcrypt.compare(
              req.body.otp.toString(),
              otpData.otp,
              async function (err, result) {
                if (err) {
                  res.status(403).send("error in matching otp");
                  // console.log(err);
                } else {
                  if (result) {
                    // console.log("true ", result);
                    const salt = await bcrypt.genSalt(10);
                    const newPassBcrypt = await bcrypt.hash(
                      req.body.password,
                      salt
                    );
                    signup.findOneAndUpdate(
                      { email: req.body.email },
                      { password: newPassBcrypt },
                      {},
                      (err, updated) => {
                        if (err) {
                          res.status(500).send("error in updating database");
                        } else {
                          if (updated) {
                            res.send("password updated");
                          } else {
                            res.status(403).send("can't update new password");
                          }
                        }
                      }
                    );
                    otpData.updateOne({ used: true }).exec((err, otpUpdate) => {
                      if (!err) {
                        // res.send(otpUpdate);
                        // console.log(otpUpdate);
                      } else {
                        res.status(500).send("update fail");
                        // console.log(err);
                      }
                    });
                  } else {
                    res.status(403).send("Wrong OTP");
                  }
                }
              }
            );
          }
        }
      }
    });
});

export default router;
