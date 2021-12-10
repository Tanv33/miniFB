import "./Signup.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Message from "../Message/Message";
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  fullName: yup
    .string("Enter a valid Name")
    .min(8, "Name should be 8 characters long")
    .required("Name is required"),

  email: yup
    .string("Enter your email")
    .min(14, "Email should be 14 characters long")
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string("Enter your phone number")
    .min(10, "Phone number should be 10 integers long")
    .required("Phone number is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),

  address: yup
    .string("Enter your address")
    .min(20, "Address should be of minimum 20 characters in length")
    .required("Address is required"),
});
function Signup() {
  const history = useHistory();
  const [messageBar, setMessageBar] = useState("");
  const dev = "http://localhost:2000";
  const baseURL =
    window.location.hostname.split(":")[0] === "localhost" ? dev : "";
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const genderValue = document.querySelector(
        'input[name="gender"]:checked'
      ).value;
      axios
        .post(`${baseURL}/api/v1/auth/signupuser`, {
          fullName: values.fullName,
          email: values.email,
          gender: genderValue,
          phoneNumber: Number(values.phoneNumber),
          password: values.password,
          address: values.address,
        })
        .then((result) => {
          if (result.data === "user created") {
            setMessageBar(true);
            setTimeout(() => {
              history.push("/");
              setMessageBar("");
            }, 1000);
            return;
          }
          if (result.data === "user already exist") {
            setMessageBar(false);
            setTimeout(() => {
              setMessageBar("");
            }, 1000);
            return;
          }
        })
        .catch((err) => {});
    },
  });

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/auth/signupuser`).then((res) => {});
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {messageBar === true ? (
        <Message
          type="success"
          message="Welcome! Successfully account created"
        />
      ) : (
        ""
      )}
      {messageBar === false ? (
        <Message type="error" message="Sorry: Email already exist" />
      ) : (
        ""
      )}
      <div className="mainParentSign">
        <div className="parentChildSign">
          <div className="loginHeadingSign">
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", color: "#800020" }}
            >
              Signup Form
            </Typography>
          </div>
          <Box
            type="form"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              variant="outlined"
              placeholder="Enter Your Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              placeholder="Enter your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              style={{ marginBottom: "10px" }}
            />

            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ textAlign: "left" }}>
                Gender
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                defaultValue="male"
                name="genderParent"
              >
                <FormControlLabel
                  name="gender"
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  name="gender"
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              type="number"
              variant="outlined"
              placeholder="Enter Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              name="address"
              id="outlined-basic"
              label="Address"
              variant="outlined"
              placeholder="Type Your address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              style={{ marginBottom: "10px" }}
            />
            <Button
              type="submit"
              size="medium"
              variant="contained"
              style={{
                marginRight: "5px",
                backgroundColor: "#800020",
                marginBottom: "15px",
              }}
            >
              Submit
            </Button>
            <Button
              size="medium"
              variant="contained"
              color="success"
              style={{ backgroundColor: "#800020", marginBottom: "15px" }}
              onClick={() => history.push("/")}
            >
              I have an account
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Signup;
