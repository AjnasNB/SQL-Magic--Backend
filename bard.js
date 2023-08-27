import express from "express";
import Bard from 'bard-ai';

const app = express();
const port = process.env.PORT || 5000;

const myBard = new Bard("aAgTKwfTYBmihjQhSo8Q5jBR42m0qnxJcToIJVvJ9tXf9AwL_VC27DWDE_VTjWyuGS9jmQ.");

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
