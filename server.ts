import express from "express";
import cors from "cors";
import multer from "multer";
import pdfParse from "pdf-parse";

const app = express();

app.use(cors());
app.use(express.json());

// memoria (no guarda archivos en disco)
const upload = multer({ storage: multer.memoryStorage() });

// health check
app.get("/", (req, res) => {
  res.json({ ok: true });
});

// upload PDF + extract text
app.post("/api/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded"
      });
    }

    const pdfBuffer = req.file.buffer;

    const data = await pdfParse(pdfBuffer);

    const text = data.text || "";

    return res.json({
      success: true,
      data: {
        text
      }
    });

  } catch (err: any) {
    console.error("PDF error:", err);

    return res.status(500).json({
      success: false,
      error: "Failed to process PDF"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
