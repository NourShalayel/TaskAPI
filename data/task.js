'use strict'

const config = require('../config')
const sql = require('mssql')


var moment = require('moment'); // require

const getTasks = async () => {
  try {
    const pool = await sql.connect(config.sql)
    const tasksList = await pool.request()
      .query(' SELECT [taskId] ,[taskName] ,[statusTask] ,[taskDate] ,[IsDelete] FROM [dbo].[tasks]')
    return tasksList.recordset
  } catch (error) {
    console.log(error.message)
  }
}

const getById = async (taskId) => {
  try {
    const pool = await sql.connect(config.sql)
    const oneTask = await pool.request()
      .input('taskId', sql.Int, taskId)
      .query(`
                    SELECT [taskId] ,[taskName] ,[statusTask] ,[taskDate],[IsDelete] 
                    FROM [dbo].[tasks]
                    WHERE [taskId] = @taskId
                    `)
    return oneTask.recordset
  } catch (error) {
    return error.message
  }
}

const createTask = async (taskData) => {
  try {
    const pool = await sql.connect(config.sql)
    const insertTask = await pool.request()
      .input('taskName', sql.NVarChar(100), taskData.taskName)
      .input('statusTask', sql.NVarChar(1500), taskData.statusTask)
      .input('taskDate', sql.Date,  moment().format(taskData.taskDate))
      .input('IsDelete', sql.Int, taskData.IsDelete)
      .query(`
                    INSERT INTO [dbo].[tasks]([taskName],[statusTask],[taskDate] ,[IsDelete]) 
                    VALUES (@taskName , @taskDate , @statusTask ,@IsDelete)
                    SELECT SCOPE_IDENTITY() AS taskId
                    `)
    return insertTask.recordset
  } catch (error) {
    console.log(error)
    return error.message
  }
}

const updateTask = async (taskId, taskData) => {
  try {
    const pool = await sql.connect(config.sql)
    const update = await pool.request()
      .input('taskId', sql.Int, taskId)
      .input('taskName', sql.NVarChar(100), taskData.taskName)
      .input('statusTask', sql.NVarChar(1500), taskData.statusTask)
      .input('taskDate', sql.Date, taskData.taskDate)
      .input('IsDelete', sql.Int, taskData.IsDelete)
      .query(`
                    UPDATE [dbo].[tasks] 
                    SET [taskName] = @taskName , 
                        [statusTask] = @statusTask ,
                        [taskDate] = @taskDate ,
                        [IsDelete] = @IsDelete
                    WHERE [taskId] = @taskId

                    SELECT [taskName] ,[statusTask] ,[taskDate],[IsDelete] 
                    FROM [dbo].[tasks]
                    WHERE [taskId] = @taskId
                    `)
    return update.recordset
  } catch (error) {
    return error.message
  }
}

const deleteTask = async (taskId) => {
  try {
    const pool = await sql.connect(config.sql)
    const deleted = await pool.request()
      .input('taskId', sql.Int, taskId)
      .query(`DELETE [dbo].[tasks]
                        WHERE [taskId] = @taskId`)
    return deleted.recordset
  } catch (error) {
    return error.message
  }
}

module.exports = {
  getTasks,
  getById,
  createTask,
  updateTask,
  deleteTask
}
