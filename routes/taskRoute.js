'use strict'
const express = require('express')
const task = require('../controllers/task')
const router = express.Router()

const { checkTask} = require('../Validation');


const { getTasks, getById, addTask, updateTask, deleteTask } = task

// router.get('/tasks', () => {
//   chec
// })
router.get('/tasks', getTasks)
router.get('/task/:id', getById)
router.post('/task', checkTask , addTask)
router.put('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)



const user = require('../controllers/user')

const {getUser , addUser , updateUser , deleteUser} = user

router.get('/users' , getUser)
router.post('/user' , addUser)
router.put('/user/:id' , updateUser)
router.delete('/user/:id' , deleteUser)

module.exports = {
  routes: router
}
