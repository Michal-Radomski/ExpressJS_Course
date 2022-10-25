import express, { Request, Response, Router } from "express";
import multer from "multer";

const DIR = "./public/uploads";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, DIR);
  },
  filename: (_req, file, cb) => {
    console.log(file.originalname);
    const fileName = `${file.originalname}${Date.now()}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } }); //* 10MB

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:green;text-align:center'>API is running - indexRouter.ts</h1>");
});

indexRouter.post("/upload_file", upload.single("uploadFile"), (req: Request, res: Response) => {
  console.log("req.file:", req.file);
  res.json({ msg: "File uploaded!", file: req.file });
});

export default indexRouter;
