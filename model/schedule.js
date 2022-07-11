const moment = require('moment')
const db = require('../helper/db_connections')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const sql = `SELECT movies.title, schedule.price, premiere.premiere_name, location.location_name, schedule.date_start, schedule.date_end, time.time from schedule INNER JOIN movies ON movies.id_movies = schedule.id_movies INNER JOIN premiere ON premiere.id_premiere = schedule.id_premiere INNER JOIN location ON location.id_location = schedule.id_location INNER JOIN time ON time.id_time = schedule.id_time `
        db.query(sql,(err, results)=> {
          if(err) {
            reject(console.log(err))
          }
          resolve({
            message: 'get schedule success',
            status: 200,
            data: results
          })
        })
      })
    },
    add: (req,res) => {
      return new Promise ((resolve,reject) =>{
        const {id_movies, price, id_premiere, id_location, date_start, date_end, id_time} = req.body
        const sql = `INSERT INTO schedule (id_movies, price, id_premiere, id_location, date_start, date_end, id_time) VALUES ('${id_movies}', '${price}', '${id_premiere}', '${id_location}', '${date_start}', '${date_end}', '${id_time}')`
        db.query(sql,(err,result) =>{
          if(err){
            reject(
         console.log(err)
          )
          }
          resolve({
            message: 'add new schedule success',
            status: 200,
            data: result
          })
        })
      })
    },
    update: (req, res) =>{
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`SELECT * FROM schedule`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
       
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {id_movies, price, id_premiere, id_location, date_start, date_end, id_time} = previousData
          dateStartConvert = moment(date_start).format('YYYY-MM-DD')
          dateEndConvert = moment(date_end).format('YYYY-MM-DD')

          const sql = `UPDATE schedule SET id_movies='${id_movies}', price='${price}', id_premiere='${id_premiere}', id_location='${id_location}', date_start='${dateStartConvert}',date_end='${dateEndConvert}', id_time ='${id_time}' WHERE id_schedule = ${id} `
          db.query( sql,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update schedule success",
              status: 200,
              data: results
            })
          })
      
        })
      })

    },
    remove: (req,res) => {
      return new Promise((resolve,reject) =>{
        const {id} = req.params
        const sql = `DELETE FROM schedule WHERE id_schedule = ${id}`
        db.query(sql,(err, result) =>{
          if(err){
            reject({
              message: 'ada error'
            })
          }
          resolve({
            message: "delete schedule success",
            status: 200,
            data: result
          })
        })
      })
    },
    getById: (req,res) => {
      return new Promise((resolve,reject) =>{
        const {id} = req.params
        const sql = `SELECT movies.title, schedule.price, premiere.premiere_name, location.location_name, schedule.date_start, schedule.date_end, time.time from schedule INNER JOIN movies ON movies.id_movies = schedule.id_movies INNER JOIN premiere ON premiere.id_premiere = schedule.id_premiere INNER JOIN location ON location.id_location = schedule.id_location INNER JOIN time ON time.id_time = schedule.id_time WHERE id_schedule = ${id}`
        db.query(sql, (err, result) =>{
          if(err){
            reject(console.log(err))
          }
          resolve({
            message : 'get By id success ',
            status : 200,
            data: result
          })
        })
      })
    }, 
   
} 


