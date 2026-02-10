const Task = require("../models/Task")

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body

    const task = await Task.create({
      userId: req.userId,
      title
    })

    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// TOGGLE COMPLETE
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" })
    }

    task.completed = !task.completed
    await task.save()

    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" })
    }

    await task.deleteOne()

    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
