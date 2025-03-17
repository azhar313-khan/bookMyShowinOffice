import multer from "multer";
import path from "path";
import fs from "fs";

const uplaodDir = path.join(__dirname, "../../uploads");

if (fs.existsSync(uplaodDir)) {
  fs.mkdirSync(uplaodDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uplaodDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTyped = /jpeg|jpg|png/;
  const extname = allowedTyped.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTyped.test(file.mimetype);
  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error("Only Image (Jpeg,Jpg,Png) are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
