import express from "express";
import { post } from "../models/post.js";
import { signup } from "../models/signup.js";
import { readFile } from "fs/promises";
import { unlink } from "fs/promises";
import { upload } from "../multer.js";
import {
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase.js";
import jwt from "jsonwebtoken";
import path from "path";
import { socketInstance } from "../express.js";

const router = express.Router();
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "0900";

// token middleware
router.use((req, res, next) => {
  jwt.verify(req.cookies.token, SECRET, function (err, decoded) {
    req.body._decoded = decoded;
    // console.log("decoded", req.body._decoded);
    // export default req.body._decoded;
    // console.log("error", err);
    if (!err) {
      next();
    } else {
      // console.log(err);
      res.status(401).sendFile(path.join(__dirname, "./web/build/index.html"));
    }
  });
});

router.get("/tokenverify", (req, res) => {
  signup.findOne({ email: req.body._decoded?.email }, (err, user) => {
    if (user) {
      res.send({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    } else {
      res.send("error:" + err);
    }
  });
});

router.get("/posts", (req, res) => {
  const page = Number(req.query.page);
  post
    .find({})
    .sort({ created: "desc" })
    .skip(page)
    .limit(2)
    .exec((err, data) => {
      res.send(data);
    });
});

router.post("/posts", upload.any(), async (req, res) => {
  if (!req.files || !req.body.text) {
    res.status(400).send("file is missing");
    return;
  }
  if (req.files[0].size > 2000000) {
    res.status(400).send("file size should not be greater than 2MB");
    return;
  }
  try {
    const file = await readFile(req.files[0].path);
    const storageRef = ref(storage, "postImages/" + req.files[0].filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          try {
            await unlink(req.files[0].path);
            console.log("File Deleted");
            const newpost = await new post({
              text: req.body.text,
              postUrl: downloadURL,
              imgStrPath: req.files[0].filename,
              author: req.body.fullName,
              authorId: req.body.id,
            });
            newpost.save().then((data) => {
              socketInstance.emit("NEWPOSTS", {
                text: req.body.text,
                postUrl: downloadURL,
                imgStrPath: req.files[0].filename,
                author: req.body.fullName,
                authorId: req.body.id,
                _id: data._id,
              });
              res.send("Post created");
            });
          } catch (error) {
            console.log(error);
            res.status(500).send("Error in storage");
          }
        });
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/postdelete", async (req, res) => {
  console.log(req.body);
  const deleting = await post.deleteOne({
    _id: req.body.postId,
    authorId: req.body._decoded.id,
  });
  if (deleting.deletedCount) {
    if (req.body.imgStrPath) {
      const storageDelete = ref(storage, "postImages/" + req.body.imgStrPath);
      // Delete the file
      deleteObject(storageDelete)
        .then(() => {
          // File deleted successfully
          res.send("Successfully Deleted");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          res.send("Error while deleting file from storage");
        });
      return;
    }
    res.send("Successfully Deleted");
  } else {
    res.send("It's not your Post");
  }
});

router.get("/post", (req, res) => {
  post
    .find({ authorId: req.body._decoded?.id })
    .sort({ created: "desc" })
    .exec((err, data) => {
      res.send(data);
    });
});

router.put("/updateprofile", (req, res) => {
  // res.send(req.body)
  signup.findByIdAndUpdate(
    req.body._decoded.id,
    {
      fullName: req.body.fullName,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    },
    function (err, result) {
      if (result) {
        //  console.log(result);
        res.send(result);
      }
      if (err) {
        // console.log(err);
      }
    }
  );
});

export default router;
