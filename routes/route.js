'use strict' ;
 const express = require('express')
 const taskController = require('../controllers/taskController')
 const router = express.Router();


const{getTasks , getById , addTask ,updateTask , deleteTask } = taskController

router.get('/tasks' , getTasks)
router.get('/task/:id' , getById)
router.post('/task' , addTask)
router.put('/task/:id' , updateTask)
router.delete('/task/:id' , deleteTask)

 module.exports = {
    routes : router 
 }