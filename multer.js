import multer from "multer";

const storageMulter = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: storageMulter });
