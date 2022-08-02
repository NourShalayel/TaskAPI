const request = require('supertest')
const express = require('express')

const app = require('./index')

// describe('task' , ()=>{
//   it('' , async()=>{
//     const res = await request(app).post('/task')
//     .send({"taskName": 'newTask' , "statusTask" : 'todo' ,"taskDate" : '2020-11-04' , "IsDelete" : 1 }) ;
//     expect(res.statusCode).toEqual(201);
//   })
// })

// describe('test', () => {
//   test('not found 404', async () => {
//     const res = await request(app).get('/tasks')
//     expect(res.statusCode).toEqual(201)
//     expect(res.body).toEqual({ taskName: 'task' })
//   })
// })

request(app)
  .get('/tasks')
  .expect(hasPreviousAndNextKeys)
  .end(done);

function hasPreviousAndNextKeys(res) {
  if (!('next' in res.body)) throw new Error("missing next key");
  if (!('prev' in res.body)) throw new Error("missing prev key");
}