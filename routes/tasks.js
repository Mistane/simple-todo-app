const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const verifyToken = require("../middlewares/verifyTokens");

router.get("/todos", verifyToken, taskController.todo);
router.get("/", verifyToken, taskController.get);
router.post("/", verifyToken, taskController.create);
router.put("/:id", verifyToken, taskController.update);
router.delete("/:id", verifyToken, taskController.delete);
router.patch("/:id/toggle", verifyToken, taskController.toggle);

module.exports = router;
