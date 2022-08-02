'use strict'

const taskData = require('../data/task')

const getTasks = async (req, res, next) => {
  try {
    const task = await taskData.getTasks()
    res.send(task)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getById = async (req, res, next) => {
  try {
    const taskId = req.params.id
    const oneTask = await taskData.getById(taskId)
    res.send(oneTask)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const addTask = async (req, res, next) => {
  try {
    const data = req.body
    const created = await taskData.createTask(data)
    res.send(created)
  } catch (error) {
    console.log(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id
    const data = req.body
    const updated = await taskData.updateTask(taskId, data)
    res.send(updated)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id
    const deleted = await taskData.deleteTask(taskId)
    res.send(deleted)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
module.exports = {
  getTasks,
  getById,
  addTask,
  updateTask,
  deleteTask
}
