const   express         = require('express'),
        router          = express.Router(),
        taskController  = require('../controllers/taskController');

router.get("/tasklist", taskController.task_index )
router.get("/addtask", taskController.task_add_get)
router.post("/addtask", taskController.task_add_post)

module.exports = router;