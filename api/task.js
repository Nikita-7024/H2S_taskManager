exports.getTasks = (req, res) => {
  const tasks = req.user.tasks.filter(t => !t.isDeleted)
    .map(task => ({
      ...task.toObject(),
      subtasks: task.subtasks.filter(st => !st.isDeleted)
    }));
  res.json(tasks);
};

exports.addTask = async (req, res) => {
  const { subject, deadline, status } = req.body;
  const newTask = { subject, deadline, status, isDeleted: false, subtasks: [] };
  req.user.tasks.push(newTask);
  await req.user.save();
  res.json(req.user.tasks.at(-1));
};

exports.updateTask = async (req, res) => {
  const task = req.user.tasks.id(req.params.taskId);
  if (!task || task.isDeleted) return res.status(404).json({ message: "Not found" });

  Object.assign(task, req.body);
  await req.user.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = req.user.tasks.id(req.params.taskId);
  if (!task || task.isDeleted) return res.status(404).json({ message: "Not found" });

  task.isDeleted = true;
  await req.user.save();
  res.json({ message: "Task soft-deleted" });
};

exports.getSubtasks = (req, res) => {
  const task = req.user.tasks.id(req.params.taskId);
  if (!task || task.isDeleted) return res.status(404).json({ message: "Not found" });

  const subtasks = task.subtasks.filter(st => !st.isDeleted);
  res.json(subtasks);
};

exports.updateSubtasks = async (req, res) => {
  const task = req.user.tasks.id(req.params.taskId);
  if (!task || task.isDeleted) return res.status(404).json({ message: "Not found" });

  const retained = task.subtasks.filter(st => st.isDeleted);
  task.subtasks = [...retained, ...req.body];
  await req.user.save();
  res.json(task.subtasks);
};
