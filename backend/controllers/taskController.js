import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const tasks = await Task.find({ user: req.user })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Task.countDocuments({ user: req.user });
    res.json({ tasks, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
