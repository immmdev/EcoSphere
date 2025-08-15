import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.route.js';
import cartRouter from './routes/cart.route.js';
import productRouter from './routes/product.route.js';
import orderRouter from './routes/order.route.js';

import communityRouter from './routes/community.route.js';

import contactRoutes from './routes/contact.route.js';

import ecoRouter from './routes/ecoAI.route.js';

//app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter);
app.use('/api/order', orderRouter);
app.use('/api/contact',contactRoutes)

app.use('/api/communities',communityRouter);


app.use("/api/ai", ecoRouter );




app.use('/api/initiative', initiativeRoutes)


app.get('/', (req, res) => {
  res.status(200).send('Welcome to the backend server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});