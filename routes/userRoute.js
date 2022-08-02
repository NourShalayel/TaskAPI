'use strict' 
const express = require('express')
const user = require('../controllers/user')
const router = express.Router()

const {checkTask} = require('../Validation')

const {getUser , addUser , updateUser , deleteUser} = user

router.get('/users' , getUser)
router.post('/user' , addUser)
router.put('/user/:id' , updateUser)
router.delete('/user/:id' , deleteUser)

module.exports = {
    routes : router
}