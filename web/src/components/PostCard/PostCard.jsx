import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import baseURL from "../../core";
import axios from "axios";
export default function PostCard({
  title,
  subHeader,
  smallImg,
  imgStrPath,
  mainImg,
  content,
  identity,
}) {
  const deletePost = (i) => {
    axios
      .post(
        `${baseURL}/api/v1/post/postdelete`,
        {
          postId: i.target.parentElement.id,
          imgStrPath: imgStrPath,

        },
        {
          withCredentials: true,
        }
      )
      .then((e) => {
        if (e.data === "Successfully Deleted") {
          i.target.innerText = "Successfully Deleted";
          i.target.style.backgroundColor = "darkgreen";
        }
        if (e.data === "Error while deleting file from storage") {
          i.target.innerText = "Error while deleting file from storage";
          i.target.style.backgroundColor = "darkred";
        }
        if (e.data === "It's not your Post") {
          i.target.innerText = "It's not your Post";
          i.target.style.backgroundColor = "gray";
        }
      })
      .catch((e) => {
        // console.log(e);
      });
  };
  return (
    <Card id={identity} sx={{ flexGrow: 1, maxWidth: 900, m: 2 }}>
      <CardHeader
        avatar={<Avatar alt="" src={smallImg} />}
        title={title ? title : "User"}
        subheader={subHeader ? subHeader : "Waiting..."}
      />
      {
        <CardMedia
          component="img"
          image={
            mainImg ? mainImg : "https://www.w3schools.com/css/img_lights.jpg"
          }
          alt="Post Pics"
        />
      }

      <CardContent>
        {
          <Typography variant="body2" color="text.secondary" component="p">
            {content ? content : "Waiting for content..."}
          </Typography>
        }
      </CardContent>
      <Button
        sx={{ m: 1 }}
        variant="contained"
        color="error"
        onClick={deletePost}
        id={identity}
      >
        Delete
      </Button>
    </Card>
  );
}
