import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/upload", (req, res) => {
  res.json({ message: "upload ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server running on", PORT);
});
