import express from 'express';

import UserModel from '../models/UserSchema.js'

const router = express.Router();

router.use(express.json())

router.get('/users', async (req, res) => {
    await UserModel.find({})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.post('/register', async (req, res) => {
    const {username, password, email} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        res.json({"msg": "User already exists"});
    }else {
        const newUser = new UserModel ({
            username,
            password,
            email
        });
        await newUser.save();
        res.json({"msg": "Succesfull"});
    }
})

router.post('/login', async (req, res) => {
    const { useranme, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if(!user){
        res.json({"msg": "user not found check email or password."});
    }else{
        res.json(user);
    }
})

export default router;