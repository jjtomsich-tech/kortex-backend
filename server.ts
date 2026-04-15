import express from "express";
import cors from "cors";
import multer from "multer";
import pdfParse from "pdf-parse";

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/upload", upload.single("pdf"), async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.json({
        success: false,
        error: "NO FILE"
      });
    }

    const data = await pdfParse(req.file.buffer);

    res.json({
      success: true,
      data: {
        text: data.text
      }
    });

  } catch (e) {
    console.error(e);

    res.json({
      success: false,
      error: "PDF ERROR"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
