const moment = require('moment')
const db = require('../helper/db_connections')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const sql = `SELECT   movies.title `
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
        const {id_movies, id_schedule, date_booking, id_seat} = req.body
        const sql = `INSERT INTO booking (id_movies, id_schedule, date_booking, id_seat) VALUES ('${id_movies}', '${id_schedule}', '${date_booking}', '${id_seat}')`
        db.query(sql,(err,result) =>{
          if(err){
            reject(
           {
            message: "ada error"
           }
          )
          }
          resolve({
            message: 'add new booking success',
            status: 200,
            data: result

          })
        })
      })
    },
    update: (req, res) =>{
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`SELECT * FROM booking`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
       
          const previousData = {
            ...results[0],
            ...req.body
          }
         
          const {id_movies, id_schedule, date_booking, id_seat} = previousData
          dateStartConvert = moment(date_start).format('YYYY-MM-DD')
          dateEndConvert = moment(date_end).format('YYYY-MM-DD')

          const sql = `UPDATE booking SET id_movies='${id_movies}', id_schedule='${id_schedule}', date_booking='${date_booking}', id_seat='${id_seat}' WHERE id_schedule = ${id} `
          db.query( sql,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update booking success",
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
        const sql = `DELETE FROM booking WHERE id_booking = ${id}`
        db.query(sql,(err, result) =>{
          if(err){
            reject({
              message: 'ada error'
            })
          }
          resolve({
            message: "delete booking success",
            status: 200,
            data: result
          })
        })
      })
    },
    getById: (req,res) => {
      return new Promise((resolve,reject) =>{
        const {id} = req.params
        const sql = `SELECT  schedule.title, schedule.cover, schedule.release_date, schedule.director, schedule.description, schedule.casts, categories.genre FROM schedule INNER JOIN categories ON categories.id = schedule.id_categories WHERE id_schedule = ${id}`
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
    }

} 