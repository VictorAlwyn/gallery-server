import multer from "multer";
import multerS3 from "multer-s3";
import env from "../config/environment";
import { s3Singleton } from "../config/storage";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG, PNG, and WEBP"), false);
  }
};

const storage = multerS3({
  s3: s3Singleton,
  bucket: env.aws.s3_bucket_name,
  acl: "public-read",
  contentType: function (req, file, cb) {
    cb(null, file.mimetype);
  },
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const fileName =
      "gallery" + Date.now().toString() + "_" + file.originalname;
    cb(null, fileName);
  },
});

export default multer({
  storage,
  fileFilter,
});
