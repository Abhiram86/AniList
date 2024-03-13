import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';

import UserModel from './models/UserSchema.js';
import router from './routes/auth.js';
import saveRouter from './routes/save.js';

import dotenv from 'dotenv';

dotenv.config()

const app = express();

const PORT = process.env.PORT || 3001;
const dburl = "mongodb+srv://Abhiram:8186087139@cluster0.r8gp8sq.mongodb.net/AniList?retryWrites=true&w=majority";

app.use(cors());

const route = express.Router();

app.use('/auth', router);
app.use('/save', saveRouter);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect(dburl)
.then(() => {
    console.log('connected to DB');
})
.catch((err) => {
    console.error(err);
})

route.get('/', (req, res) => {
    res.json({"msg": "hello"})
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

