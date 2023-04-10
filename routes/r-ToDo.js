const router = require('express').Router()
const toDoController = require('../controller/ToDoContoller')

router.get('/', toDoController.index)
router.post('/addToDo', toDoController.addTodo)
router.put('/updateToDo' , toDoController.updateToDo)
//router.post('/deleteToDo' , toDoController.deleteToDo)
router.post('/check',toDoController.check)
router.delete('/deleteall' , toDoController.deleteall )

module.exports = router