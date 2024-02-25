const asyncHandler = require("express-async-handler");
const toDos = require("../models/toDoModel");

// get
const getTasks = asyncHandler(async (req, res) => {
  try {
    const taskData = await toDos.find();
    res.status(200).json({ message: "data gotten successfully", taskData });
    if (!taskData) {
      res.status(404).json({ message: "error on get", taskData });
    }
  } catch (error) {
    console.log(error);
  }
});

// single get
const getTask = asyncHandler(async (req, res) => {
  try {
    const taskData = await toDos.findById(req.params.id);
    if (!taskData) {
      res.status(404).json({ message: "error on get" });
    } else {
      res.status(200).json({ message: "data gotten successfully", taskData });
    }
  } catch (error) {
    console.log(error);
  }
});

// post
const postTask = asyncHandler(async (req, res) => {
  try {
    const { title, type, description, dueDate, completed } = req.body;
    if (
      title !== undefined &&
      type !== undefined &&
      description !== undefined &&
      dueDate !== undefined &&
      completed !== undefined &&
      title !== "" &&
      type !== "" &&
      description !== "" &&
      dueDate !== "" &&
      completed !== ""
    ) {
      const taskData = await toDos.create({
        title,
        type,
        description,
        dueDate,
        completed,
      });
      res.status(200).json({ message: "Data posted successfully", taskData });
    } else {
      res.status(400).json({ message: "All fields are mandatory" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//update
const updateTask = asyncHandler(async (req, res) => {
  try {
    const { title, type, description, dueDate, completed } = req.body;

    console.log(req.body);

    const taskData = await toDos.findByIdAndUpdate(
      req.params.id,
      {
        title,
        type,
        description,
        dueDate,
        completed,
      },
      { new: true }
    );

    if (!taskData) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task updated successfully", taskData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


//update status only
const updateStatus = asyncHandler(async (req, res) => {
    try {
      const { completed } = req.body;
  
      console.log(req.body);
  
      const taskStatus = await toDos.findByIdAndUpdate(
        req.params.id,
        {
          completed,
        },
        { new: true }
      );
  
      if (completed === "" || !completed === undefined) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
  
      res.status(200).json({ message: "Task updated successfully", taskStatus });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

//delete
const deleteTask = asyncHandler(async (req, res) => {
  try {
    if (req.params.id) {
        const taskData = await toDos.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "data deleted successfully", taskData });
    } else {
        res.status(404).json({ message: "id doesn't available for delete" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getTask,
  getTasks,
  postTask,
  updateTask,
  deleteTask,
  updateStatus
};
