const express = require("express")
const router = express.Router()
const {
    getTasks,
    postTask,
    updateTask,
    deleteTask
} = require("../controllers/toDoController")

router.route("/").get(getTasks).post(postTask)
router.route("/:id").put(updateTask).delete(deleteTask)

module.exports = router