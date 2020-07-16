const express = require('express'),
    router = express.Router(),
    taskController = require('../controllers/taskController');

router.get("/tasklist", (req, res) => {
    res.render("tasks/tasklist");
})
router.get("/data", taskController.task_data)
router.get("/addtask", taskController.task_add_get)
router.post("/addtask", taskController.task_add_post)
router.put("/editstatus", taskController.task_editStatus_put)


module.exports = router;    