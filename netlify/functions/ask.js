// netlify/functions/ask.js
const express = require('express');
const Bard = require('bard-ai');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const myBard = new Bard(process.env.BARD_API_KEY);
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const question = req.body.question;
  
  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Invalid question" });
  }

  try {
    const answer = await myBard.ask(question);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports.handler = app;
