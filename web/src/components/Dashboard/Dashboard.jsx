import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/Context";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import Message from "../Message/Message";
import PostCard from "../PostCard/PostCard";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../Spinner/Spinner";
import io from "socket.io-client";

function Dashboard() {
  const history = useHistory();
  const dev = "http://localhost:2000";
  const baseURL =
    window.location.hostname.split(":")[0] === "localhost" ? dev : "";
  let { state, dispatch } = useContext(GlobalContext);
  const [inputText, setInputText] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [messageBar, setMessageBar] = useState(undefined);
  const [messageText, setMessageText] = useState(undefined);
  const [isMore, setIsMore] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/v1/post/posts?page=0`, {
        withCredentials: true,
      })
      .then((result) => {
        // console.log(result);
        setAllPost(result.data);
      });
    return () => {
      // cleanup
    };
    // eslint-disable-next-line
  }, []);
  const inputOnChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const socket = io(baseURL);

    socket.on("connect", function () {
      // console.log("connected");
    });

    // to subcribe to a topic
    socket.on("NEWPOSTS", function (newData) {
      // console.log(newData);
      setAllPost((prev) => [newData, ...prev]);
    });

    socket.on("disconnect", function (message) {
      // console.log("Socket disconnected from server: ", message);
    });

    return () => {
      socket.close();
    };
    // eslint-disable-next-line
  }, []);

  const submitPost = (a) => {
    a.preventDefault();
    if (fileInput.size > 2000000) {
      // console.log("No big files please");
      setMessageText("File Size should not be greater than 2MB");
      setMessageBar(false);
      setTimeout(() => {
        setMessageBar(undefined);
      }, 2000);
      return;
    }
    if (inputText === "") {
      setMessageText("Input area should not be empty");
      setMessageBar(false);
      setTimeout(() => {
        setMessageBar(undefined);
      }, 2000);
      return;
    }
    var formData = new FormData();
    formData.append("File", fileInput);
    formData.append("text", inputText);
    formData.append("fullName", state.user.fullName);
    formData.append("id", state.user.id);
    formData.append("name", "user");
    formData.append(
      "details",
      JSON.stringify({
        subject: "user Post",
        year: "2021",
      })
    );

    axios({
      method: "post",
      url: `${baseURL}/api/v1/post/posts`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
      .then((result) => {
        setInputText("");
        setMessageBar(true);
        setMessageText(result.data);
        setTimeout(() => {
          setMessageBar(undefined);
        }, 2000);
      })
      .catch((err) => {
        setMessageText(err.response.data);
        setMessageBar(false);
        setTimeout(() => {
          setMessageBar(undefined);
        }, 2000);
      });
  };

  const logout = () => {
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
        setMessageText(res.data);
        setMessageBar(true);
        setTimeout(() => {
          setMessageBar(undefined);
          dispatch({
            type: "USER_LOGOUT",
            payload: "",
          });
          history.push("/");
        }, 1000);
      })
      .catch((err) => {
        setMessageText(err.response.data);
        setMessageBar(false);
        setTimeout(() => {
          setMessageBar(undefined);
        }, 2000);
      });
  };

  const loadMore = () => {
    axios
      .get(`${baseURL}/api/v1/post/posts?page=${allPost.length}`, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data.length) {
          const newPost = [...allPost, ...result.data];
          setAllPost(newPost);
        } else {
          setIsMore(false);
        }
      });
    return () => {
      // cleanup
    };
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#800020" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/")}
              >
                Home
              </span>
            </Typography>
            <Button color="inherit" onClick={() => history.push("/profile")}>
              {state.user.fullName}
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <Typography
          variant="h4"
          style={{ marginTop: "30px", fontWeight: "bold", color: "darkred" }}
        >
          Type your Post
        </Typography>
        <form onSubmit={submitPost}>
          <Box
            sx={{
              "& > :not(style)": {
                marginTop: "20px",
                marginBottom: "14px",
                width: "100%",
              },
            }}
            autoComplete="off"
          >
            <TextField
              label="Enter text"
              value={inputText}
              onChange={inputOnChange}
              variant="filled"
              required
            />
            <TextField
              type="file"
              onChange={(e) => setFileInput(e.target.files[0])}
              accept="image/*"
              name="fileInput"
              id="fileInput"
              required
            />
          </Box>
          <Button
            variant="contained"
            color="error"
            size="large"
            style={{ marginBottom: "40px" }}
            type="submit"
          >
            Post
          </Button>
        </form>
        <div
          style={{
            backgroundColor: "#800020",
            textAlign: "center",
            padding: "16px",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6" color="white">
            All Users Posts
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <br />
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={isMore}
            loader={<Spinner key={0} />}
          >
            {allPost.map((element, i) => (
              <PostCard
                identity={element._id}
                key={i}
                imgStrPath={element.imgStrPath}
                title={element.author}
                subHeader="10 mins ago"
                content={element.text}
                mainImg={element.postUrl}
              />
            ))}
          </InfiniteScroll>
        </div>
        {/* <section
          style={{ margin: "14px", display: "flex", justifyContent: "center" }}
        >
          {isMore ? (
            <Button variant="contain
            ed" onClick={loadMore} color="secondary">
              Load more
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled
              onClick={loadMore}
              color="secondary"
            >
              Sorry No More Post
            </Button>
          )}
        </section>  */}
      </Container>

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
    </div>
  );
}

export default Dashboard;
