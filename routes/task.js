const router = require("express").Router();
const protect = require("../middleware/auth");
const taskAp = require("../api/task");

router.use(protect);

router.get("/", taskAp.getTasks);
router.post("/", taskAp.addTask);

router.put("/:taskId", taskAp.updateTask);
router.delete("/:taskId", taskAp.deleteTask);

router.get("/:taskId/subtasks", taskAp.getSubtasks);
router.put("/:taskId/subtasks", taskAp.updateSubtasks);


module.exports = router;
