import express from 'express'
const route = express.Router()

import userSchema from '../models/userSchema.js'


route.post('/enrollInCOurse', async (req, res) => {
    const { userId, courseId } = req.body

    try {
        const updateUser = await userSchema.findOneAndUpdate(
            { userId }, {
            $addToSet: { courses: courseId }
        }, { new: true, upsert: true })

        res.status(200).json({ message: "couser added to user", data: updateUser })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

route.delete('/deleteById/:id', async (req, res) => {
    const userId = req.params.id
    const courseId = req.body;

    try {
        const result = await userSchema.findOneAndDelete({ _id: userId },
            { $pull: { courses: courseId } }, // Remove the courseId from courses array
            { new: true })
        if (!result) {
            return res.status(404).json({ message: "not found" })
        }
        return res.status(200).json({ message: "delete success" });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


route.get('/cart/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await userSchema.find({
            userId: id
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
export default route