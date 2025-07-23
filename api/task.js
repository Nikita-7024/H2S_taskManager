const taskFunc = {
  getTasks: async (req, res) => {
    try {
      const tasks = req.user.tasks
        .filter(task => !task.isDeleted)
        .map(task => ({
          ...task.toObject(),
          subtasks: task.subtasks.filter(subtask => !subtask.isDeleted),
        }));
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  addTask: async (req, res) => {
    try {
      const { subject, deadline, status } = req.body;
      const newTask = {
        subject,
        deadline,
        status,
        isDeleted: false,
        subtasks: [],
      };

      req.user.tasks.push(newTask);
      await req.user.save();

      res.json(req.user.tasks.at(-1));
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  updateTask: async (req, res) => {
    try {
      const task = req.user.tasks.id(req.params.taskId);

      if (!task || task.isDeleted) {
        return res.status(404).json({ message: "Task not found" });
      }

      Object.assign(task, req.body);
      await req.user.save();

      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const task = req.user.tasks.id(req.params.taskId);

      if (!task || task.isDeleted) {
        return res.status(404).json({ message: "Task not found" });
      }

      task.isDeleted = true;
      await req.user.save();

      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  getSubtasks: async (req, res) => {
    try {
      const task = req.user.tasks.id(req.params.taskId);

      if (!task || task.isDeleted) {
        return res.status(404).json({ message: "Task not found" });
      }

      const subtasks = task.subtasks.filter(st => !st.isDeleted);
      res.json(subtasks);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  updateSubtasks: async (req, res) => {
    try {
      const task = req.user.tasks.id(req.params.taskId);

      if (!task || task.isDeleted) {
        return res.status(404).json({ message: "Task not found" });
      }

      const retainedDeleted = task.subtasks.filter(st => st.isDeleted);
      task.subtasks = [...retainedDeleted, ...req.body];

      await req.user.save();
      res.json(task.subtasks);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
};

module.exports = taskFunc;
