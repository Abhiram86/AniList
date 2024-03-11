import express from 'express'

import UserModel from '../models/UserSchema.js'

const saveRouter = express.Router()

saveRouter.use(express.json())

saveRouter.post('/saved', async (req, res) => {
    const {email} = req.body
    const user = await UserModel.findOne({email})
    if(user){
        res.json(user.saves)
    }else{
        res.json({"saved err": "user not found"})
    }
})

saveRouter.put('/save', async (req, res) => {
    const {
        id,
        status,
        img,
        name,
        score,
        episodes,
        email
    } = req.body
    const user = await UserModel.findOne({email})
    if(user){
        if(user.saves.some(item => item.id === id)){
            res.json({"data": "saved"})
        }else{
            user.saves.push({
                id,
                status,
                img,
                name,
                score,
                episodes
            })
            await user.save()
            res.json(user.saves)
        }
    }else{
        res.json({"save err": "user not found"})
    }
})

saveRouter.put('/remove', async (req, res) => {
    const {id, email} = req.body
    const user = await UserModel.findOne({email})
    if(user){
        const itemIndex = user.saves.findIndex(item => item._id == id)
        if(itemIndex === -1){
            res.json({"msg": "not found"})
        }else{
            user.saves.splice(itemIndex, 1)
            await user.save()
            res.json(user.saves)
        }
    }else{
        res.json({"remove err": "not removed"})
    }
})

export default saveRouter