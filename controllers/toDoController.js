const asyncHandler = require("express-async-handler")
const toDos = require("../models/toDoModel")

// post
const getTasks = asyncHandler(async (req, res) => {
    try{
        const taskData = await toDos.find()
        res.status(200).json({message: "data gotten successfully", taskData})
        if (!taskData) {
            res.status(404).json({message: "error on get", taskData})
        }
    } catch(error) {
        console.log(error);
    }
})

// post
const postTask = asyncHandler(async (req, res) => {
    try {
        const { title, type, description, dueDate } = req.body;
        if (!title || !type || !description || !dueDate) {
            res.status(400).json({ message: "Incomplete data" });
            return;
        }

        const taskData = await toDos.create({
            title,
            type,
            description,
            dueDate,
        });

        res.status(200).json({ message: "Data posted successfully", taskData });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


//update
const updateTask = asyncHandler( async (req, res) => {
    try {
        if(!req.body) {
            res.status(404).json({message: "data doesn't available for update"})
        } else {
            const taskData = await toDos.findByIdAndUpdate(...req.body, req.params.id, {new:true})
            res.status(200).json({message: "data posted successfully", taskData})
        }
    } catch(error) {
        console.log(error);
    }
})

//delete
const deleteTask = asyncHandler( async (req, res) => {
    try {
        if(!req.params.id) {
            res.status(404).json({message: "id doesn't available for delete"})
        } else {
            const taskData = await toDos.findByIdAndDelete(req.params.id)
            res.status(200).json({message: "data posted successfully", taskData})
        }
    } catch(error) {
        console.log(error);
    }
})

module.exports = {
    getTasks,
    postTask,
    updateTask,
    deleteTask
}