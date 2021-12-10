import React, { useContext, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import Message from "../Message/Message";
import { GlobalContext } from "../../context/Context";
import axios from "axios";
import PostCard from "../PostCard/PostCard";
import { useFormik } from "formik";

function Profile() {
  const history = useHistory();
  const dev = "http://localhost:2000";
  const baseURL =
    window.location.hostname.split(":")[0] === "localhost" ? dev : "";
  let { state, dispatch } = useContext(GlobalContext);
  const [messageBar, setMessageBar] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [shuffle, setShuffle] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/v1/post/post`, {
        withCredentials: true,
      })
      .then((result) => {
        setAllPost(result.data);
      });
    return () => {
      // cleanup
    };
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    if (state?.user?.fullName) {
      axios
        .post(
          `${baseURL}/api/v1/auth/logout`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log("res", res.data);
        });

      setMessageBar(true);
      setTimeout(() => {
        dispatch({
          type: "USER_LOGOUT",
          payload: "",
        });
        history.push("/");
        setMessageBar([]);
      }, 1000);
    } else {
      setMessageBar(false);
      setTimeout(() => {
        setMessageBar([]);
      }, 1000);
    }
  };
  const showInputs = () => {
    setShuffle(false);
  };

  const formik = useFormik({
    initialValues: {
      fullName: state.user.fullName,
      gender: state.user.gender,
      phoneNumber: state.user.phoneNumber,
      address: state.user.address,
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(values);
      axios
        .put(
          `${baseURL}/api/v1/post/updateprofile`,
          {
            fullName: values.fullName,
            gender: values.gender,
            phoneNumber: values.phoneNumber,
            address: values.address,
          },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          // console.log(result.data);
          // dispatch({
          //   type: "USER_LOGIN",
          //   payload: {
          //     id: result.data.id,
          //     fullName: result.data.fullName,
          //     email: result.data.email,
          //     gender: result.data.gender,
          //     phoneNumber: result.data.phoneNumber,
          //     address: result.data.address,
          //   },
          // });
          setShuffle(!shuffle);
          window.location.reload();
        })
        .catch((params) => {});
    },
  });
  return (
    <div>
      {messageBar === true ? (
        <Message type="success" message="Good bye!" />
      ) : (
        ""
      )}
      {messageBar === false ? (
        <Message type="error" message="Sorry! Something went wrong" />
      ) : (
        ""
      )}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#800020" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/")}
              >
                {" "}
                Home
              </span>
            </Typography>
            <Button color="inherit" onClick={() => history.push("/profile")}>
              {state.user.fullName}
            </Button>{" "}
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // backgroundColor: "red",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJdfwoLPgNXoV0q8tDwIPQNUF3drxXLF1KXzJA-kQJKZy0n6x7MdxGnArJ2ghGv95-CYc&usqp=CAU"
            style={{ borderRadius: "50%" }}
            alt="userPic"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "red",
            marginBottom: "20px",
          }}
        >
          <div style={{ alignSelf: "center" }}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h6">
                Name: &nbsp;{" "}
                {shuffle ? (
                  state.user.fullName
                ) : (
                  <TextField
                    size="small"
                    variant="outlined"
                    name="fullName"
                    style={{marginBottom:"4px"}}
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                  />
                )}
              </Typography>
              <Typography variant="h6" style={{marginBottom:"4px"}}>
                Email: &nbsp;{state.user.email}
              </Typography>
              <Typography variant="h6">
                Gender: &nbsp;{" "}
                {shuffle ? (
                  state.user.gender
                ) : (
                  <TextField
                    size="small"
                    variant="outlined"
                    name="gender"
                    style={{marginBottom:"4px"}}
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  />
                )}
              </Typography>
              <Typography variant="h6">
                Phone Number: &nbsp;{" "}
                {shuffle ? (
                  state.user.phoneNumber
                ) : (
                  <TextField
                    size="small"
                    variant="outlined"
                    type="number"
                    style={{marginBottom:"4px"}}
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />
                )}
              </Typography>
              <Typography variant="h6">
                Address: &nbsp;{" "}
                {shuffle ? (
                  state.user.address
                ) : (
                  <TextField
                    size="small"
                    variant="outlined"
                    name="address"
                    style={{marginBottom:"4px"}}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                )}
              </Typography>

              {shuffle ? (
                <Button
                  variant="contained"
                  onClick={showInputs}
                  color="error"
                  type="unsubmit"
                >
                  Edit Profile
                </Button>
              ) : (
                ""
              )}
              {!shuffle ? (
                <Button
                  variant="contained"
                  style={{ float: "right" }}
                  type="submit"
                  color="success"
                >
                  Submit
                </Button>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
        <br />
        <div
          style={{
            backgroundColor: "#800020",
            textAlign: "center",
            padding: "16px",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6" color="white">
            Your Posts
          </Typography>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {allPost.map((element) => (
            <PostCard
              identity={element._id}
              key={element._id}
              imgStrPath={element.imgStrPath}
              mainImg={element.postUrl}
              title={element.author}
              subHeader="10 mins ago"
              content={element.text}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Profile;
