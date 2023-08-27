import express from 'express';
import Bard from 'bard-ai';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'cross-fetch'; // Import cross-fetch
dotenv.config();

const app = express();
const port =  5000;

const myBard = new Bard(process.env.BARD_API_KEY, { fetch }); // Pass fetch as an option
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
