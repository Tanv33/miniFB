import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Message from "../Message/Message.jsx";
import { useHistory } from "react-router-dom";
// import { GlobalContext } from "../../context/Context";
// import { useContext } from "react";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .min(14, "Email should be 14 characters long")
    .email("Enter a valid email")
    .required("Email is required"),
});

const validationSchema1 = yup.object({
  otp: yup.string("Enter your OTP").required("OTP is required"),
  password: yup
    .string("Enter your new password")
    .min(8, "New Password should be 8 characters long")
    .required("password is required"),
  confrimpassword: yup
    .string("ReEnter your password")
    .min(8, "New password should be 8 characters long")
    .required("confirm password is required"),
});

function ForgetPassword() {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  //   let { dispatch } = useContext(GlobalContext);
  const [messageBar, setMessageBar] = useState(undefined);
  const [messageText, setMessageText] = useState(undefined);
  const dev = "http://localhost:2000";
  const baseURL =
    window.location.hostname.split(":")[0] === "localhost" ? dev : "";

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(`${baseURL}/api/v1/new/otp`, {
          email: values.email,
        })
        .then((result) => {
          // console.log(result);
          setMessageText(result.data);
          setMessageBar(true);
          setTimeout(() => {
            setMessageBar(undefined);
            setEmail(values.email);
            setStep(2);
          }, 2000);
        })
        .catch((err) => {
          // console.log(err.response);
          setMessageText(err.response.data);
          setMessageBar(false);
          setTimeout(() => {
            setMessageBar(undefined);
          }, 2000);
        });
    },
  });

  const formik1 = useFormik({
    initialValues: {
      otp: "",
      password: "",
      confrimpassword: "",
    },
    validationSchema: validationSchema1,
    onSubmit: (values) => {
      if (values.password !== values.confrimpassword) {
        // console.log("password are not same");
        setMessageText("password are not same");
        setMessageBar(false);
        setTimeout(() => {
          setMessageBar(undefined);
        }, 2000);
        return;
      }
      // console.log(values, email);
      axios
        .post(`${baseURL}/api/v1/new/newpassword`, {
          email: email,
          otp: values.otp,
          password: values.password,
          confrimpassword: values.confrimpassword,
        })
        .then((result) => {
          // console.log(result);
          setMessageText(result.data);
          setMessageBar(true);
          setTimeout(() => {
            setMessageBar(undefined);
            history.push("/");
          }, 2000);
        })
        .catch((err) => {
          // console.log(err);
          setMessageText(err.response.data);
          setMessageBar(false);
          setTimeout(() => {
            setMessageBar(undefined);
          }, 2000);
        });
    },
  });

  return (
    <>
      {messageBar === true ? (
        <Message type="success" message={messageText} />
      ) : (
        ""
      )}
      {messageBar === false ? (
        <Message type="error" message={messageText} />
      ) : (
        ""
      )}
      <div className="mainParent">
        <div className="parentChild">
          {step === 1 ? (
            <>
              <div className="loginHeading">
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", color: "#800020" }}
                >
                  Forget Password
                </Typography>
              </div>
              <Box
                type="form"
                component="form"
                noValidate
                autoComplete="off"
                textAlign="center"
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Type your Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginTop: "8px",
                  }}
                >
                  <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    style={{ marginRight: "5px", backgroundColor: "#800020" }}
                  >
                    Send OTP
                  </Button>
                </div>
              </Box>
            </>
          ) : (
            <>
              <div className="loginHeading">
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", color: "#800020" }}
                >
                  Enter OTP code and New Password
                </Typography>
              </div>
              <Box
                type="form"
                component="form"
                noValidate
                autoComplete="off"
                textAlign="center"
                onSubmit={formik1.handleSubmit}
              >
                <TextField
                  fullWidth
                  type="number"
                  name="otp"
                  label="Otp"
                  variant="outlined"
                  placeholder="Enter your Otp Code"
                  value={formik1.values.otp}
                  onChange={formik1.handleChange}
                  error={formik1.touched.otp && Boolean(formik1.errors.otp)}
                  helperText={formik1.touched.otp && formik1.errors.otp}
                />

                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  label="New Password"
                  variant="outlined"
                  placeholder="Enter New Password"
                  value={formik1.values.password}
                  onChange={formik1.handleChange}
                  error={
                    formik1.touched.password && Boolean(formik1.errors.password)
                  }
                  helperText={
                    formik1.touched.password && formik1.errors.password
                  }
                  style={{ marginTop: "10px" }}
                />
                <TextField
                  fullWidth
                  type="password"
                  name="confrimpassword"
                  label="Confirm Password"
                  variant="outlined"
                  placeholder="ReEnter your New Password"
                  value={formik1.values.confrimpassword}
                  onChange={formik1.handleChange}
                  error={
                    formik1.touched.confrimpassword &&
                    Boolean(formik1.errors.confrimpassword)
                  }
                  helperText={
                    formik1.touched.confrimpassword &&
                    formik1.errors.confrimpassword
                  }
                  style={{ marginTop: "10px" }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginTop: "8px",
                  }}
                >
                  <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    style={{ marginRight: "5px", backgroundColor: "#800020" }}
                  >
                    Submit
                  </Button>
                </div>
              </Box>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
