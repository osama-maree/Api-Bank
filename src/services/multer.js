import multer from "multer";
export const multerValidation = {
  image: ["image/jpeg", "image/png", "image/jpg"], //handel type image
  pdf: ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
};
//handel error
export const HME = (error, req, res, next) => {
  if (error) {
    res.status(400).json({ message: "multer", error });
  } else {
    next();
  }
};
//upload image
export function myMulter(customvalidation) {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (customvalidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid file type", false);
    }
  }
  const upload = multer({ dest: "upload", fileFilter, storage });
  return upload;
}
