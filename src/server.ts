import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { CoffeeModel } from "./models/Coffee";

const app = express();

app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? ["https://alissonrochah.com"]
      : "*",
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.send({ ok: true, service: "coffee-api" });
});

app.get("/api/coffees", async (req, res) => {
  try {
    const { category, q, page = "1", limit = "50" } = req.query as Record<string, string>;
    const filter: any = {};
    if (category) filter.categories = category;
    if (q) filter.name = { $regex: q, $options: "i" };

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 50, 1);

    const [items, total] = await Promise.all([
      CoffeeModel.find(filter)
        .sort({ id: 1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      CoffeeModel.countDocuments(filter),
    ]);

    res.json({ items, total, page: pageNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    console.error("GET /api/coffees error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/coffees/:id", async (req, res) => {
  try {
    const item = await CoffeeModel.findOne({ id: Number(req.params.id) });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    console.error("GET /api/coffees/:id error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = Number(process.env.PORT) || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI não definida no .env / variáveis de ambiente");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await mongoose.disconnect();
  process.exit(0);
});
