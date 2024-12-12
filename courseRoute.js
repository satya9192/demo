import express from 'express'

const route = express.Router()
import courseSchema from '../models/courseSchema.js'

route.post('/addCourse', async (req, res) => {
    const newCourse = new courseSchema(req.body)

    try {
        const result = await newCourse.save()
        res.status(200).json({ message: "insert success", data: result })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

route.get('/getCourse', async (req, res) => {
    try {
        const result = await courseSchema.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


export default route