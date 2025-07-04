import express from 'express';
import cors from 'cors';
import 'dotenv/config';

//app config
const app = express();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.status(200).send('Welcome to the backend server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});