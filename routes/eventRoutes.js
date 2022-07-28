'use strict' ; 

const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();



const {getEvents   ,getById , addEvent , updateEvent , deleteEvent} = eventController
router.get('/events' , getEvents)
router.get('/event/:id', getById)
router.post('/event' ,addEvent)
router.put('/event/:id', updateEvent)
router.delete('/event/:id' , deleteEvent)


module.exports = {
    routes : router 
}