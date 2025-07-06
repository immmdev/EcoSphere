import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const mongoose = require('mongoose');
const initiativeSchema = require("./models/Initiative.model")

import connectDB from './config/mongodb.js';


//app config
const app = express();
const PORT = process.env.PORT || 4000;

//database config
connectDB()

//middlewares
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.status(200).send('Welcome to the backend server!');
});

  app.post('/places',(req,res)=>{
    const { title,address,description,
        checkIn,checkOut,perks,AddedPhotos,price} = req.body;
        const token = req.cookies.token;
        jwt.verify(token,jwtSecretKey,{},async(err,user)=>{
            if(err){
                throw err;
            }
           const places= PlacesModel.create({
                owner:user._id,
                name:title,
                address,
                description,
                checkIn,
                checkOut,
                perks,
                photos:AddedPhotos,
                price

            })
            res.json(places);
        })

  })


    app.get('/places',async (req,res)=>{
        res.json( await PlacesModel.find())
  })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});