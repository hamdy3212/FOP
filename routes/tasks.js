const express = require('express'),
    router = express.Router(),
    taskController = require('../controllers/taskController');

router.get("/takenTasks", (req, res) => {
    res.render("tasks/takenTasks");
})
router.get("/givenTasks", (req, res) => {
    res.render("tasks/givenTasks");
})
router.get("/takenTasks/data", taskController.takenTasks_get)
router.get("/givenTasks/data", taskController.givenTasks_get)

router.get("/addtask", taskController.task_add_get)
router.post("/addtask", taskController.task_add_post)
router.put("/editstatus", taskController.task_editStatus_put)


module.exports = router;    