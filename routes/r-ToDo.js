const router = require('express').Router()
const toDoController = require('../controller/ToDoContoller')

router.get('/', toDoController.index)
router.post('/addToDo', toDoController.addTodo)
//router.put('/updateToDo' , toDoController.updateToDo)
router.post('/deleteToDo' , toDoController.deleteToDo)
router.put('/check',toDoController.check)
router.delete('/deleteall' , toDoController.deleteall )
router.get('/getSingleToDo' ,toDoController.getSingleToDo)

module.exports = router