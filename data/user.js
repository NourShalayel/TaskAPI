'use strict' ; 

const config = require('../config')
const sql = require('mssql')

const getUser = async()=>{
    try { 
     const pool = await sql.connect(config.sql);
     const userList = await pool.request()
      .query('SELECT [id] , [name] , [password] FROM [dbo].[tasks]')
     return userList.recordset
    }catch(error){
        console.log(error.message);
    }
}

const createUser = async (userData)=>{
  try{
    const pool = await sql.connect(config.sql)
    const insertUser = await pool.request()
     .input('name' , sql.NVarChar(100), userData.name)
     .input('password' , sql.NVarChar(100) , userData.password)
     .query(`
       INSERT INTO [dbo].[users]([name] , [password])
       VALUES(@name , @password)
       SELECT SCOPE_IDENTITY() AS ID
     `)
     return insertUser.recordset
  }catch(error){
    console.log(error)
  }
}

  const updateUser = async (id , userData)=>{
    try { 
      const pool = await sql.connect(config.sql)
      const update = await pool.request()
        .input('id' , sql.Int , id)
        .input('name' , sql.NVarChar(100), userData.name)
        .input('password' , sql.NVarChar(100) , userData.password)
        .query(`
                UPDATE [dbo].[users]
                SET [name] = @name ,
                    [password] = @password
                WHERE [id] = @id
                SELECT [name] , [password]
                FROM [dbo].[users]
                WHERE [id] = @id
        `)
     return update.recordset
    }catch(error){
        console.log(error)
    }
  }


  const deleteUser = async(id) =>{
   try {
    const pool = await sql.connect(config.sql)
    const deleted = await pool.request()
     .input('id' , sql.Int , id)
     .query(`
              DELETE [dbo].[tasks]
              WHERE [id] = @id`)
    return deleted.recordset
   }catch(error){
    console.log(error)
   }
}
module.exports = {
    getUser , 
    createUser , 
    updateUser , 
    deleteUser
}