const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const controller = require("../controllers/task.controller");

router.use(protect);

router.get("/", controller.getTasks);
router.post("/", controller.addTask);
router.put("/:taskId", controller.updateTask);
router.delete("/:taskId", controller.deleteTask);

router.get("/:taskId/subtasks", controller.getSubtasks);
router.put("/:taskId/subtasks", controller.updateSubtasks);

module.exports = router;
