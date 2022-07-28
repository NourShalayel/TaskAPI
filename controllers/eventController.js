'use strict' ;

const { result } = require('lodash');
const eventData = require('../data/events');

const getEvents = async(req , res , next) =>{
    try{
     const events = await eventData.getEvents();
     res.send(events);
    }catch(error){
        res.status(400).send(error.message)
  }
}

const getById = async(req , res , next)=>{
    try {
      const eventId = req.params.id ;
      const oneEvent = await eventData.getById(eventId) ; 
      res.send(oneEvent)
    }catch(error){
       res.status(400).send(error.message)
    }
}

const addEvent = async(req , res ,next)=>{
    try{
       const data = req.body ;
       const craeted = await eventData.createEvent(data) ; 
       res.send(craeted)
    }catch(error){
        console.log(error)
    }
}


const updateEvent = async (req , res , next) =>{
    try {
      const eventId = req.params.id ;
      const data = req.body ; 
      const updated =   await eventData.updateEvent(eventId , data)
      res.send(updated)
    }catch(error){
        res.status(400).send(error.message);
    }
}

const deleteEvent = async(req , res , next) =>{
    try { 
       const eventId =  req.params.id ;
       const deletedevent = await eventData.deleteEvent(eventId);
       res.send(deletedevent)
    }catch(error){
        res.status(400).send(error.message)
    }
}
module.exports = {
    getEvents , 
    getById , 
    addEvent , 
    updateEvent , 
    deleteEvent
}