const express = require("express");
const router = express.Router();
const {
  getTask,
  getTasks,
  postTask,
  updateTask,
  deleteTask,
  updateStatus,
} = require("../controllers/toDoController");

router.route("/").get(getTasks).post(postTask);
router.route("/:id").put(updateTask).delete(deleteTask).get(getTask);
router.route("/status/:id").put(updateStatus);

module.exports = router;
