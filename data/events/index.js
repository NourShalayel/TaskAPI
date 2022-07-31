'use strict' ; 

const utils = require('../utils') ;
const config = require('../../config') ; 
const sql = require('mssql');
const { query } = require('express');

const getTasks= async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const tasksList = await pool.request().query(sqlQueries.getAll);
        return tasksList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}


const getById = async(taskId)=>{
    try {
         let pool = await sql.connect(config.sql) ;
         const sqlQueries = await utils.loadSqlQueries('events');
         const oneTask = await pool.request()
                    .input('taskId' , sql.Int , taskId)
                    .query(sqlQueries.getTaskById)
        return oneTask.recordset ;
     
    }catch(error){
       return error.message
    }
 }


 const createTask = async(taskData)=>{
    try{
        let pool = await sql.connect(config.sql) ;
        const sqlQueries = await utils.loadSqlQueries('events') ;
        const insertTask = await pool.request()
                    .input('taskName' , sql.NVarChar(100) , taskData.taskName)
                    .input('statusTask' , sql.NVarChar(1500) , taskData.statusTask)
                    .input('taskDate' , sql.Date , taskData.taskDate)
                    .input('IsDelete' , sql.Int , taskData.IsDelete)
                    .query(sqlQueries.create)
        return insertTask.recordset

    }catch(error){
        console.log(error)
        return error.message

    }
 }



 const updateTask = async(taskId , taskData) =>{
   try {

    let pool = await sql.connect(config.sql) ;
    const sqlQueries = await utils.loadSqlQueries('events') ;
    const update = await pool.request()
                    .input('taskId', sql.Int, taskId)
                    .input('taskName' , sql.NVarChar(100) , taskData.taskName)
                    .input('statusTask' , sql.NVarChar(1500) , taskData.statusTask)
                    .input('taskDate' , sql.Date , taskData.taskDate)
                    .input('IsDelete' , sql.Int , taskData.IsDelete)
                    .query(sqlQueries.update)
    return update.recordset
                  
   }catch(error){
    return error.message
   }
}

const deleteTask = async(taskId)=>{
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('events')
        const deleted = await pool.request()
                        .input('taskId' , sql.Int , taskId)
                        .query(sqlQueries.delete)
        return deleted.recordset ;
    }catch(error){
        return error.message
    }
}

module.exports = {
    getTasks , 
   getById , 
   createTask , 
   updateTask , 
   deleteTask  
}