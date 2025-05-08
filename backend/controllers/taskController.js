const Task = require("../models/Task");
const User = require("../models/user"); // Import the User model
const notifyUser = require("../utils/notifyUser"); 

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo")
      .populate("createdBy");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isCreator = task.createdBy.toString() === userId;
    const isAssignee = task.assignedTo?.toString() === userId;

    if (!isCreator && !isAssignee) {
      return res.status(403).json({ message: "You are not allowed to view this task." });
    }

    res.json({ task, isCreator, isAssignee });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });

    if (task.assignedTo) {
      await notifyUser(task.assignedTo, task);
      task.notified = true;
      await task.save();
    }

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Task creation failed', error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, priority, status, dueDate } = req.body;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isCreator = task.createdBy.toString() === userId;
    const isAssignee = task.assignedTo?.toString() === userId; // assuming you have assignedTo field

    if (!isCreator && !isAssignee) {
      return res.status(403).json({ message: "You are not allowed to update this task." });
    }

    if (isCreator) {
      // Creator can update everything
      task.title = title;
      task.description = description;
      task.priority = priority;
      task.status = status;
      task.dueDate = dueDate;
    } else if (isAssignee) {
      // Assignee can only update status
      task.status = status;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id; // assuming you're setting req.user in auth middleware

    // Find the task first
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the current user is the creator
    if (task.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized: Not your task" });
    }

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    // Remove notifications related to this task from all users
    await User.updateMany(
      {},
      { $pull: { notifications: { taskId: taskId } } }
    );

    res.json({ message: "Task and related notifications deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
