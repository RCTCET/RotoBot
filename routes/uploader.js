import { Router } from "express";
import { upload } from "../middleware/upload.js";
import {loadDocument} from "../utils/uploader.js"
const uploadRouter = Router();

uploadRouter.post(
  "/",
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const result = await loadDocument(req.file.filename);

      res.json({
        message: "File uploaded and embedded",
        file: {
          originalName: req.file.originalname,
          storedName: req.file.filename,
          size: req.file.size,
        },
        chunksAdded: result.chunks,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to process document" });
    }
  }
);

export default uploadRouter;
