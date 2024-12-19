import multer from "multer";

const storageCofiguration = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/posts");
  },
  filename: (req, file, cb) => {
    const fileName =
      new Date().toString().replace(/:/g, "_") + file.originalname;
    cb(null, fileName);
  },
});

const uploadPost = multer({ storage: storageCofiguration });

export default uploadPost;
