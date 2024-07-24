import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3001;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/questions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors());
app.use(express.json());

// User Score Schema and Model
const userScoreSchema = new mongoose.Schema({
  username: String,
  score: Number,
  date: { type: Date, default: Date.now }
});

const UserScore = mongoose.model('UserScore', userScoreSchema);

// Route to fetch questions directly using collection method
app.get('/api/quiz', async (req, res) => {
  try {
    const collection = mongoose.connection.collection('Quiz');
    const questions = await collection.find({}).toArray();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
});

// Route to fetch leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await UserScore.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving leaderboard data', error });
  }
});

// Route to save user score
app.post('/api/score', async (req, res) => {
  try {
    const { username, score } = req.body;
    const userScore = new UserScore({ username, score });
    await userScore.save();
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving score', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
