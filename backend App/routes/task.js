const router = require("express").Router()
const auth = require("../middleware/authMiddleware")

const {
  getTasks,
  createTask,
  toggleTask,
  deleteTask
} = require("../controllers/taskController")

router.get("/", auth, getTasks)
router.post("/", auth, createTask)
router.put("/:id", auth, toggleTask)
router.delete("/:id", auth, deleteTask)

module.exports = router
