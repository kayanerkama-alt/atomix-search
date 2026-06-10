import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/api/search", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        error: "Query is required"
      });
    }

    const response = await fetch(
      "https://platform.yep.com/api/search",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.YEP_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query,
          type: "highlights",
          limit: 10,
          language: ["en"]
        })
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Search failed"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Atomix AI Search running on ${PORT}`);
});
