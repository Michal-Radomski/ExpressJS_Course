import express, { Request, Response, Router } from "express";
import multer from "multer";
import fs from "fs";

const upload = multer({ dest: "public/uploads" });

const indexRouter: Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("<h1 style='color:green;text-align:center'>API is running - indexRouter.ts</h1>");
  res.render("index", { title: "Express Multer" });
});

indexRouter.post("/formsub", upload.single("image"), (req: Request, res: Response) => {
  // console.log("req.file:", req.file);
  const newPath = `public/uploads/${req.file?.originalname}${Date.now()}`;
  fs.rename(req.file!.path, newPath, (error) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    // Upload newPath to the db
    res.json({ msg: "File uploaded!", field: req.body, file: req.file });
  });
});

indexRouter.post("/formsubarray", upload.array("pic", 2), (req: Request, res: Response) => {
  //* Version 1
  // // console.log("req.files:", req.files);
  // // @ts-ignore
  // const newPath = `public/uploads/${req.files[0].originalname}${Date.now()}`;
  // // @ts-ignore
  // const newPath2 = `public/uploads/${req.files[1].originalname}${Date.now()}`;
  // // @ts-ignore
  // fs.rename(req.files[0].path, newPath, (error) => {
  //   if (error) {
  //     console.log({ error });
  //     throw error;
  //   }
  //   // Upload newPath to the db
  // });
  // // @ts-ignore
  // fs.rename(req.files[1].path, newPath2, (error) => {
  //   if (error) {
  //     console.log({ error });
  //     throw error;
  //   }
  //   // Upload newPath to the db
  // });
  // res.json({ msg: "Files uploaded!", field: req.body, files: req.files });

  //* Version2
  for (const file of req.files! as Express.Multer.File[]) {
    const newPath = `public/uploads/${file.originalname}${Date.now()}`;
    fs.renameSync(file.path, newPath);
  }
  res.json({ msg: `You just uploaded ${req.files?.length} file(s)` });
});

export default indexRouter;
