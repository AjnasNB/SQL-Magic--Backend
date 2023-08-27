import express from 'express';
import Bard from 'bard-ai';
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv package
dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

const myBard = new Bard(process.env.BARD_API_KEY); // Use the environment variable
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
